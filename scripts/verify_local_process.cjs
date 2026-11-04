const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function test() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9558',
    '--disable-gpu',
    '--window-size=1440,900',
    '--no-first-run'
  ]);
  await new Promise(r => setTimeout(r, 1200));

  const targets = await new Promise((resolve) => {
    http.get('http://127.0.0.1:9558/json', res => {
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

  const procInfo = (await call('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.querySelector('.process-scroll') || document.querySelector('#process');
        const rect = el.getBoundingClientRect();
        return {
          top: rect.top + window.scrollY,
          height: el.offsetHeight,
          windowHeight: window.innerHeight
        };
      })()
    `,
    returnByValue: true
  })).result?.value;

  console.log('Local proc info:', procInfo);

  const fracs = [0, 0.15, 0.35, 0.5, 0.65, 0.8, 1.0];
  const states = [];

  for (let i = 0; i < fracs.length; i++) {
    const f = fracs[i];
    const scrollY = procInfo.top + f * (procInfo.height - procInfo.windowHeight);
    
    await call('Runtime.evaluate', {
      expression: `window.scrollTo({ top: ${scrollY}, behavior: 'instant' });`
    });

    await new Promise(r => setTimeout(r, 600));

    const evalData = (await call('Runtime.evaluate', {
      expression: `
        (() => {
          const cards = Array.from(document.querySelectorAll('.single-process-wrap'));
          return cards.map((c, idx) => {
            const rect = c.getBoundingClientRect();
            const titleEl = c.querySelector('.process-title');
            const step = c.querySelector('.process-step');
            return {
              idx,
              top: Math.round(rect.top),
              titleTransform: titleEl ? titleEl.style.transform : null,
              titleOpacity: titleEl ? window.getComputedStyle(titleEl).opacity : null,
              stepOpacity: step ? window.getComputedStyle(step).opacity : null
            };
          });
        })()
      `,
      returnByValue: true
    })).result?.value;

    states.push({ frac: f, scrollY: Math.round(scrollY), cards: evalData });

    const shot = await call('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`scripts/my_f_${Math.round(f * 100)}.png`, Buffer.from(shot.data, 'base64'));
    console.log(`Saved screenshot my_f_${Math.round(f * 100)}.png`);
  }

  fs.writeFileSync('scripts/local_verified_states.json', JSON.stringify(states, null, 2));
  console.log('Saved local_verified_states.json');
  chrome.kill();
}

test().catch(console.error);
