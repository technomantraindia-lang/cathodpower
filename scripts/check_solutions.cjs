const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function check() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9562',
    '--disable-gpu',
    '--window-size=1440,1100',
    '--no-first-run'
  ]);
  await new Promise(r => setTimeout(r, 1200));

  const targets = await new Promise((resolve) => {
    http.get('http://127.0.0.1:9562/json', res => {
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

  // Scroll so #solutions is neatly in view
  await call('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.getElementById('solutions');
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 40;
          window.scrollTo({ top, behavior: 'instant' });
          window.dispatchEvent(new Event('scroll'));
          if (window.ScrollTrigger) window.ScrollTrigger.refresh();
        }
      })()
    `
  });

  await new Promise(r => setTimeout(r, 3000));

  const clip = (await call('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.getElementById('solutions');
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height, scale: 1 };
      })()
    `,
    returnByValue: true
  })).result?.value;

  console.log('Clip bounds:', clip);

  const snap = await call('Page.captureScreenshot', {
    format: 'png'
  });

  fs.writeFileSync('scripts/solutions_screenshot.png', Buffer.from(snap.data, 'base64'));
  console.log('Saved scripts/solutions_screenshot.png');
  chrome.kill();
}

check().catch(console.error);
