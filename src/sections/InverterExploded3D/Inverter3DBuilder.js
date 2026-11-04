import * as THREE from "three";
import frontFaceTextureUrl from "../../assets/images/products/18kW - 25kW Three Phase.png";
import { createLcdScreenTexture, createPcbTexture } from "./inverterTextures";

/**
 * Creates a 2D rounded rectangle shape with smooth corner radius.
 */
function createRoundedRectShape(w, h, r) {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

/**
 * Creates a keyhole slot shape for wall-mount brackets.
 */
function createKeyholeMesh() {
  const group = new THREE.Group();
  const slotMat = new THREE.MeshBasicMaterial({ color: 0x111827 });
  // Circle on top
  const circle = new THREE.Mesh(new THREE.CircleGeometry(0.045, 16), slotMat);
  circle.position.y = 0.08;
  group.add(circle);
  // Slot on bottom
  const slot = new THREE.Mesh(new THREE.PlaneGeometry(0.045, 0.1), slotMat);
  slot.position.y = 0.02;
  group.add(slot);
  return group;
}

/**
 * High-Precision 3D Model Builder for Cathode Power CP-4000L Solar Inverter.
 * Matches the exact proportions, smooth corner radii, official graphics, and internal architecture.
 */
export function buildInverter3DModel() {
  const rootGroup = new THREE.Group();
  rootGroup.name = "InverterAccurateModel";

  // Texture Loader for official product graphic
  const textureLoader = new THREE.TextureLoader();
  const frontTexture = textureLoader.load(frontFaceTextureUrl);
  frontTexture.colorSpace = THREE.SRGBColorSpace;
  frontTexture.anisotropy = 16;
  frontTexture.generateMipmaps = true;

  const lcdTexture = createLcdScreenTexture(4000, 21, 77547);
  const pcbTexture = createPcbTexture();

  // Premium Materials matching authentic industrial finishes
  // 1. Ceramic Appliance White (Front & Edges)
  const whiteShellMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.04,
    roughness: 0.18,
    clearcoat: 0.95,
    clearcoatRoughness: 0.08,
  });

  // Front Face Material with Photorealistic Product Graphics
  const frontDecalMat = new THREE.MeshPhysicalMaterial({
    map: frontTexture,
    transparent: true,
    alphaTest: 0.02,
    metalness: 0.04,
    roughness: 0.16,
    clearcoat: 0.95,
    clearcoatRoughness: 0.08,
  });

  // 2. Anodized Die-Cast Aluminum (Rear Chassis)
  const rearChassisMat = new THREE.MeshStandardMaterial({
    color: 0x2b333d,
    metalness: 0.82,
    roughness: 0.38,
  });

  const aluminumFinsMat = new THREE.MeshStandardMaterial({
    color: 0xd6dde4,
    metalness: 0.9,
    roughness: 0.28,
  });

  // 3. Electronic Materials
  const pcbMat = new THREE.MeshStandardMaterial({
    map: pcbTexture,
    color: 0x059669,
    metalness: 0.25,
    roughness: 0.45,
  });

  const blackPlasticMat = new THREE.MeshStandardMaterial({
    color: 0x181a1f,
    roughness: 0.65,
  });

  const silverMetalMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.95,
    roughness: 0.15,
  });

  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    metalness: 0.85,
    roughness: 0.25,
  });

  const parts = [];

  // Dimensions of the real unit
  const WIDTH = 4.0;
  const HEIGHT = 3.81;
  const CORNER_RADIUS = 0.44;

  // ==========================================
  // LAYER 1: FRONT FASCIA SHELL (Rounded Beveled Plate)
  // ==========================================
  const frontCoverGroup = new THREE.Group();
  frontCoverGroup.name = "FrontCover";

  const frontShape = createRoundedRectShape(WIDTH, HEIGHT, CORNER_RADIUS);
  const frontExtrudeSettings = {
    depth: 0.26,
    bevelEnabled: true,
    bevelSegments: 12,
    steps: 1,
    bevelSize: 0.08,
    bevelThickness: 0.08,
  };
  const frontGeo = new THREE.ExtrudeGeometry(frontShape, frontExtrudeSettings);
  // Center geometry
  frontGeo.center();

  // Multi-material: front face gets official graphics, sides get white clearcoat
  const frontMesh = new THREE.Mesh(frontGeo, [frontDecalMat, whiteShellMat]);
  frontCoverGroup.add(frontMesh);

  rootGroup.add(frontCoverGroup);
  parts.push({
    id: "frontCover",
    name: "Front Enclosure Fascia",
    group: frontCoverGroup,
    assembledPos: new THREE.Vector3(0, 0, 0.62),
    explodedPos: new THREE.Vector3(-2.2, 0.4, 3.4),
  });

  // ==========================================
  // LAYER 2: DISPLAY SUB-MODULE
  // ==========================================
  const displayModuleGroup = new THREE.Group();
  displayModuleGroup.name = "DisplayModule";

  // Capsule bezel
  const bezelShape = createRoundedRectShape(1.68, 0.74, 0.35);
  const bezelGeo = new THREE.ExtrudeGeometry(bezelShape, {
    depth: 0.12,
    bevelEnabled: true,
    bevelSegments: 6,
    bevelSize: 0.02,
    bevelThickness: 0.02,
  });
  bezelGeo.center();
  const bezelMesh = new THREE.Mesh(bezelGeo, blackPlasticMat);
  displayModuleGroup.add(bezelMesh);

  // Backlit LCD Display
  const lcdGeo = new THREE.PlaneGeometry(1.36, 0.58);
  const lcdMat = new THREE.MeshBasicMaterial({ map: lcdTexture });
  const lcdMesh = new THREE.Mesh(lcdGeo, lcdMat);
  lcdMesh.position.z = 0.07;
  displayModuleGroup.add(lcdMesh);

  // Flexible ribbon cable
  const ribbonCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.37, 0),
    new THREE.Vector3(0.12, -0.75, -0.15),
    new THREE.Vector3(0.25, -1.05, -0.35),
  ]);
  const ribbonGeo = new THREE.TubeGeometry(ribbonCurve, 16, 0.04, 6, false);
  const ribbonMesh = new THREE.Mesh(ribbonGeo, whiteShellMat);
  displayModuleGroup.add(ribbonMesh);

  rootGroup.add(displayModuleGroup);
  parts.push({
    id: "displayModule",
    name: "Digital Telemetry LCD",
    group: displayModuleGroup,
    assembledPos: new THREE.Vector3(0.85, -0.68, 0.64),
    explodedPos: new THREE.Vector3(-1.3, -0.4, 2.2),
  });

  // ==========================================
  // LAYER 3: STRUCTURAL GASKET FLANGE
  // ==========================================
  const gasketFrameGroup = new THREE.Group();
  gasketFrameGroup.name = "GasketFrame";

  const frameShape = createRoundedRectShape(WIDTH - 0.1, HEIGHT - 0.1, CORNER_RADIUS - 0.04);
  const frameGeo = new THREE.ExtrudeGeometry(frameShape, {
    depth: 0.08,
    bevelEnabled: false,
  });
  frameGeo.center();
  const frameMesh = new THREE.Mesh(frameGeo, aluminumFinsMat);
  gasketFrameGroup.add(frameMesh);

  // Inner cutout to give hollow frame appearance
  const frameHollow = new THREE.Mesh(
    new THREE.BoxGeometry(WIDTH - 0.8, HEIGHT - 0.8, 0.1),
    rearChassisMat
  );
  gasketFrameGroup.add(frameHollow);

  rootGroup.add(gasketFrameGroup);
  parts.push({
    id: "gasketFrame",
    name: "IP66 Sealing Frame",
    group: gasketFrameGroup,
    assembledPos: new THREE.Vector3(0, 0, 0.42),
    explodedPos: new THREE.Vector3(-0.6, 0.2, 1.2),
  });

  // ==========================================
  // LAYER 4: MAIN DUAL MPPT CONTROL PCB
  // ==========================================
  const controlPcbGroup = new THREE.Group();
  controlPcbGroup.name = "ControlPcb";

  const pcbShape = createRoundedRectShape(WIDTH - 0.5, HEIGHT - 0.5, 0.2);
  const pcbGeo = new THREE.ExtrudeGeometry(pcbShape, { depth: 0.06, bevelEnabled: false });
  pcbGeo.center();
  const pcbBoard = new THREE.Mesh(pcbGeo, pcbMat);
  controlPcbGroup.add(pcbBoard);

  // Microcontrollers (DSP chips)
  const dspChip1 = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.08), blackPlasticMat);
  dspChip1.position.set(-0.6, 0.65, 0.07);
  controlPcbGroup.add(dspChip1);

  const dspChip2 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.06), blackPlasticMat);
  dspChip2.position.set(0.48, 0.72, 0.06);
  controlPcbGroup.add(dspChip2);

  // 6x High-Voltage DC Bus Capacitors
  const capCoords = [
    [-0.35, 0.08],
    [-0.05, 0.08],
    [0.25, 0.08],
    [-0.35, -0.42],
    [-0.05, -0.42],
    [0.25, -0.42],
  ];
  capCoords.forEach(([cx, cy]) => {
    const capBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.14, 0.42, 16),
      blackPlasticMat
    );
    capBody.rotation.x = Math.PI / 2;
    capBody.position.set(cx, cy, 0.21);
    controlPcbGroup.add(capBody);

    const capTop = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.14, 0.02, 16),
      silverMetalMat
    );
    capTop.rotation.x = Math.PI / 2;
    capTop.position.set(cx, cy, 0.425);
    controlPcbGroup.add(capTop);
  });

  // Copper Toroidal Inductors
  const choke1 = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.08, 12, 24), copperMat);
  choke1.position.set(-0.95, -0.15, 0.16);
  controlPcbGroup.add(choke1);

  const choke2 = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.07, 12, 24), copperMat);
  choke2.position.set(0.95, -0.15, 0.15);
  controlPcbGroup.add(choke2);

  rootGroup.add(controlPcbGroup);
  parts.push({
    id: "controlPcb",
    name: "Smart Control PCB",
    group: controlPcbGroup,
    assembledPos: new THREE.Vector3(0, 0, 0.18),
    explodedPos: new THREE.Vector3(0.0, 0.0, 0.0),
  });

  // ==========================================
  // LAYER 5: EXTENDED ALUMINUM HEATSINK
  // ==========================================
  const powerHeatsinkGroup = new THREE.Group();
  powerHeatsinkGroup.name = "PowerHeatsink";

  // Baseplate block
  const baseGeo = new THREE.BoxGeometry(WIDTH - 0.4, HEIGHT - 0.4, 0.32);
  const baseMesh = new THREE.Mesh(baseGeo, aluminumFinsMat);
  powerHeatsinkGroup.add(baseMesh);

  // 18 Finned cooling ribs
  const numFins = 18;
  const finWidth = 0.04;
  const finDepth = 0.52;
  const finHeight = HEIGHT - 0.6;
  const startX = -(WIDTH - 0.7) / 2;
  const finSpacing = (WIDTH - 0.7) / (numFins - 1);

  for (let i = 0; i < numFins; i++) {
    const finMesh = new THREE.Mesh(
      new THREE.BoxGeometry(finWidth, finHeight, finDepth),
      aluminumFinsMat
    );
    finMesh.position.set(startX + i * finSpacing, 0, finDepth / 2 + 0.16);
    powerHeatsinkGroup.add(finMesh);
  }

  // Clamped power transistors
  for (let r = 0; r < 4; r++) {
    const igbt = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.28, 0.08), blackPlasticMat);
    igbt.position.set(-0.7 + r * 0.45, 0.9, -0.2);
    powerHeatsinkGroup.add(igbt);
  }

  rootGroup.add(powerHeatsinkGroup);
  parts.push({
    id: "powerHeatsink",
    name: "Patented Heatsink",
    group: powerHeatsinkGroup,
    assembledPos: new THREE.Vector3(0, 0, -0.28),
    explodedPos: new THREE.Vector3(1.1, 0.15, -1.3),
  });

  // ==========================================
  // LAYER 6: REAR CHASSIS WITH SIDE KEYHOLE MOUNTING BRACKETS
  // ==========================================
  const rearChassisGroup = new THREE.Group();
  rearChassisGroup.name = "RearChassis";

  const rearShape = createRoundedRectShape(WIDTH - 0.12, HEIGHT - 0.12, CORNER_RADIUS - 0.04);
  const rearGeo = new THREE.ExtrudeGeometry(rearShape, {
    depth: 0.55,
    bevelEnabled: true,
    bevelSegments: 8,
    bevelSize: 0.06,
    bevelThickness: 0.06,
  });
  rearGeo.center();
  const rearMesh = new THREE.Mesh(rearGeo, rearChassisMat);
  rearChassisGroup.add(rearMesh);

  // Authentic side wall-mounting brackets with keyhole slots
  for (let side = -1; side <= 1; side += 2) {
    const bracket = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 1.4, 0.4),
      rearChassisMat
    );
    bracket.position.set(side * (WIDTH / 2 + 0.05), 0.2, 0);
    rearChassisGroup.add(bracket);

    const keyhole = createKeyholeMesh();
    keyhole.rotation.y = side === 1 ? Math.PI / 2 : -Math.PI / 2;
    keyhole.position.set(side * (WIDTH / 2 + 0.115), 0.45, 0);
    rearChassisGroup.add(keyhole);
  }

  rootGroup.add(rearChassisGroup);
  parts.push({
    id: "rearChassis",
    name: "Rear Chassis & Wall Mount",
    group: rearChassisGroup,
    assembledPos: new THREE.Vector3(0, 0, -0.65),
    explodedPos: new THREE.Vector3(2.2, 0.0, -2.6),
  });

  // ==========================================
  // LAYER 7: BOTTOM TERMINALS & GLANDS
  // ==========================================
  const bottomIOPlateGroup = new THREE.Group();
  bottomIOPlateGroup.name = "BottomIOPlate";

  // Base mounting plate
  const baseplateMesh = new THREE.Mesh(
    new THREE.BoxGeometry(WIDTH - 0.6, 0.14, 1.05),
    rearChassisMat
  );
  bottomIOPlateGroup.add(baseplateMesh);

  // Left: 2x MC4 Connectors
  [-1.15, -0.85].forEach((mx) => {
    const mc4 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.09, 0.58, 16),
      blackPlasticMat
    );
    mc4.position.set(mx, -0.34, 0.12);
    bottomIOPlateGroup.add(mc4);
  });

  // Mid-Left: DC Rotary Isolator Switch
  const dcSwitch = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.28, 18),
    blackPlasticMat
  );
  dcSwitch.position.set(-0.3, -0.22, 0.08);
  bottomIOPlateGroup.add(dcSwitch);

  // Center: Wi-Fi Communication Stick Port
  const wifiGland = new THREE.Mesh(
    new THREE.CylinderGeometry(0.26, 0.26, 0.42, 24),
    blackPlasticMat
  );
  wifiGland.position.set(0.32, -0.28, 0.0);
  bottomIOPlateGroup.add(wifiGland);

  // Right: AC Grid Output Threaded Cable Gland
  const acGland = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, 0.44, 20),
    blackPlasticMat
  );
  acGland.position.set(1.05, -0.3, -0.08);
  bottomIOPlateGroup.add(acGland);

  rootGroup.add(bottomIOPlateGroup);
  parts.push({
    id: "bottomGlands",
    name: "I/O Gland Array",
    group: bottomIOPlateGroup,
    assembledPos: new THREE.Vector3(0, -2.02, 0.0),
    explodedPos: new THREE.Vector3(0.5, -3.2, 0.8),
  });

  // Alignment Guide Rods in Exploded Mode
  const rodsGroup = new THREE.Group();
  const rodCorners = [
    [-1.6, 1.6],
    [1.6, 1.6],
    [-1.6, -1.6],
    [1.6, -1.6],
  ];
  const rodMat = new THREE.LineDashedMaterial({
    color: 0x38bdf8,
    dashSize: 0.15,
    gapSize: 0.1,
    transparent: true,
    opacity: 0.4,
  });

  rodCorners.forEach(([rx, ry]) => {
    const points = [
      new THREE.Vector3(rx - 1.1, ry + 0.15, 3.2),
      new THREE.Vector3(rx + 1.1, ry, -2.4),
    ];
    const rodLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      rodMat
    );
    rodLine.computeLineDistances();
    rodsGroup.add(rodLine);
  });
  rodsGroup.visible = false;
  rootGroup.add(rodsGroup);

  // Initialize all parts to assembled state
  parts.forEach((p) => {
    p.group.position.copy(p.assembledPos);
  });

  function updateExplode(progress) {
    const t = Math.max(0, Math.min(1, progress));
    parts.forEach((p) => {
      p.group.position.lerpVectors(p.assembledPos, p.explodedPos, t);
    });
    rodsGroup.visible = t > 0.15;
    rodMat.opacity = Math.min(0.5, (t - 0.15) * 0.8);
  }

  function dispose() {
    frontTexture.dispose();
    lcdTexture.dispose();
    pcbTexture.dispose();
    rootGroup.traverse((child) => {
      if (child.isMesh || child.isLine) {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      }
    });
  }

  return {
    rootGroup,
    parts,
    updateExplode,
    dispose,
  };
}
