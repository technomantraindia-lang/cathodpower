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

const INPUT_EXTS = new Set([".png", ".jpg", ".jpeg", ".JPG", ".PNG", ".JPEG"]);

const WEBP_OPTIONS = {
  quality: 85,
  alphaQuality: 90,
  effort: 5,
};

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

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
      if (ent.name === "node_modules" || ent.name === "dist") continue;
      yield* walk(full);
    } else if (ent.isFile()) {
      yield full;
    }
  }
}

async function optimizeFile(inputPath) {
  const ext = path.extname(inputPath);
  if (!INPUT_EXTS.has(ext)) return { skipped: true };

  const outPath = inputPath.slice(0, -ext.length) + ".webp";
  if (await fileExists(outPath)) return { skipped: true };

  const stat = await fs.stat(inputPath);
  // Skip tiny images; they don’t move the needle.
  if (stat.size < 50 * 1024) return { skipped: true };

  // Some source assets are extremely large (e.g. print-ready PNGs).
  // We keep visuals identical (no resize), but allow processing above sharp's default pixel limit.
  const img = sharp(inputPath, { failOn: "none", limitInputPixels: false });
  await img.webp(WEBP_OPTIONS).toFile(outPath);

  const outStat = await fs.stat(outPath);
  return { skipped: false, bytesIn: stat.size, bytesOut: outStat.size, outPath };
}

async function run() {
  let converted = 0;
  let skipped = 0;
  let failed = 0;
  let savedBytes = 0;

  for (const dir of TARGET_DIRS) {
    for await (const file of walk(dir)) {
      try {
        const r = await optimizeFile(file);
        if (r.skipped) {
          skipped += 1;
          continue;
        }
        converted += 1;
        savedBytes += (r.bytesIn ?? 0) - (r.bytesOut ?? 0);
        // eslint-disable-next-line no-console
        console.log(
          `webp: ${path.relative(repoRoot, file)} -> ${path.relative(repoRoot, r.outPath)} (${(
            (r.bytesIn / 1024 / 1024)
          ).toFixed(2)}MB → ${((r.bytesOut / 1024 / 1024)).toFixed(2)}MB)`
        );
      } catch (err) {
        failed += 1;
        // eslint-disable-next-line no-console
        console.warn(`skip (error): ${path.relative(repoRoot, file)} :: ${err?.message ?? err}`);
      }
    }
  }

  // eslint-disable-next-line no-console
  console.log(
    `done: converted=${converted} skipped=${skipped} failed=${failed} saved=${(savedBytes / 1024 / 1024).toFixed(2)}MB`
  );
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});

