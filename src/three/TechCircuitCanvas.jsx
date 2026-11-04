import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Clean & Premium Light-Theme Circuit & Architecture Canvas
 * Renders ceramic white PCB micro-architecture, polished gold busbars,
 * high-permeability copper toroids, and energy flow particles.
 */
export default function TechCircuitCanvas({ activePillar = 0 }) {
  const mountRef = useRef(null);
  const pillarRef = useRef(activePillar);
  pillarRef.current = activePillar;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 4, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff7700, 3.5, 20);
    pointLight.position.set(0, 4, 2);
    scene.add(pointLight);

    const cyanLight = new THREE.PointLight(0x0284c7, 2.5, 20);
    cyanLight.position.set(-3, -2, 2);
    scene.add(cyanLight);

    const topFill = new THREE.DirectionalLight(0xffffff, 1.6);
    topFill.position.set(0, 8, 4);
    scene.add(topFill);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Ceramic White Motherboard PCB
    const pcbGeo = new THREE.BoxGeometry(6.4, 0.2, 5.0);
    const pcbMat = new THREE.MeshPhysicalMaterial({
      color: 0xf1f5f9,
      metalness: 0.1,
      roughness: 0.35,
      clearcoat: 0.8,
    });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    pcb.position.y = -0.1;
    group.add(pcb);

    // Subtle blueprint line edges
    const gridEdges = new THREE.EdgesGeometry(pcbGeo);
    const gridMat = new THREE.LineBasicMaterial({
      color: 0xcfd8dc,
      transparent: true,
      opacity: 0.8,
    });
    const grid = new THREE.LineSegments(gridEdges, gridMat);
    grid.position.y = -0.1;
    group.add(grid);

    // 2. Dual MPPT Inductor Coils (Polished Copper & Ferrite)
    const coilGeo = new THREE.TorusGeometry(0.7, 0.25, 16, 50);
    const coilMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x92400e,
      emissiveIntensity: 0.2,
    });

    const coil1 = new THREE.Mesh(coilGeo, coilMat);
    coil1.rotation.x = Math.PI / 2;
    coil1.position.set(-1.6, 0.35, -0.8);
    group.add(coil1);

    const coil2 = new THREE.Mesh(coilGeo, coilMat);
    coil2.rotation.x = Math.PI / 2;
    coil2.position.set(-1.6, 0.35, 1.0);
    group.add(coil2);

    // 3. Central Power Transformer Block (Brushed Titanium)
    const transGeo = new THREE.BoxGeometry(1.6, 1.2, 1.6);
    const transMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.85,
      roughness: 0.2,
    });
    const transformer = new THREE.Mesh(transGeo, transMat);
    transformer.position.set(1.0, 0.6, 0);
    group.add(transformer);

    // Glowing transformer core ring
    const coreRingGeo = new THREE.TorusGeometry(1.0, 0.05, 16, 60);
    const coreRingMat = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      wireframe: true,
    });
    const coreRing = new THREE.Mesh(coreRingGeo, coreRingMat);
    coreRing.position.set(1.0, 0.6, 0);
    group.add(coreRing);

    // 4. Solid Electrolytic Capacitors
    const capGeo = new THREE.CylinderGeometry(0.32, 0.32, 1.0, 24);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.8,
      roughness: 0.2,
    });
    const caps = [];
    const capPositions = [
      [-0.2, 0.5, -1.5],
      [-0.2, 0.5, -0.6],
      [-0.2, 0.5, 0.4],
      [-0.2, 0.5, 1.3],
    ];

    capPositions.forEach(([x, y, z]) => {
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(x, y, z);
      group.add(cap);
      caps.push(cap);
    });

    // 5. Pulsing Current Particles along Traces
    const lineParticleCount = 120;
    const linePositions = new Float32Array(lineParticleCount * 3);

    for (let i = 0; i < lineParticleCount; i++) {
      const t = i / lineParticleCount;
      linePositions[i * 3] = -2.5 + t * 5.0;
      linePositions[i * 3 + 1] = 0.2 + Math.sin(t * 10) * 0.15;
      linePositions[i * 3 + 2] = Math.cos(t * 8) * 1.5;
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );

    const lineMat = new THREE.PointsMaterial({
      size: 0.2,
      color: 0xff7700,
      transparent: true,
      opacity: 0.9,
    });
    const lineParticles = new THREE.Points(lineGeo, lineMat);
    group.add(lineParticles);

    // Mouse Tracking
    let targetX = 0;
    let targetY = 0;
    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.3;
      targetY = y * 0.2;
    };
    window.addEventListener("mousemove", handleMove);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      group.rotation.y = THREE.MathUtils.lerp(
        group.rotation.y,
        targetX + elapsed * 0.12,
        0.05
      );
      group.rotation.x = THREE.MathUtils.lerp(
        group.rotation.x,
        0.5 + targetY,
        0.05
      );

      coreRing.rotation.y = elapsed * 1.2;
      coreRing.rotation.z = elapsed * 0.8;

      const coilPulse = Math.sin(elapsed * 4) * 0.15 + 0.85;
      coil1.scale.set(coilPulse, coilPulse, coilPulse);
      coil2.scale.set(coilPulse, coilPulse, coilPulse);

      // Color updates for pillars
      const pIdx = pillarRef.current;
      if (pIdx === 0) {
        lineMat.color.setHex(0xff7700);
        pointLight.color.setHex(0xff7700);
      } else if (pIdx === 1) {
        lineMat.color.setHex(0x0284c7);
        pointLight.color.setHex(0x0284c7);
      } else if (pIdx === 2) {
        lineMat.color.setHex(0x10b981);
        pointLight.color.setHex(0x10b981);
      } else {
        lineMat.color.setHex(0x9333ea);
        pointLight.color.setHex(0x9333ea);
      }

      const pos = lineGeo.attributes.position.array;
      for (let i = 0; i < lineParticleCount; i++) {
        let x = pos[i * 3];
        x += 0.04;
        if (x > 2.8) x = -2.8;
        pos[i * 3] = x;
      }
      lineGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animId);
          animId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    animate();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", handleResize);

      pcbGeo.dispose();
      pcbMat.dispose();
      gridEdges.dispose();
      gridMat.dispose();
      coilGeo.dispose();
      coilMat.dispose();
      transGeo.dispose();
      transMat.dispose();
      coreRingGeo.dispose();
      coreRingMat.dispose();
      capGeo.dispose();
      capMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
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
        minHeight: "400px",
        position: "relative",
        cursor: "grab",
      }}
      aria-label="3D Inverter Internal Architecture Circuit Simulation"
    />
  );
}
