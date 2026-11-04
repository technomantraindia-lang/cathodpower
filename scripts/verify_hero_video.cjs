const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function test() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9559',
    '--disable-gpu',
    '--window-size=1440,900',
    '--no-first-run'
  ]);
  await new Promise(r => setTimeout(r, 1200));

  const targets = await new Promise((resolve) => {
    http.get('http://127.0.0.1:9559/json', res => {
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
  
  // Wait 3 seconds for video playback to start
  await new Promise(r => setTimeout(r, 3500));

  const videoStatus = (await call('Runtime.evaluate', {
    expression: `
      (() => {
        const v = document.querySelector('video.hero-video-bg') || document.querySelector('.wrapper-image-background video');
        if (!v) return { error: 'No video element found!' };
        return {
          found: true,
          src: v.currentSrc,
          paused: v.paused,
          currentTime: v.currentTime,
          duration: v.duration,
          videoWidth: v.videoWidth,
          videoHeight: v.videoHeight,
          muted: v.muted,
          loop: v.loop
        };
      })()
    `,
    returnByValue: true
  })).result?.value;

  console.log('Video status:', JSON.stringify(videoStatus, null, 2));

  const shot = await call('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scripts/hero_video_verified.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved hero_video_verified.png');

  chrome.kill();
}

test().catch(console.error);
