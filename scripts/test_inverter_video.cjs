const { spawn } = require('child_process');
const http = require('http');

async function testInverter() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9567',
    '--disable-gpu',
    '--no-first-run'
  ]);
  await new Promise(r => setTimeout(r, 1200));

  const targets = await new Promise((resolve) => {
    http.get('http://127.0.0.1:9567/json', res => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(JSON.parse(d)));
    });
  });
  const page = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  function call(method, params = {}) {
    return new Promise(res => {
      const msgId = id++;
      const onMsg = (e) => {
        const m = JSON.parse(e.data);
        if (m.id === msgId) {
          ws.removeEventListener('message', onMsg);
          res(m.result);
        }
      };
      ws.addEventListener('message', onMsg);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await call('Page.enable');
  await call('Runtime.enable');

  const info = (await call('Runtime.evaluate', {
    expression: `
      new Promise((resolve) => {
        const v = document.createElement('video');
        v.src = 'http://localhost:5173/images/factoryimages/INVERTER.mp4';
        v.onloadedmetadata = () => {
          resolve({
            videoWidth: v.videoWidth,
            videoHeight: v.videoHeight,
            duration: v.duration
          });
        };
        v.onerror = (e) => resolve({ error: true });
      })
    `,
    awaitPromise: true,
    returnByValue: true
  })).result?.value;

  console.log('INVERTER.mp4 info:', info);
  chrome.kill();
}
testInverter().catch(console.error);
