const http = require('http');

http.get('http://127.0.0.1:9222/json', async res => {
  let d = ''; res.on('data', c => d += c);
  res.on('end', async () => {
    const list = JSON.parse(d);
    const target = list.find(t => t.id === '6C83DDE431E72C724CAE7FBCA1FC44F7');
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

    await call('DOM.enable');
    await call('CSS.enable');
    const doc = await call('DOM.getDocument', { depth: -1 });
    const nodeRes = await call('DOM.querySelector', { nodeId: doc.root.nodeId, selector: '.cp-header__megaIntroTop h2' });
    console.log('NodeId:', nodeRes.nodeId);
    if (nodeRes.nodeId) {
      const matched = await call('CSS.getMatchedStylesForNode', { nodeId: nodeRes.nodeId });
      if (matched && matched.matchedCSSRules) {
        matched.matchedCSSRules.forEach(r => {
          console.log('--- Selector:', r.rule.selectorList.text, 'origin:', r.rule.origin);
          r.rule.style.cssProperties
            .filter(p => p.name.includes('font') || p.name.includes('size') || p.name.includes('line'))
            .forEach(p => console.log('   ', p.name + ':', p.value, p.important ? '!important' : ''));
        });
      }
      const comp = await call('CSS.getComputedStyleForNode', { nodeId: nodeRes.nodeId });
      const fontComp = comp.computedStyle.filter(p => p.name.includes('font') || p.name.includes('size') || p.name.includes('line'));
      console.log('COMPUTED:');
      fontComp.forEach(p => console.log('   ', p.name + ':', p.value));
    }
    ws.close();
  });
});
