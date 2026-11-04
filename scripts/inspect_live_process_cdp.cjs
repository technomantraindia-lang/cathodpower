const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9444',
    '--disable-gpu',
    '--window-size=1440,900',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  function getJson(url) {
    return new Promise((resolve, reject) => {
      http.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });
  }

  const targets = await getJson('http://127.0.0.1:9444/json');
  console.log('Targets:', targets.length);
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const wsUrl = pageTarget.webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);
  let id = 1;
  const callbacks = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      callbacks.get(msg.id)(msg);
      callbacks.delete(msg.id);
    }
  };

  await new Promise(r => ws.onopen = r);

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      callbacks.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  console.log('Navigating to live site...');
  await send('Page.enable');
  
  const loadPromise = new Promise(resolve => {
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Page.loadEventFired') {
        ws.removeEventListener('message', handler);
        resolve();
      }
    };
    ws.addEventListener('message', handler);
  });

  await send('Page.navigate', { url: 'https://tokomoo-emergena.webflow.io/' });
  await loadPromise;
  console.log('Page loaded, waiting for animations/Webflow IX2 to initialize...');
  await new Promise(r => setTimeout(r, 4000));

  // evaluate script to get process-scroll bounding rect
  const res = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.querySelector('.process-scroll') || document.querySelector('#process');
        if (!el) return { error: 'none found', html: document.body.innerHTML.slice(0, 500) };
        const rect = el.getBoundingClientRect();
        return {
          top: rect.top + window.scrollY,
          height: el.offsetHeight,
          windowHeight: window.innerHeight
        };
      })()
    `,
    returnByValue: true
  });

  const procInfo = res.result?.value;
  console.log('Process info:', procInfo);

  if (!procInfo) {
    console.error('Process scroll not found!');
    chrome.kill();
    return;
  }

  const steps = [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1.0];
  const states = [];

  for (let i = 0; i < steps.length; i++) {
    const frac = steps[i];
    const scrollY = procInfo.top + frac * (procInfo.height - procInfo.windowHeight);
    
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, ${scrollY});`
    });

    // Wait for Webflow IX2 scrub animation to settle
    await new Promise(r => setTimeout(r, 600));

    const evalRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const cards = Array.from(document.querySelectorAll('.single-process-wrap'));
          return cards.map((c, idx) => {
            const rect = c.getBoundingClientRect();
            const titleEl = c.querySelector('.process-title');
            const titleWrap = c.querySelector('.process-title-wrap');
            const stepNum = c.querySelector('.process-step');
            const imgWrap = c.querySelector('.img-process-wrap');
            return {
              cardIndex: idx,
              cardRect: { top: rect.top, bottom: rect.bottom, height: rect.height },
              cardTransform: c.style.transform,
              titleTransform: titleEl ? titleEl.style.transform : null,
              titleOpacity: titleEl ? window.getComputedStyle(titleEl).opacity : null,
              titleWrapTransform: titleWrap ? titleWrap.style.transform : null,
              stepNumOpacity: stepNum ? window.getComputedStyle(stepNum).opacity : null,
              imgWrapTransform: imgWrap ? imgWrap.style.transform : null,
              titleText: titleEl ? titleEl.innerText.replace(/\\n/g, ' ') : ''
            };
          });
        })()
      `,
      returnByValue: true
    });

    const cardStates = evalRes.result?.value;
    states.push({ frac, scrollY, cardStates });

    // Capture screenshot
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`scripts/ref_step_${i}_${Math.round(frac*100)}.png`, Buffer.from(shot.result.data, 'base64'));
    console.log(`Saved screenshot ref_step_${i}_${Math.round(frac*100)}.png`);
  }

  fs.writeFileSync('scripts/ref_captured_states.json', JSON.stringify(states, null, 2));
  console.log('Saved ref_captured_states.json');

  chrome.kill();
}

run().catch(console.error);
