const { spawn } = require('child_process');
const http = require('http');

async function test() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9557',
    '--disable-gpu',
    '--window-size=1440,900',
    '--no-first-run'
  ]);
  await new Promise(r => setTimeout(r, 1200));

  const targets = await new Promise((resolve) => {
    http.get('http://127.0.0.1:9557/json', res => {
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
  
  await new Promise(r => setTimeout(r, 4000));

  const res = (await call('Runtime.evaluate', {
    expression: `
      (() => {
        const cards = Array.from(document.querySelectorAll('.single-process-wrap'));
        return cards.map((c, i) => {
          const t = c.querySelector('.process-title');
          const tw = c.querySelector('.process-title-wrap');
          const s = c.querySelector('.process-step');
          return {
            card: i,
            cardHeight: c.offsetHeight,
            cardOverflow: window.getComputedStyle(c).overflow,
            titleHeight: t ? t.offsetHeight : null,
            titleWrapHeight: tw ? tw.offsetHeight : null
          };
        });
      })()
    `,
    returnByValue: true
  })).result?.value;

  console.log('Local cards info:', JSON.stringify(res, null, 2));
  chrome.kill();
}

test().catch(console.error);
