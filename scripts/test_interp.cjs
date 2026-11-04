const { execSync } = require('child_process');
const path = require('path');

const cmd = 'ffmpeg -y -loop 1 -t 0.5 -i public/images/inverter-sequence/seq_2.webp -loop 1 -t 0.5 -i public/images/inverter-sequence/seq_3.webp -filter_complex "[0:v][1:v]concat=n=2:v=1:a=0[v];[v]minterpolate=fps=24:mi_mode=mci[out]" -map "[out]" -t 1 public/images/inverter-sequence/test_interp.mp4';

try {
  console.log('Running ffmpeg minterpolate...');
  execSync(cmd, { stdio: 'inherit' });
  console.log('Finished successfully!');
} catch (err) {
  console.error('Error running ffmpeg:', err.message);
}
