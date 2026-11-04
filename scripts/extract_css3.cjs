const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:/Users/LENOVO/.gemini/antigravity-ide/brain/7d0053ac-9fce-447a-8ea1-ae06a4c8f42e/.system_generated/logs/transcript_full.jsonl')
});

rl.on('line', (line) => {
  if (line.includes('Showing lines 450 to 600') && line.includes('Header.css')) {
    const data = JSON.parse(line);
    fs.writeFileSync('C:/Users/LENOVO/.gemini/antigravity-ide/brain/7d0053ac-9fce-447a-8ea1-ae06a4c8f42e/scratch/old_css_part3.txt', data.content);
    console.log('Saved old_css_part3.txt');
  }
});
