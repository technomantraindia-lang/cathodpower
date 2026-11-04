import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Clean & Premium Light-Theme 3D Solar Inverter Core Canvas
 * Features:
 * - Sleek anodized white/silver titanium chassis with subtle chamfer
 * - Radiant amber & solar orange photon energy rings
 * - Clean daylight studio lighting & ambient reflections
 * - Smooth mouse-parallax tracking
 * - 3 interactive modes: "ongrid", "hybrid", "grid"
 */
export default function Hero3DCanvas({ mode = "ongrid" }) {
  const mountRef = useRef(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 11);

    // Renderer with clean alpha
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Studio Lighting for Light Theme
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xff7700, 3.2);
    dirLight1.position.set(6, 6, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0284c7, 2.2);
    dirLight2.position.set(-6, -3, 5);
    scene.add(dirLight2);

    const topFill = new THREE.DirectionalLight(0xffffff, 1.8);
    topFill.position.set(0, 10, 2);
    scene.add(topFill);

    const pointLight = new THREE.PointLight(0xff7700, 3.5, 16);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Master Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Sleek Anodized White/Silver Inverter Chassis
    const boxGeometry = new THREE.BoxGeometry(3.2, 4.2, 1.2);
    const boxEdges = new THREE.EdgesGeometry(boxGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xff6600,
      linewidth: 2,
      transparent: true,
      opacity: 0.85,
    });
    const chassisWire = new THREE.LineSegments(boxEdges, lineMaterial);
    coreGroup.add(chassisWire);

    // Premium Ceramic White Body with High Clearcoat
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      metalness: 0.15,
      roughness: 0.25,
      transmission: 0.25,
      thickness: 1.0,
      transparent: true,
      opacity: 0.94,
      reflectivity: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const chassisBody = new THREE.Mesh(boxGeometry, coreMat);
    coreGroup.add(chassisBody);

    // Front high-tech glass display panel
    const screenGeo = new THREE.PlaneGeometry(2.1, 1.3);
    const screenMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
      side: THREE.DoubleSide,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.8, 0.61);
    coreGroup.add(screenMesh);

    // Cyan glowing HUD grid on screen
    const gridHelper = new THREE.GridHelper(1.9, 8, 0x00d2ff, 0x0284c7);
    gridHelper.rotation.x = Math.PI / 2;
    gridHelper.position.set(0, 0.8, 0.62);
    coreGroup.add(gridHelper);

    // 2. Dual Orbiting Solar Energy Flux Rings
    const ringGeo1 = new THREE.TorusGeometry(3.6, 0.045, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xff6600,
      emissive: 0xff5500,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.8,
    });
    const fluxRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    fluxRing1.rotation.x = Math.PI / 3;
    coreGroup.add(fluxRing1);

    const ringGeo2 = new THREE.TorusGeometry(4.2, 0.035, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0099ff,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.8,
    });
    const fluxRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    fluxRing2.rotation.x = -Math.PI / 3.5;
    fluxRing2.rotation.y = Math.PI / 6;
    coreGroup.add(fluxRing2);

    // 3. Glowing Solar Energy Particles
    const particleCount = 260;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorOrange = new THREE.Color(0xff6600);
    const colorCyan = new THREE.Color(0x0284c7);
    const colorEmerald = new THREE.Color(0x10b981);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.6 + Math.random() * 3.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      const chosenColor = Math.random() > 0.4 ? colorOrange : colorCyan;
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    const createCircleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,102,0,1)");
      grad.addColorStop(0.35, "rgba(255,150,50,0.8)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const particleMat = new THREE.PointsMaterial({
      size: 0.22,
      map: createCircleTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // 4. Power Terminals & MPPT Connectors
    const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xff6600,
      emissive: 0xff5500,
      emissiveIntensity: 1.2,
    });
    const nodes = [];
    const nodeCoords = [
      [-1.2, -1.8, 0.65],
      [-0.4, -1.8, 0.65],
      [0.4, -1.8, 0.65],
      [1.2, -1.8, 0.65],
      [-0.8, 1.8, 0.65],
      [0.8, 1.8, 0.65],
    ];

    nodeCoords.forEach(([x, y, z]) => {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(x, y, z);
      coreGroup.add(node);
      nodes.push(node);
    });

    // Mouse Tracking
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.45;
      targetRotX = -y * 0.35;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop with Visibility Optimization
    let animationFrameId;
    let clock = new THREE.Clock();
    let isVisible = true;

    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Damped mouse rotation
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      coreGroup.rotation.y = currentRotY + Math.sin(elapsedTime * 0.4) * 0.15;
      coreGroup.rotation.x = currentRotX + Math.cos(elapsedTime * 0.3) * 0.1;
      coreGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.12;

      // Rotate Flux Rings
      fluxRing1.rotation.z = elapsedTime * 0.6;
      fluxRing2.rotation.z = -elapsedTime * 0.5;

      // Rotate Particles
      particles.rotation.y = elapsedTime * 0.15;
      particles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

      // Pulse Central Light
      const pulse = Math.sin(elapsedTime * 3) * 0.5 + 0.5;
      pointLight.intensity = 2.5 + pulse * 1.8;

      // Dynamic Mode Tinting
      const currentMode = modeRef.current;
      if (currentMode === "hybrid") {
        lineMaterial.color.lerp(colorEmerald, 0.05);
        pointLight.color.lerp(colorEmerald, 0.05);
      } else if (currentMode === "grid") {
        lineMaterial.color.lerp(colorCyan, 0.05);
        pointLight.color.lerp(colorCyan, 0.05);
      } else {
        lineMaterial.color.lerp(colorOrange, 0.05);
        pointLight.color.lerp(colorOrange, 0.05);
      }

      nodes.forEach((node, idx) => {
        const s = 1 + Math.sin(elapsedTime * 4 + idx) * 0.25;
        node.scale.set(s, s, s);
      });

      renderer.render(scene, camera);
    };

    // Pause rendering when scrolled out of view to free 100% GPU for the rest of the page
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    animate();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      boxGeometry.dispose();
      boxEdges.dispose();
      lineMaterial.dispose();
      coreMat.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "440px",
        position: "relative",
        cursor: "grab",
      }}
      aria-label="Interactive 3D Solar Inverter Core model"
    />
  );
}
