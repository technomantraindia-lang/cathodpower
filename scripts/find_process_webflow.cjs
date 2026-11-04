const fs = require('fs');

const path = 'C:/Users/LENOVO/.gemini/antigravity-ide/brain/06ed21b4-ca7b-4740-b5a1-b201ee722848/.system_generated/steps/675/content.md';
const content = fs.readFileSync(path, 'utf8');
console.log('Total content length:', content.length);

// Check if IX2 data exists
const mIx = content.match(/IX2_PAGE_INTERACTION_DATA\s*=\s*(\{[\s\S]*?\});/);
if (mIx) {
  console.log('IX2 data matched!');
  try {
    const data = JSON.parse(mIx[1]);
    const timelines = data.site?.interactions?.timelines || {};
    console.log('Timeline keys:', Object.keys(timelines));
    if (timelines['t-ec29d4d4']) {
      fs.writeFileSync('scripts/process_timeline.json', JSON.stringify(timelines['t-ec29d4d4'], null, 2));
      console.log('Wrote process_timeline.json');
    }
    // Also look at events
    const events = data.site?.interactions?.events || [];
    const procEvents = events.filter(e => JSON.stringify(e).toLowerCase().includes('process'));
    fs.writeFileSync('scripts/process_events.json', JSON.stringify(procEvents, null, 2));
    console.log('Wrote process_events.json, count:', procEvents.length);
  } catch (e) {
    console.error('Error parsing IX2 JSON:', e.message);
  }
} else {
  console.log('No IX2_PAGE_INTERACTION_DATA found directly in content.md');
}

// Find HTML related to process
const start = content.indexOf('<section class="main-section process-section"');
let end = content.indexOf('</section>', start);
if (end !== -1) {
  end += 10;
  const sectionHtml = content.slice(start, end);
  fs.writeFileSync('scripts/exact_ref_process.html', sectionHtml);
  console.log('Saved exact_ref_process.html, length:', sectionHtml.length);
} else {
  console.log('Could not find end of section');
}
