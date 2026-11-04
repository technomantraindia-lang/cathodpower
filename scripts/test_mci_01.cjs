const { execSync } = require('child_process');
const path = require('path');
const dir = path.join(__dirname, '../public/images/inverter-sequence/perfect_keyframes');

const f0 = path.join(dir, 'kf_0_centered.jpg');
const f1 = path.join(dir, 'kf_1.jpg');
const out = path.join(dir, 'test_mci_01.mp4');

const t0 = Date.now();
const cmd = `ffmpeg -y -loop 1 -t 0.3 -i "${f0}" -loop 1 -t 0.3 -i "${f1}" -filter_complex "[0:v][1:v]concat=n=2:v=1:a=0[v];[v]minterpolate=fps=10:mi_mode=mci[out]" -map "[out]" -t 0.6 "${out}"`;

console.log('Running cmd...');
execSync(cmd, { stdio: 'inherit' });
console.log('Done in ' + (Date.now() - t0) + 'ms');
