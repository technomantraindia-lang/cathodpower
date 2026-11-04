const fs = require('fs');
const js = fs.readFileSync('C:/Users/LENOVO/.gemini/antigravity-ide/brain/06ed21b4-ca7b-4740-b5a1-b201ee722848/scratch/webflow_extracted.js', 'utf8');

['t-6f3f6be4', 't-02c7ef0e', 't-7a0af10b'].forEach(id => {
  const needle = '{id:"' + id + '"';
  const idx = js.indexOf(needle);
  if (idx !== -1) {
    let b = 0, end = -1;
    for (let i = idx; i < js.length; i++) {
      if (js[i] === '{') b++;
      else if (js[i] === '}') {
        b--;
        if (b === 0) {
          end = i;
          break;
        }
      }
    }
    const snippet = js.substring(idx, end + 1);
    const obj = eval('(' + snippet + ')');
    fs.writeFileSync(`scripts/${id}.json`, JSON.stringify(obj, null, 2));
    console.log(`Saved scripts/${id}.json`);
  } else {
    console.log(`Not found: ${id}`);
  }
});
