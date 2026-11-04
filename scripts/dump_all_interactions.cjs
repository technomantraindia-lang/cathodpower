const fs = require('fs');

const jsPath = 'C:/Users/LENOVO/.gemini/antigravity-ide/brain/06ed21b4-ca7b-4740-b5a1-b201ee722848/scratch/webflow_extracted.js';
const js = fs.readFileSync(jsPath, 'utf8');

// Find all event objects
const events = [];
const eventRegex = /\{id:"(e-[a-f0-9]+|i-[a-f0-9]+)"[^}]*target:(\[[^\]]*\])[^}]*\}/g;
// Actually let's parse the full events array or match event objects properly
let eventStart = js.indexOf('events:[');
if (eventStart !== -1) {
  let b = 0, end = -1;
  for (let i = eventStart + 7; i < js.length; i++) {
    if (js[i] === '[') b++;
    else if (js[i] === ']') {
      if (b === 0) { end = i; break; }
      b--;
    }
  }
  const eventsSnippet = js.substring(eventStart + 7, end + 1);
  try {
    const evArr = eval('(' + eventsSnippet + ')');
    fs.writeFileSync('scripts/all_events.json', JSON.stringify(evArr, null, 2));
    console.log('Saved all_events.json, count:', evArr.length);
  } catch (e) {
    console.error('Error evaling events:', e.message);
  }
}

// Also extract all timelines into a single json file
let tlStart = js.indexOf('timelines:{');
if (tlStart !== -1) {
  let b = 0, end = -1;
  for (let i = tlStart + 10; i < js.length; i++) {
    if (js[i] === '{') b++;
    else if (js[i] === '}') {
      if (b === 0) { end = i; break; }
      b--;
    }
  }
  const tlSnippet = js.substring(tlStart + 10, end + 1);
  try {
    const tlObj = eval('(' + tlSnippet + ')');
    fs.writeFileSync('scripts/all_timelines.json', JSON.stringify(tlObj, null, 2));
    console.log('Saved all_timelines.json, count:', Object.keys(tlObj).length);
  } catch (e) {
    console.error('Error evaling timelines:', e.message);
  }
}
