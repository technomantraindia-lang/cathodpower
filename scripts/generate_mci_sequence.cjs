const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images/inverter-sequence/perfect_keyframes');

// Prepare temporary directory for ordered keyframes
const tempDir = path.join(dir, 'temp_input');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

// Copy kf_0_centered as input_0.jpg
fs.copyFileSync(path.join(dir, 'kf_0_centered.jpg'), path.join(tempDir, 'input_0.jpg'));
fs.copyFileSync(path.join(dir, 'kf_1.jpg'), path.join(tempDir, 'input_1.jpg'));
fs.copyFileSync(path.join(dir, 'kf_2.jpg'), path.join(tempDir, 'input_2.jpg'));
fs.copyFileSync(path.join(dir, 'kf_3.jpg'), path.join(tempDir, 'input_3.jpg'));
fs.copyFileSync(path.join(dir, 'kf_4.jpg'), path.join(tempDir, 'input_4.jpg'));
fs.copyFileSync(path.join(dir, 'kf_5.jpg'), path.join(tempDir, 'input_5.jpg'));

const outMp4 = path.join(dir, 'mci_full.mp4');
const cmd = `ffmpeg -y -framerate 1 -i "${path.join(tempDir, 'input_%d.jpg')}" -vf "minterpolate=fps=8:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1" -c:v libx264 -pix_fmt yuv420p "${outMp4}"`;

console.log('Running ffmpeg minterpolate pipeline...');
const t0 = Date.now();
try {
  execSync(cmd, { stdio: 'inherit' });
  console.log(`Success in ${(Date.now() - t0) / 1000}s!`);
} catch (e) {
  console.error('Error:', e.message);
}
