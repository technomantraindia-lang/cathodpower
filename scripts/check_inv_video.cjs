const { execSync } = require('child_process');
const times = [2, 10, 20, 30, 40, 50, 60, 70, 80, 90];
times.forEach((t, i) => {
  try {
    execSync(`ffmpeg -ss ${t} -i "public/images/factoryimages/INVERTER.mp4" -vframes 1 -q:v 2 "scripts/inv_f_${i}.jpg" -y`);
  } catch (e) {
    console.error(`Error at ${t}:`, e.message);
  }
});
console.log('Dumped frames');
