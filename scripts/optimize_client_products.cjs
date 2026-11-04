const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES = [
  '2kW - 4kW Single Phase.png',
  '4.4kW to 6kW Single Phase.png',
  '4kW to 15kW Three Phase.png',
  '18kW - 25kW Three Phase.png',
  '30kW - 50kW Three Phase.png',
  '80kW - 110kW Three Phase.png',
  '3kW - 6kW Hybrid Single Phase.png',
  '8kW - 15kW Hybrid Three Phase Inverter New.png',
  'Dual MPPT Micro.png',
  'Four MPPT MIcro.png',
  'Rack Mount Battery.png',
  'Wall Mount Battery.png',
];

const srcDir = path.resolve('src/assets/images/products');
const pubImagesDir = path.resolve('public/images/products');
const pubNewDir = path.resolve('public/NEW PRODUCT IMAGES');

if (!fs.existsSync(pubImagesDir)) fs.mkdirSync(pubImagesDir, { recursive: true });
if (!fs.existsSync(pubNewDir)) fs.mkdirSync(pubNewDir, { recursive: true });

async function run() {
  console.log('Starting optimization for 12 client product images...');

  for (const name of IMAGES) {
    const srcPng = path.join(srcDir, name);
    if (!fs.existsSync(srcPng)) {
      console.warn('File not found in src:', srcPng);
      continue;
    }

    const baseName = name.slice(0, name.lastIndexOf('.'));
    const webpName = `${baseName}.webp`;
    const srcWebp = path.join(srcDir, webpName);

    const initialSize = fs.statSync(srcPng).size;

    // 1. Generate WebP (crisp 1400px max, quality 86)
    const webpBuf = await sharp(srcPng)
      .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 86, alphaQuality: 90 })
      .toBuffer();

    fs.writeFileSync(srcWebp, webpBuf);
    fs.writeFileSync(path.join(pubImagesDir, webpName), webpBuf);
    fs.writeFileSync(path.join(pubNewDir, webpName), webpBuf);

    // 2. Generate optimized PNG fallback (crisp 1400px max, high compression)
    const pngBuf = await sharp(srcPng)
      .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toBuffer();

    // Overwrite the bloated source PNG with optimized PNG
    fs.writeFileSync(srcPng, pngBuf);
    fs.writeFileSync(path.join(pubImagesDir, name), pngBuf);
    fs.writeFileSync(path.join(pubNewDir, name), pngBuf);

    console.log(
      `✓ ${name}: ${(initialSize / (1024*1024)).toFixed(2)} MB -> WebP: ${(webpBuf.length / 1024).toFixed(1)} KB | PNG: ${(pngBuf.length / 1024).toFixed(1)} KB`
    );
  }

  console.log('All 12 images optimized successfully!');
}

run().catch(console.error);
