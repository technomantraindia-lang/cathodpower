const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function test() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9560',
    '--disable-gpu',
    '--window-size=1440,900',
    '--no-first-run'
  ]);
  await new Promise(r => setTimeout(r, 1200));

  const targets = await new Promise((resolve) => {
    http.get('http://127.0.0.1:9560/json', res => {
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
  await call('Page.navigate', { url: 'https://cathodepower.com/' });
  
  await new Promise(r => setTimeout(r, 6000));

  const sectionsData = (await call('Runtime.evaluate', {
    expression: `
      (() => {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, .vc-card, .os-card, section')).map(el => {
          return {
            tag: el.tagName,
            className: el.className,
            text: el.innerText.trim().slice(0, 300)
          };
        });
        const imgs = Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt
        }));
        return { headings: headings.filter(h => h.text.length > 0).slice(0, 50), imgs: imgs.slice(0, 40) };
      })()
    `,
    returnByValue: true
  })).result?.value;

  fs.writeFileSync('scripts/live_cathodepower_dump.json', JSON.stringify(sectionsData, null, 2));
  console.log('Saved live_cathodepower_dump.json');
  chrome.kill();
}

test().catch(console.error);
