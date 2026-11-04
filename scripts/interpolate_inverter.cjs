const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/images/inverter-sequence/perfect_keyframes');

// Create concat file with transitions
// Each keyframe transition can be generated via xfade or morphing
async function run() {
  const kfs = [0, 1, 2, 3, 4, 5].map(i => path.join(dir, `kf_${i}.jpg`));
  
  // Let's create smooth transitions between each pair:
  // kf_0 -> kf_1, kf_1 -> kf_2, kf_2 -> kf_3, kf_3 -> kf_4, kf_4 -> kf_5
  // We can use xfade filter in ffmpeg for seamless crossfading, or minterpolate
  // Total duration: 5 segments of 0.8s each = 4 seconds total
  // At 24fps = 96 frames
  
  console.log('Building smooth xfade / optical filter in ffmpeg...');
  
  // Using xfade transitions
  // transition=fade, duration=0.4s per transition
  const filter = [
    `[0:v][1:v]xfade=transition=fade:duration=0.5:offset=0.5[v01]`,
    `[v01][2:v]xfade=transition=fade:duration=0.5:offset=1.5[v02]`,
    `[v02][3:v]xfade=transition=fade:duration=0.5:offset=2.5[v03]`,
    `[v03][4:v]xfade=transition=fade:duration=0.5:offset=3.5[v04]`,
    `[v04][5:v]xfade=transition=fade:duration=0.5:offset=4.5[vout]`
  ].join(';');
  
  const inputs = kfs.map(f => `-loop 1 -t 1.5 -i "${f.replace(/\\/g, '/')}"`).join(' ');
  const outMp4 = path.join(dir, 'smooth_explode.mp4').replace(/\\/g, '/');
  
  const cmd = `ffmpeg -y ${inputs} -filter_complex "${filter}" -map "[vout]" -c:v libx264 -pix_fmt yuv420p "${outMp4}"`;
  
  console.log('Running cmd...');
  execSync(cmd, { stdio: 'inherit' });
  console.log('Created smooth_explode.mp4 successfully!');
  
  // Now let's extract 30 clean progressive webp frames
  const framesDir = path.join(__dirname, '../public/images/inverter-sequence/frames_smooth');
  if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });
  
  const extractCmd = `ffmpeg -y -i "${outMp4}" -vf "fps=10" -q:v 2 "${path.join(framesDir, 'frame_%02d.webp').replace(/\\/g, '/')}"`;
  execSync(extractCmd, { stdio: 'inherit' });
  console.log('Extracted frames successfully!');
}

run().catch(console.error);
