const fs = require('fs');
const js = fs.readFileSync('C:/Users/LENOVO/.gemini/antigravity-ide/brain/06ed21b4-ca7b-4740-b5a1-b201ee722848/scratch/webflow_extracted.js', 'utf8');

const idx = js.indexOf('{id:"t-ec29d4d4"');
if (idx !== -1) {
  console.log('Found {id:"t-ec29d4d4" at', idx);
  let braceCount = 0;
  let endBrace = -1;
  for (let i = idx; i < js.length; i++) {
    if (js[i] === '{') braceCount++;
    else if (js[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        endBrace = i;
        break;
      }
    }
  }
  const timelineJson = js.substring(idx, endBrace + 1);
  fs.writeFileSync('scripts/timeline_process_clean.json', timelineJson);
  console.log('Saved timeline_process_clean.json, length:', timelineJson.length);
} else {
  console.log('Not found');
}
