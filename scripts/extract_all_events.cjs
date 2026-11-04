const fs = require('fs');

const js = fs.readFileSync('C:/Users/LENOVO/.gemini/antigravity-ide/brain/06ed21b4-ca7b-4740-b5a1-b201ee722848/scratch/webflow_extracted.js', 'utf8');

// Find all objects with timelineIds
const regex = /\{id:"(i-[a-f0-9]+|e-[a-f0-9]+)"/g;
let match;
const interactions = [];

while ((match = regex.exec(js)) !== null) {
  const startIdx = match.index;
  let b = 0, endIdx = -1;
  for (let i = startIdx; i < js.length; i++) {
    if (js[i] === '{') b++;
    else if (js[i] === '}') {
      b--;
      if (b === 0) {
        endIdx = i;
        break;
      }
    }
  }
  if (endIdx !== -1) {
    const snippet = js.substring(startIdx, endIdx + 1);
    try {
      const obj = eval('(' + snippet + ')');
      interactions.push(obj);
    } catch (e) {
      // ignore
    }
  }
}

console.log('Found interactions:', interactions.length);
fs.writeFileSync('scripts/extracted_all_events.json', JSON.stringify(interactions, null, 2));

interactions.forEach(it => {
  console.log('ID:', it.id, 'TimelineIds:', it.timelineIds, 'Triggers:', JSON.stringify(it.triggers));
});
