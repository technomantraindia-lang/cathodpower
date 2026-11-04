const fs = require('fs');

const jsPath = 'C:/Users/LENOVO/.gemini/antigravity-ide/brain/06ed21b4-ca7b-4740-b5a1-b201ee722848/scratch/webflow_extracted.js';
if (!fs.existsSync(jsPath)) {
  console.log('webflow_extracted.js does not exist at path');
  process.exit(1);
}

const js = fs.readFileSync(jsPath, 'utf8');
console.log('Length of js:', js.length);

// Extract the full interactions object if possible
const startIdx = js.indexOf('site:{');
if (startIdx !== -1) {
  console.log('Found site:{');
}

// Find all timeline IDs
const timelineMatches = [...js.matchAll(/id:"(t-[a-f0-9]+)"/g)].map(m => m[1]);
const uniqueTimelines = [...new Set(timelineMatches)];
console.log('Unique timelines:', uniqueTimelines);

// Find each timeline and what classes it targets
const summary = [];
uniqueTimelines.forEach(tid => {
  const needle = '{id:"' + tid + '"';
  const idx = js.indexOf(needle);
  if (idx !== -1) {
    let b = 0, end = -1;
    for (let i = idx; i < js.length; i++) {
      if (js[i] === '{') b++;
      else if (js[i] === '}') {
        b--;
        if (b === 0) { end = i; break; }
      }
    }
    const snippet = js.substring(idx, end + 1);
    try {
      const obj = eval('(' + snippet + ')');
      const targetClasses = [];
      if (obj.actions) {
        obj.actions.forEach(a => {
          if (a.targets) {
            a.targets.forEach(t => {
              if (t[0] === 'wf:class' && t[1]) {
                targetClasses.push(...t[1]);
              }
            });
          }
        });
      }
      summary.push({ id: tid, targets: [...new Set(targetClasses)], actionCount: obj.actions?.length });
    } catch (e) {
      summary.push({ id: tid, error: e.message });
    }
  }
});

console.log(JSON.stringify(summary, null, 2));
fs.writeFileSync('scripts/timelines_summary.json', JSON.stringify(summary, null, 2));
