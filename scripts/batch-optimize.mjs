import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const TARGET_DIRS = [
  path.join(repoRoot, "src", "assets"),
  path.join(repoRoot, "public", "images"),
];

const INPUT_EXTS = new Set([".png", ".jpg", ".jpeg", ".JPG", ".JPEG", ".PNG"]);
const MAX_DIMENSION = 2048;

async function* walk(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === "node_modules" || ent.name === "dist" || ent.name === "videos") continue;
      yield* walk(full);
    } else if (ent.isFile()) {
      yield full;
    }
  }
}

async function processImage(filePath) {
  const ext = path.extname(filePath);
  if (!INPUT_EXTS.has(ext)) return null;

  try {
    const inputBuffer = await fs.readFile(filePath);
    const initialBytes = inputBuffer.length;
    const baseWithoutExt = filePath.slice(0, -ext.length);
    const webpPath = `${baseWithoutExt}.webp`;

    const img = sharp(inputBuffer, { failOn: "none", limitInputPixels: false });
    const meta = await img.metadata();

    const needResize = (meta.width && meta.width > MAX_DIMENSION) || (meta.height && meta.height > MAX_DIMENSION);

    // 1. Generate WebP
    let webpPipeline = sharp(inputBuffer, { failOn: "none", limitInputPixels: false });
    if (needResize) {
      webpPipeline = webpPipeline.resize({
        width: MAX_DIMENSION,
        height: MAX_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      });
    }
    const webpBuffer = await webpPipeline
      .webp({ quality: 82, alphaQuality: 88, effort: 5 })
      .toBuffer();
    await fs.writeFile(webpPath, webpBuffer);

    // 2. If original file is large (> 500KB) or oversized, replace with optimized & resized version
    let optimizedSourceBytes = initialBytes;
    if (initialBytes > 400 * 1024 || needResize) {
      let srcPipeline = sharp(inputBuffer, { failOn: "none", limitInputPixels: false });
      if (needResize) {
        srcPipeline = srcPipeline.resize({
          width: MAX_DIMENSION,
          height: MAX_DIMENSION,
          fit: "inside",
          withoutEnlargement: true,
        });
      }

      let optimizedBuffer;
      const lowerExt = ext.toLowerCase();
      if (lowerExt === ".png") {
        optimizedBuffer = await srcPipeline
          .png({ compressionLevel: 9, adaptiveFiltering: true })
          .toBuffer();
      } else {
        optimizedBuffer = await srcPipeline
          .jpeg({ quality: 84, mozjpeg: true })
          .toBuffer();
      }

      if (optimizedBuffer.length < initialBytes) {
        await fs.writeFile(filePath, optimizedBuffer);
        optimizedSourceBytes = optimizedBuffer.length;
      }
    }

    return {
      file: path.relative(repoRoot, filePath),
      originalMB: (initialBytes / (1024 * 1024)).toFixed(2),
      sourceMB: (optimizedSourceBytes / (1024 * 1024)).toFixed(2),
      webpMB: (webpBuffer.length / (1024 * 1024)).toFixed(2),
      savedBytes: initialBytes - webpBuffer.length,
    };
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
    return null;
  }
}

async function main() {
  console.log("Starting comprehensive image optimization...");
  let count = 0;
  let totalSaved = 0;

  for (const dir of TARGET_DIRS) {
    for await (const file of walk(dir)) {
      const result = await processImage(file);
      if (result) {
        count++;
        totalSaved += Math.max(0, result.savedBytes);
        if (parseFloat(result.originalMB) > 0.5) {
          console.log(`[Optimized] ${result.file}: ${result.originalMB}MB -> Source: ${result.sourceMB}MB | WebP: ${result.webpMB}MB`);
        }
      }
    }
  }

  console.log(`Done! Processed ${count} images. Total space saved: ${(totalSaved / (1024 * 1024)).toFixed(2)} MB`);
}

main().catch(console.error);
