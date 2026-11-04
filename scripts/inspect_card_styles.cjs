const { spawn } = require('child_process');
const http = require('http');

async function run() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9564',
    '--disable-gpu',
    '--window-size=1440,900',
    '--no-first-run'
  ]);
  await new Promise(r => setTimeout(r, 1200));

  const targets = await new Promise((resolve) => {
    http.get('http://127.0.0.1:9564/json', res => {
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
  await new Promise(r => setTimeout(r, 2500));

  const info = (await call('Runtime.evaluate', {
    expression: `
      (() => {
        const cards = Array.from(document.querySelectorAll('.solution-card-wrap'));
        return cards.map(c => {
          const titleWrap = c.querySelector('.title-card-solution');
          const title = c.querySelector('.title-solution-card');
          const desc = c.querySelector('.description-solution');
          const num = c.querySelector('.solution-number');
          return {
            text: c.innerText,
            titleWrapStyle: titleWrap ? {
              opacity: window.getComputedStyle(titleWrap).opacity,
              display: window.getComputedStyle(titleWrap).display,
              visibility: window.getComputedStyle(titleWrap).visibility,
              color: window.getComputedStyle(titleWrap).color,
              height: window.getComputedStyle(titleWrap).height
            } : null,
            titleStyle: title ? {
              opacity: window.getComputedStyle(title).opacity,
              color: window.getComputedStyle(title).color,
              fontSize: window.getComputedStyle(title).fontSize
            } : null,
            numStyle: num ? {
              opacity: window.getComputedStyle(num).opacity,
              color: window.getComputedStyle(num).color
            } : null,
            descStyle: desc ? {
              opacity: window.getComputedStyle(desc).opacity,
              color: window.getComputedStyle(desc).color
            } : null,
          };
        });
      })()
    `,
    returnByValue: true
  })).result?.value;

  console.log('Cards DOM info:', JSON.stringify(info, null, 2));
  chrome.kill();
}
run().catch(console.error);
