const fs = require('fs');
const html = fs.readFileSync('C:/Users/LENOVO/.gemini/antigravity-ide/brain/7fba60a6-ceff-4946-9dd4-845954958e7e/scratch/dumped_dom_js.html', 'utf8');

const m = html.match(/data-automation-id="default-ix2-data"[^>]*>([\s\S]*?)<\/script>/i) ||
          html.match(/IX2_PAGE_INTERACTION_DATA\s*=\s*([\s\S]*?);/);

if (m) {
  const data = JSON.parse(m[1]);
  console.log('IX2 data found!');
  const site = data.site || {};
  const events = site.interactions?.events || [];
  const timelines = site.interactions?.timelines || {};
  
  // Find interactions mentioning process
  events.forEach(e => {
    const s = JSON.stringify(e);
    if (s.includes('process') || s.includes('t-ec29d4d4') || s.includes('t-2300f6de')) {
      console.log('\n--- Event:', e.id, e.name);
      console.log(JSON.stringify(e, null, 2));
    }
  });

  console.log('\nTimeline t-ec29d4d4:');
  console.log(JSON.stringify(timelines['t-ec29d4d4'], null, 2));
} else {
  console.log('IX2 data not found');
}
