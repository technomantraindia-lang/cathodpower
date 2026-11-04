import sharp from "sharp";
import fs from "fs";
import path from "path";

const SRC_DIR =
  "C:/Users/LENOVO/Downloads/cathode 2 analzye/Website Inverter Images";
const DEST_DIRS = [
  "public/NEW PRODUCT IMAGES",
  "public/images/products",
  "src/assets/images/products",
];

const FILES = [
  "2kW - 4kW Single Phase.png",
  "4.4kW to 6kW Single Phase.png",
  "4kW to 15kW Three Phase.png",
  "18kW - 25kW Three Phase.png",
  "30kW - 50kW Three Phase.png",
  "80kW - 110kW Three Phase.png",
  "3kW - 6kW Hybrid Single Phase.png",
  "8kW - 15kW Hybrid Three Phase Inverter New.png",
  "Dual MPPT Micro.png",
  "Four MPPT MIcro.png",
  "Rack Mount Battery.png",
  "Wall Mount Battery.png",
];

/** Heal obvious white scrub rectangles on dark LCD bezels (ongrid white units). */
async function healLcdWhitePatches(raw, width, height, channels) {
  const out = Buffer.from(raw);
  let fixed = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      if (out[i + 3] < 200) continue;
      const r = out[i];
      const g = out[i + 1];
      const b = out[i + 2];
      const lum = (r + g + b) / 3;

      // Bright desaturated blotch sitting on a dark neighbourhood (scrub fog / white box)
      if (lum < 170 || Math.abs(r - g) > 25 || Math.abs(g - b) > 25) continue;

      let darkN = 0;
      let br = 0;
      let bg = 0;
      let bb = 0;
      let bn = 0;
      for (let dy = -10; dy <= 10; dy += 2) {
        for (let dx = -10; dx <= 10; dx += 2) {
          const xx = x + dx;
          const yy = y + dy;
          if (xx < 0 || yy < 0 || xx >= width || yy >= height) continue;
          const j = (yy * width + xx) * channels;
          if (out[j + 3] < 200) continue;
          const ll = (out[j] + out[j + 1] + out[j + 2]) / 3;
          if (ll < 55) {
            darkN++;
            br += out[j];
            bg += out[j + 1];
            bb += out[j + 2];
            bn++;
          }
        }
      }

      // Only rewrite if surrounded by dark LCD/bezel pixels
      if (darkN >= 8 && bn > 0 && lum > 160) {
        out[i] = Math.round(br / bn);
        out[i + 1] = Math.round(bg / bn);
        out[i + 2] = Math.round(bb / bn);
        fixed++;
      }
    }
  }

  return { buffer: out, fixed };
}

async function processFile(file) {
  const src = path.join(SRC_DIR, file);
  if (!fs.existsSync(src)) {
    console.warn("missing", src);
    return;
  }

  const meta = await sharp(src).metadata();
  const targetW = Math.min(1400, meta.width);
  let pipeline = sharp(src).resize({
    width: targetW,
    withoutEnlargement: true,
    fit: "inside",
  });

  let { data, info } = await pipeline
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Heal LCD scrub patches on white inverter families
  const needsLcdHeal =
    /Single Phase|Three Phase|Hybrid/i.test(file) &&
    !/Micro|Battery/i.test(file);

  let fixed = 0;
  if (needsLcdHeal) {
    const healed = await healLcdWhitePatches(
      data,
      info.width,
      info.height,
      info.channels
    );
    data = healed.buffer;
    fixed = healed.fixed;
  }

  const pngBuf = await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .png({ compressionLevel: 8 })
    .toBuffer();

  const webpBuf = await sharp(pngBuf).webp({ quality: 90 }).toBuffer();
  const base = file.replace(/\.png$/i, "");

  for (const dir of DEST_DIRS) {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${base}.png`), pngBuf);
    fs.writeFileSync(path.join(dir, `${base}.webp`), webpBuf);
  }

  console.log(
    `✓ ${file} → ${info.width}x${info.height} lcdFixed=${fixed} png=${pngBuf.length}`
  );
}

for (const file of FILES) {
  await processFile(file);
}

console.log("done");
