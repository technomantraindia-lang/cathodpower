const { execSync } = require('child_process');
for (let i = 0; i <= 9; i++) {
  execSync(`ffmpeg -ss 00:00:0${i} -i "public/video/video banner.mp4" -vframes 1 -q:v 2 "scripts/frame_banner_${i}.jpg" -y`);
}
console.log('Extracted frames 0-9');
