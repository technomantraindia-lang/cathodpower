const fs = require('fs');

function getMp4Dimensions(filePath) {
  const buf = Buffer.alloc(100000);
  const fd = fs.openSync(filePath, 'r');
  fs.readSync(fd, buf, 0, 100000, 0);
  fs.closeSync(fd);

  // Search for 'tkhd' box
  const tkhdIdx = buf.indexOf('tkhd');
  if (tkhdIdx !== -1) {
    const version = buf[tkhdIdx + 4];
    const widthOffset = version === 1 ? tkhdIdx + 88 : tkhdIdx + 76;
    const width = buf.readUInt32BE(widthOffset) >> 16;
    const height = buf.readUInt32BE(widthOffset + 4) >> 16;
    return { width, height };
  }
  return null;
}

const files = [
  'public/video/video banner.mp4',
  'public/images/factoryimages/INVERTER.mp4',
  'public/images/factoryimages/Website.mp4',
  'public/images/factoryimages/DJI_0737.mp4',
  'src/assets/videos/hero.mp4',
  'src/assets/videos/DJI_0740.mp4'
];

for (const f of files) {
  try {
    if (fs.existsSync(f)) {
      console.log(f, getMp4Dimensions(f), 'size:', fs.statSync(f).size);
    }
  } catch (e) {
    console.log(f, 'error:', e.message);
  }
}
