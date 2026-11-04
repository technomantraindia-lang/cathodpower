const fs = require('fs');
const content = fs.readFileSync('C:/Users/LENOVO/.gemini/antigravity-ide/brain/06ed21b4-ca7b-4740-b5a1-b201ee722848/.system_generated/steps/675/content.md', 'utf8');

const sections = [
  'principles',
  'projects',
  'process',
  'usp',
  'faq',
  'blog',
  'cta',
  'footer'
];

sections.forEach(sec => {
  let needle = sec;
  let idx = content.indexOf('class="main-section ' + sec);
  if (idx === -1) idx = content.indexOf('class="main-section ' + sec);
  if (idx === -1) {
    // search for any section containing sec
    const reg = new RegExp('<section[^>]*' + sec + '[^>]*>', 'i');
    const m = content.match(reg);
    if (m) idx = m.index;
  }
  if (idx !== -1) {
    const end = content.indexOf('</section>', idx);
    const html = content.substring(idx, end !== -1 ? end + 10 : idx + 2000);
    fs.writeFileSync(`scripts/ref_${sec}.html`, html);
    console.log(`Saved ref_${sec}.html, length: ${html.length}`);
  } else {
    console.log(`Section ${sec} not found`);
  }
});
