import fs from "fs";
import path from "path";

const dist = path.resolve("dist");

function rm(target) {
  const full = path.join(dist, target);
  if (fs.existsSync(full)) {
    fs.rmSync(full, { recursive: true, force: true });
    console.log("removed", target);
  }
}

function rmLarge(dir, maxBytes) {
  const root = path.join(dist, dir);
  if (!fs.existsSync(root)) return;
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      rmLarge(path.join(dir, entry.name), maxBytes);
      continue;
    }
    const size = fs.statSync(full).size;
    if (size > maxBytes) {
      fs.unlinkSync(full);
      console.log(
        `removed large file ${path.join(dir, entry.name)} (${(size / 1e6).toFixed(1)} MB)`
      );
    }
  }
}

if (!fs.existsSync(dist)) {
  console.error("dist/ missing — run build first");
  process.exit(1);
}

// Keep the site lean enough for GitHub Pages
rm("CATHODE POWER USER MANUAL");
rm("NEW PRODUCT IMAGES"); // duplicates of images/products
rm("product image");
rm("OndFile");

// Drop oversized media that isn't required for first paint
rmLarge("video", 15 * 1024 * 1024);
rmLarge("images", 40 * 1024 * 1024);
rmLarge("datasheets", 40 * 1024 * 1024);
rmLarge("models", 50 * 1024 * 1024);

// SPA fallback
fs.copyFileSync(path.join(dist, "index.html"), path.join(dist, "404.html"));
console.log("wrote 404.html");
