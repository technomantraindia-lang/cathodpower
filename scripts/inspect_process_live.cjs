const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function test() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9556',
    '--disable-gpu',
    '--window-size=1440,900',
    '--no-first-run'
  ]);
  await new Promise(r => setTimeout(r, 1200));

  const targets = await new Promise((resolve) => {
    http.get('http://127.0.0.1:9556/json', res => {
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

  const procInfo = (await call('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.querySelector('.process-scroll');
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

  console.log('Proc info:', procInfo);

  // We want to sample at fractions: 0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.0
  const fracs = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.0];
  const states = [];

  for (let i = 0; i < fracs.length; i++) {
    const f = fracs[i];
    const scrollY = procInfo.top + f * (procInfo.height - procInfo.windowHeight);
    
    await call('Runtime.evaluate', {
      expression: `window.scrollTo({ top: ${scrollY}, behavior: 'instant' });`
    });

    // Wait 500ms for IX2 scrub interpolation
    await new Promise(r => setTimeout(r, 600));

    const evalData = (await call('Runtime.evaluate', {
      expression: `
        (() => {
          const header = document.querySelector('.process-title-section');
          const cards = Array.from(document.querySelectorAll('.single-process-wrap'));
          return {
            headerTransform: header ? header.style.transform : null,
            headerOpacity: header ? window.getComputedStyle(header).opacity : null,
            cards: cards.map((c, idx) => {
              const rect = c.getBoundingClientRect();
              const titleEl = c.querySelector('.process-title');
              const titleWrap = c.querySelector('.process-title-wrap');
              const step = c.querySelector('.process-step');
              const imgWrap = c.querySelector('.img-process-wrap');
              return {
                idx,
                top: Math.round(rect.top),
                cardTransform: c.style.transform,
                titleTransform: titleEl ? titleEl.style.transform : null,
                titleOpacity: titleEl ? window.getComputedStyle(titleEl).opacity : null,
                titleWrapTransform: titleWrap ? titleWrap.style.transform : null,
                stepOpacity: step ? window.getComputedStyle(step).opacity : null,
                imgWrapTransform: imgWrap ? imgWrap.style.transform : null
              };
            })
          };
        })()
      `,
      returnByValue: true
    })).result?.value;

    states.push({ frac: f, scrollY: Math.round(scrollY), ...evalData });

    const shot = await call('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`scripts/live_f_${Math.round(f * 100)}.png`, Buffer.from(shot.data, 'base64'));
    console.log(`Saved screenshot live_f_${Math.round(f * 100)}.png`);
  }

  fs.writeFileSync('scripts/live_scroll_states.json', JSON.stringify(states, null, 2));
  console.log('Saved live_scroll_states.json');
  chrome.kill();
}

test().catch(console.error);
