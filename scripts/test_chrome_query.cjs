const { spawn } = require('child_process');
const http = require('http');

async function test() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9555',
    '--disable-gpu',
    '--no-first-run'
  ]);
  await new Promise(r => setTimeout(r, 1000));

  const targets = await new Promise((resolve) => {
    http.get('http://127.0.0.1:9555/json', res => {
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
  await call('Page.navigate', { url: 'https://tokomoo-emergena.webflow.io/' });
  
  await new Promise(r => setTimeout(r, 6000));

  const evalRes = await call('Runtime.evaluate', {
    expression: '({ title: document.title, cards: document.querySelectorAll(".single-process-wrap").length, scrollEl: !!document.querySelector(".process-scroll") })',
    returnByValue: true
  });
  console.log('Result:', JSON.stringify(evalRes.result?.value));
  chrome.kill();
}
test().catch(console.error);
