const http = require('http');

http.get('http://127.0.0.1:9222/json', async res => {
  let d = ''; res.on('data', c => d += c);
  res.on('end', async () => {
    const list = JSON.parse(d);
    const target = list.find(t => t.id === 'B94F691D1CFCDE57CF1BED736F1A34E3');
    if (!target) { console.log('ci target not found'); return; }
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);
    let id = 1;
    function call(method, params = {}) {
      return new Promise(res => {
        const msgId = id++;
        const onMsg = (e) => {
          const m = JSON.parse(e.data);
          if (m.id === msgId) { ws.removeEventListener('message', onMsg); res(m.result); }
        };
        ws.addEventListener('message', onMsg);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    const evalRes = await call('Runtime.evaluate', {
      expression: `(() => {
        const h2 = document.querySelector(".cp-header__megaIntroTop h2");
        return h2 ? {
          text: h2.innerText,
          fontSize: window.getComputedStyle(h2).fontSize,
          fontWeight: window.getComputedStyle(h2).fontWeight,
          fontFamily: window.getComputedStyle(h2).fontFamily
        } : null;
      })()`,
      returnByValue: true
    });
    console.log('CI PAGE EVAL:', JSON.stringify(evalRes.result?.value));
    ws.close();
  });
});
