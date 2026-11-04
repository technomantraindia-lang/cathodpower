const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '../public/images/inverter-sequence');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function processSequence() {
  const targetW = 1920;
  const targetH = 1080;

  const rawFrames = [
    // 0: Assembled 2-R2.png
    path.join(__dirname, '../src/assets/images/products/2-R2.png'),
    // 1: Early lift
    'C:/Users/LENOVO/.gemini/antigravity-ide/brain/7d0053ac-9fce-447a-8ea1-ae06a4c8f42e/inverter_seq_0_5_start_1792044372033.jpg',
    // 2: 2 inches detached
    'C:/Users/LENOVO/.gemini/antigravity-ide/brain/7d0053ac-9fce-447a-8ea1-ae06a4c8f42e/inverter_seq_1_unsealing_1792044270885.jpg',
    // 3: Mid exploded
    'C:/Users/LENOVO/.gemini/antigravity-ide/brain/7d0053ac-9fce-447a-8ea1-ae06a4c8f42e/inverter_seq_2_mid_1792044304920.jpg',
    // 4: Deep exploded
    'C:/Users/LENOVO/.gemini/antigravity-ide/brain/7d0053ac-9fce-447a-8ea1-ae06a4c8f42e/inverter_seq_3_deep_1792044400749.jpg',
    // 5: Fully exploded
    path.join(__dirname, '../src/assets/images/products/inverter-exploded-diagram.jpg')
  ];

  for (let i = 0; i < rawFrames.length; i++) {
    const src = rawFrames[i];
    const outPath = path.join(dir, `seq_${i}.webp`);
    if (i === 0) {
      await sharp(src)
        .resize({ width: 1450, height: 980, fit: 'inside' })
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .extend({
          top: 50,
          bottom: 50,
          left: 235,
          right: 235,
          background: { r: 255, g: 255, b: 255 }
        })
        .resize(targetW, targetH)
        .webp({ quality: 92 })
        .toFile(outPath);
    } else {
      await sharp(src)
        .resize(targetW, targetH, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
        .webp({ quality: 92 })
        .toFile(outPath);
    }
    console.log(`Saved seq_${i}.webp`);
  }
}

processSequence()
  .then(() => console.log('All 6 sequence frames successfully created!'))
  .catch(console.error);
