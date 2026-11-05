import fs from "fs";
import path from "path";

const pdfPath = path.resolve("new pdf changes/Content.pdf");

async function main() {
  try {
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const data = new Uint8Array(fs.readFileSync(pdfPath));
    const doc = await pdfjs.getDocument({ data }).promise;
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      const lines = [];
      let line = "";
      let lastY = null;
      for (const item of content.items) {
        const y = item.transform?.[5];
        if (lastY != null && Math.abs(y - lastY) > 4) {
          lines.push(line.trim());
          line = "";
        }
        line += (line && !line.endsWith(" ") ? " " : "") + item.str;
        lastY = y;
      }
      if (line.trim()) lines.push(line.trim());
      console.log(`\n===== PAGE ${i} =====\n`);
      console.log(lines.filter(Boolean).join("\n"));
    }
  } catch (err) {
    console.error("FAIL", err.message);
    process.exit(1);
  }
}

main();
