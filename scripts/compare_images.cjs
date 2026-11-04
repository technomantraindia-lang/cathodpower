const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

async function run() {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { margin: 0; background: #0b1a13; color: white; font-family: sans-serif; padding: 20px; }
      .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
      .card { background: #162a20; padding: 10px; border-radius: 12px; }
      img { width: 100%; height: 180px; object-fit: cover; border-radius: 8px; }
      h4 { margin: 8px 0 4px; font-size: 14px; }
    </style>
  </head>
  <body>
    <h2>Available Images Comparison</h2>
    <div class='grid'>
      <div class='card'>
        <h4>Cathode Site: forest.webp (01 Greener)</h4>
        <img src='http://localhost:5173/src/assets/images/forest.webp'>
      </div>
      <div class='card'>
        <h4>Cathode Site: An_ultra_realistic (02 Sustainable)</h4>
        <img src='http://localhost:5173/images/newimages/An_ultra_realistic_202604231257.webp'>
      </div>
      <div class='card'>
        <h4>Cathode Site: mountain.webp (03 Tomorrow)</h4>
        <img src='http://localhost:5173/src/assets/images/mountain.webp'>
      </div>
      <div class='card'>
        <h4>our-solutions-01-industrial.webp</h4>
        <img src='http://localhost:5173/images/newimages/our-solutions-01-industrial.webp'>
      </div>
      <div class='card'>
        <h4>our-solutions-02-commercial.webp</h4>
        <img src='http://localhost:5173/images/newimages/our-solutions-02-commercial.webp'>
      </div>
      <div class='card'>
        <h4>our-solutions-04-hybrid.webp</h4>
        <img src='http://localhost:5173/images/newimages/our-solutions-04-hybrid.webp'>
      </div>
    </div>
  </body>
  </html>
  `;

  fs.writeFileSync('scripts/compare_images.html', html);
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9561',
    '--disable-gpu',
    '--window-size=1200,800',
    '--no-first-run'
  ]);
  await new Promise(r => setTimeout(r, 1200));

  const targets = await new Promise((resolve) => {
    http.get('http://127.0.0.1:9561/json', res => {
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
  await call('Page.navigate', { url: 'file:///' + path.resolve('scripts/compare_images.html').replace(/\\/g, '/') });
  await new Promise(r => setTimeout(r, 2000));
  const snap = await call('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scripts/images_comparison.png', Buffer.from(snap.data, 'base64'));
  console.log('Saved scripts/images_comparison.png');
  chrome.kill();
}
run().catch(console.error);
