const { spawn } = require('child_process');
const http = require('http');

async function run() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9565',
    '--disable-gpu',
    '--no-first-run'
  ]);
  await new Promise(r => setTimeout(r, 1200));

  const targets = await new Promise((resolve) => {
    http.get('http://127.0.0.1:9565/json', res => {
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
  await call('Page.navigate', { url: 'http://localhost:5173/' });
  await new Promise(r => setTimeout(r, 2000));

  const res = (await call('Runtime.evaluate', {
    expression: `
      (() => {
        const v = document.querySelector('video');
        if (!v) return 'No video found';
        return {
          currentSrc: v.currentSrc,
          videoWidth: v.videoWidth,
          videoHeight: v.videoHeight,
          duration: v.duration,
          readyState: v.readyState,
          paused: v.paused,
          computedFilter: window.getComputedStyle(v).filter,
          rect: v.getBoundingClientRect(),
          overlay: (() => {
            const grad = document.querySelector('.gradient-wrap.hero');
            return grad ? {
              background: window.getComputedStyle(grad).background,
              opacity: window.getComputedStyle(grad).opacity,
              display: window.getComputedStyle(grad).display
            } : null;
          })()
        };
      })()
    `,
    returnByValue: true
  })).result?.value;

  console.log('Video diagnostics:', JSON.stringify(res, null, 2));
  chrome.kill();
}
run().catch(console.error);
