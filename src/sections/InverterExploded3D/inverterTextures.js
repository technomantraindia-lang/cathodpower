import * as THREE from "three";

/**
 * Generates an ultra-crisp canvas texture for the front fascia of the Cathode Power inverter.
 * Matches the exact branding, typography, pill cutout border, and touch indicators from the reference photo.
 */
export function createFrontCoverTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext("2d");

  // Pure clean white background
  ctx.fillStyle = "#fcfdfd";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle outer chamfer shadow vignette
  const grad = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    canvas.width * 0.42,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width * 0.72
  );
  grad.addColorStop(0, "rgba(255, 255, 255, 0)");
  grad.addColorStop(1, "rgba(220, 226, 232, 0.45)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // --- 1. BRANDING (Top Left) ---
  const logoX = 240;
  const logoY = 220;

  // "CATHODE"
  ctx.save();
  ctx.font = "bold 92px 'Inter', sans-serif";
  ctx.letterSpacing = "6px";

  // 'C'
  ctx.fillStyle = "#0c8b82";
  ctx.fillText("C", logoX, logoY);

  // 'A' (orange accent)
  const cWidth = ctx.measureText("C").width;
  ctx.fillStyle = "#f59e0b";
  ctx.fillText("A", logoX + cWidth, logoY);

  // 'THODE'
  const caWidth = ctx.measureText("CA").width;
  ctx.fillStyle = "#0c8b82";
  ctx.fillText("THODE", logoX + caWidth, logoY);

  // Registered Trademark ®
  const fullCathodeWidth = ctx.measureText("CATHODE").width;
  ctx.font = "600 32px 'Inter', sans-serif";
  ctx.fillText("®", logoX + fullCathodeWidth + 10, logoY - 45);

  // "POWER"
  ctx.font = "300 78px 'Inter', sans-serif";
  ctx.letterSpacing = "14px";
  ctx.fillStyle = "#0f766e";
  ctx.fillText("POWER", logoX, logoY + 95);

  // Divider Line
  const powerWidth = ctx.measureText("POWER").width;
  const divX = logoX + powerWidth + 24;
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(divX, logoY + 28);
  ctx.lineTo(divX, logoY + 98);
  ctx.stroke();

  // Tagline: "SPREADING / GOODNESS / WITH TRUST"
  ctx.font = "600 20px 'Inter', sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillStyle = "#475569";
  ctx.fillText("SPREADING", divX + 22, logoY + 45);
  ctx.fillText("GOODNESS", divX + 22, logoY + 70);
  ctx.fillText("WITH TRUST", divX + 22, logoY + 95);
  ctx.restore();

  // --- 2. PILL CUTOUT & TOUCH / KNOCK LABELS (Bottom Right) ---
  // Pill dimensions on texture
  const pillW = 1080;
  const pillH = 380;
  const pillX = canvas.width - pillW - 120;
  const pillY = canvas.height - pillH - 460;
  const radius = pillH / 2;

  // Dark pill capsule background
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(pillX + radius, pillY);
  ctx.lineTo(pillX + pillW - 40, pillY);
  ctx.quadraticCurveTo(pillX + pillW, pillY, pillX + pillW, pillY + 40);
  ctx.lineTo(pillX + pillW, pillY + pillH - 40);
  ctx.quadraticCurveTo(pillX + pillW, pillY + pillH, pillX + pillW - 40, pillY + pillH);
  ctx.lineTo(pillX + radius, pillY + pillH);
  ctx.arc(pillX + radius, pillY + radius, radius, Math.PI / 2, (Math.PI * 3) / 2);
  ctx.closePath();

  ctx.fillStyle = "#090d12";
  ctx.fill();

  // Subtle gloss reflection on pill
  const pillGloss = ctx.createLinearGradient(pillX, pillY, pillX, pillY + pillH);
  pillGloss.addColorStop(0, "rgba(255, 255, 255, 0.12)");
  pillGloss.addColorStop(0.3, "rgba(255, 255, 255, 0.02)");
  pillGloss.addColorStop(1, "rgba(0, 0, 0, 0.5)");
  ctx.fillStyle = pillGloss;
  ctx.fill();

  // Subtle border
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();

  // --- Pill Controls: NORMAL (left) & ALARM (right) ---
  ctx.save();
  // NORMAL Play symbol
  const normalX = pillX + 115;
  const normalY = pillY + radius;

  // Play icon in rounded rect
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.strokeRect(normalX - 30, normalY - 45, 60, 56);
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(normalX - 8, normalY - 32);
  ctx.lineTo(normalX + 12, normalY - 17);
  ctx.lineTo(normalX - 8, normalY - 2);
  ctx.closePath();
  ctx.fill();

  // "NORMAL" text
  ctx.font = "bold 20px 'Inter', sans-serif";
  ctx.fillStyle = "#cbd5e1";
  ctx.textAlign = "center";
  ctx.fillText("NORMAL", normalX, normalY + 38);

  // ALARM Warning symbol
  const alarmX = pillX + pillW - 120;
  const alarmY = pillY + radius;

  // Exclamation in rounded rect
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.strokeRect(alarmX - 30, alarmY - 45, 60, 56);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 34px 'Inter', sans-serif";
  ctx.fillText("!", alarmX, alarmY - 8);

  // "ALARM" text
  ctx.font = "bold 20px 'Inter', sans-serif";
  ctx.fillStyle = "#cbd5e1";
  ctx.fillText("ALARM", alarmX, alarmY + 38);

  // "KNOCK HERE" Icon & Label (Top right above alarm)
  const knockX = pillX + pillW - 60;
  const knockY = pillY - 45;

  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  ctx.arc(knockX - 10, knockY - 35, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = "bold 18px 'Inter', sans-serif";
  ctx.letterSpacing = "1px";
  ctx.fillText("KNOCK HERE", knockX - 10, knockY);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.generateMipmaps = true;
  return texture;
}

/**
 * Generates the glowing digital LCD screen texture showing live telemetry.
 * Matches: DC 274V | POWER 4000W | ERROR 000 | AC 254V | DAILY 21kWh | TOTAL 77547kWh
 */
export function createLcdScreenTexture(powerW = 4000, dailyKwh = 21, totalKwh = 77547) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Deep backlit blue background
  ctx.fillStyle = "#031526";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Digital grid lines background pattern
  ctx.strokeStyle = "rgba(14, 116, 144, 0.15)";
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 16) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Soft backlit glow
  const glow = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    50,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width * 0.55
  );
  glow.addColorStop(0, "rgba(56, 189, 248, 0.18)");
  glow.addColorStop(1, "rgba(2, 6, 23, 0.6)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer LCD bevel border
  ctx.strokeStyle = "#082f49";
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

  // Cyan LCD color
  const cyan = "#38bdf8";
  const dimCyan = "#0284c7";

  // --- TOP STATUS BAR ICONS ---
  // 1. Solar PV Panel Array Icon (Left)
  ctx.save();
  ctx.strokeStyle = cyan;
  ctx.lineWidth = 3;
  ctx.fillStyle = "rgba(56, 189, 248, 0.2)";

  ctx.beginPath();
  ctx.moveTo(80, 130);
  ctx.lineTo(130, 70);
  ctx.lineTo(210, 70);
  ctx.lineTo(160, 130);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Grid segments on panel
  ctx.beginPath();
  ctx.moveTo(105, 100);
  ctx.lineTo(185, 100);
  ctx.moveTo(125, 70);
  ctx.lineTo(105, 130);
  ctx.moveTo(165, 70);
  ctx.lineTo(135, 130);
  ctx.stroke();

  // Energy Flow Chevrons (Panel -> Inverter)
  ctx.font = "bold 26px monospace";
  ctx.fillStyle = cyan;
  ctx.fillText(">>>>>>>>>>", 230, 110);

  // 2. Center Inverter Symbol Box
  ctx.strokeRect(510, 70, 90, 60);
  ctx.font = "bold 18px monospace";
  ctx.textAlign = "center";
  ctx.fillText("DC", 535, 96);
  ctx.fillText("AC", 575, 96);
  ctx.beginPath();
  ctx.moveTo(555, 75);
  ctx.lineTo(555, 125);
  ctx.moveTo(520, 104);
  ctx.lineTo(545, 104);
  ctx.moveTo(565, 104);
  ctx.lineTo(585, 104);
  ctx.stroke();

  // 3. Wi-Fi & ZED & Transmission Grid (Right)
  // Wi-Fi arcs
  ctx.beginPath();
  ctx.arc(670, 70, 10, -Math.PI * 0.75, -Math.PI * 0.25);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(670, 70, 18, -Math.PI * 0.75, -Math.PI * 0.25);
  ctx.stroke();
  ctx.fillStyle = cyan;
  ctx.beginPath();
  ctx.arc(670, 68, 3, 0, Math.PI * 2);
  ctx.fill();

  // ZED Label
  ctx.font = "bold 22px monospace";
  ctx.fillText("ZED", 750, 85);
  ctx.fillText(">>>>>>>>", 750, 110);

  // Indian Grid Transmission Tower Icon
  const towerX = 860;
  ctx.beginPath();
  ctx.moveTo(towerX, 60);
  ctx.lineTo(towerX - 25, 130);
  ctx.moveTo(towerX, 60);
  ctx.lineTo(towerX + 25, 130);
  ctx.moveTo(towerX - 35, 85);
  ctx.lineTo(towerX + 35, 85);
  ctx.moveTo(towerX - 40, 105);
  ctx.lineTo(towerX + 40, 105);
  ctx.moveTo(towerX - 20, 85);
  ctx.lineTo(towerX + 20, 105);
  ctx.moveTo(towerX + 20, 85);
  ctx.lineTo(towerX - 20, 105);
  ctx.stroke();
  ctx.restore();

  // --- LOWER METRIC CELLS ---
  const cellBorder = "#0e7490";
  ctx.strokeStyle = cellBorder;
  ctx.lineWidth = 2;

  // Left Column (DC, POWER, ERROR)
  const leftX = 60;
  const colW = 420;
  const rowH = 75;
  const startY = 180;

  // Row 1: DC Voltage
  ctx.strokeRect(leftX, startY, colW, rowH);
  ctx.strokeRect(leftX, startY, 120, rowH);
  ctx.font = "bold 28px monospace";
  ctx.fillStyle = cyan;
  ctx.fillText("DC", leftX + 35, startY + 48);
  ctx.font = "bold 44px 'Courier New', monospace";
  ctx.textAlign = "right";
  ctx.fillText("274", leftX + 360, startY + 54);
  ctx.font = "bold 22px monospace";
  ctx.fillText("V", leftX + colW - 20, startY + 54);

  // Row 2: Active Power
  ctx.strokeRect(leftX, startY + rowH, colW, rowH);
  ctx.strokeRect(leftX, startY + rowH, 120, rowH);
  ctx.textAlign = "left";
  ctx.font = "bold 24px monospace";
  ctx.fillText("POWER", leftX + 18, startY + rowH + 48);
  ctx.textAlign = "right";
  ctx.font = "bold 44px 'Courier New', monospace";
  ctx.fillText(String(powerW), leftX + 360, startY + rowH + 54);
  ctx.font = "bold 22px monospace";
  ctx.fillText("W", leftX + colW - 20, startY + rowH + 54);

  // Row 3: Error Code
  ctx.strokeRect(leftX, startY + rowH * 2, colW, rowH);
  ctx.strokeRect(leftX, startY + rowH * 2, 120, rowH);
  ctx.textAlign = "left";
  ctx.font = "bold 24px monospace";
  ctx.fillText("ERROR", leftX + 18, startY + rowH * 2 + 48);
  ctx.textAlign = "right";
  ctx.font = "bold 44px 'Courier New', monospace";
  ctx.fillText("000", leftX + 360, startY + rowH * 2 + 54);

  // Right Column (AC, DAILY, TOTAL)
  const rightX = 540;

  // Row 1: AC Voltage
  ctx.strokeRect(rightX, startY, colW, rowH);
  ctx.strokeRect(rightX, startY, 120, rowH);
  ctx.textAlign = "left";
  ctx.font = "bold 28px monospace";
  ctx.fillText("AC", rightX + 35, startY + 48);
  ctx.textAlign = "right";
  ctx.font = "bold 44px 'Courier New', monospace";
  ctx.fillText("254", rightX + 360, startY + 54);
  ctx.font = "bold 22px monospace";
  ctx.fillText("V", rightX + colW - 20, startY + 54);

  // Row 2: Daily Yield
  ctx.strokeRect(rightX, startY + rowH, colW, rowH);
  ctx.strokeRect(rightX, startY + rowH, 120, rowH);
  ctx.textAlign = "left";
  ctx.font = "bold 24px monospace";
  ctx.fillText("DAILY", rightX + 18, startY + rowH + 48);
  ctx.textAlign = "right";
  ctx.font = "bold 44px 'Courier New', monospace";
  ctx.fillText(String(dailyKwh), rightX + 340, startY + rowH + 54);
  ctx.font = "bold 20px monospace";
  ctx.fillText("kWh", rightX + colW - 15, startY + rowH + 54);

  // Row 3: Total Cumulative Yield
  ctx.strokeRect(rightX, startY + rowH * 2, colW, rowH);
  ctx.strokeRect(rightX, startY + rowH * 2, 120, rowH);
  ctx.textAlign = "left";
  ctx.font = "bold 24px monospace";
  ctx.fillText("TOTAL", rightX + 18, startY + rowH * 2 + 48);
  ctx.textAlign = "right";
  ctx.font = "bold 38px 'Courier New', monospace";
  ctx.fillText(String(totalKwh), rightX + 340, startY + rowH * 2 + 54);
  ctx.font = "bold 20px monospace";
  ctx.fillText("kWh", rightX + colW - 15, startY + rowH * 2 + 54);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

/**
 * Generates an industrial PCB motherboard texture with gold contacts,
 * IC traces, and micro-component silk screen markings.
 */
export function createPcbTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  // High-grade emerald green FR-4 solder mask
  ctx.fillStyle = "#064e3b";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Fine copper trace tracks
  ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 40; i++) {
    const y = 80 + i * 22;
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(260 + (i % 4) * 40, y);
    ctx.lineTo(340 + (i % 4) * 40, y + 25);
    ctx.lineTo(800, y + 25);
    ctx.stroke();
  }

  // Golden circular via pads
  ctx.fillStyle = "#fbbf24";
  for (let x = 60; x < canvas.width - 60; x += 45) {
    for (let y = 60; y < canvas.height - 60; y += 45) {
      if ((x + y) % 90 === 0) {
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // White silkscreen designator text (e.g. C12, R45, U3, D14)
  ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
  ctx.font = "bold 14px monospace";
  const markings = [
    "CATHODE-DSP-V3",
    "DUAL-MPPT-STAGE",
    "U1:STM32-ARM",
    "Q1-Q8:SiC-MOSFET",
    "C1-C6:450V-1000uF",
    "IP66-ISOLATED",
    "GND_REV2",
    "TX/RX-RS485",
  ];
  markings.forEach((txt, idx) => {
    ctx.fillText(txt, 80 + (idx % 2) * 400, 150 + idx * 80);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}
