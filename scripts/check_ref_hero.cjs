const fs = require('fs');
const html = fs.readFileSync('ref_page.html', 'utf8');
const idx = html.indexOf('<div class="hero-content-wrapper"');
if (idx !== -1) {
  console.log(html.slice(idx, idx + 2500));
} else {
  const idx2 = html.indexOf('hero-content-wrapper');
  const second = html.indexOf('hero-content-wrapper', idx2 + 50);
  console.log('Second match:', html.slice(second - 100, second + 2000));
}
