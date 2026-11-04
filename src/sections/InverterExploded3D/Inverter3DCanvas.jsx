import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { buildInverter3DModel } from "./Inverter3DBuilder";

const Inverter3DCanvas = forwardRef(function Inverter3DCanvas(
  { explode = 0, isAutoRotate = false },
  ref
) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  const animFrameRef = useRef(null);
  const isInteractingRef = useRef(false);

  const explodeRef = useRef(explode);
  explodeRef.current = explode;

  const isAutoRotateRef = useRef(isAutoRotate);
  isAutoRotateRef.current = isAutoRotate;

  // Expose resetCamera to parent
  useImperativeHandle(ref, () => ({
    resetCamera() {
      if (!cameraRef.current || !controlsRef.current) return;
      cameraRef.current.position.set(5.2, 2.4, 7.2);
      controlsRef.current.target.set(0, -0.2, 0);
      controlsRef.current.update();
    },
  }));

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(5.2, 2.4, 7.2);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    // Warm Key Light (top right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(8, 10, 8);
    scene.add(keyLight);

    // Rim Light (cool subtle cyan on edges)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    rimLight.position.set(-8, 5, -6);
    scene.add(rimLight);

    // Front soft fill
    const fillLight = new THREE.DirectionalLight(0xfffbeb, 1.4);
    fillLight.position.set(0, 2, 8);
    scene.add(fillLight);

    // Overhead Daylight
    const topLight = new THREE.DirectionalLight(0xffffff, 1.2);
    topLight.position.set(0, 12, 0);
    scene.add(topLight);

    // Soft Floor Shadow Disc
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext("2d");
    const sGrad = sCtx.createRadialGradient(128, 128, 20, 128, 128, 120);
    sGrad.addColorStop(0, "rgba(0, 0, 0, 0.5)");
    sGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.2)");
    sGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -2.6;
    scene.add(shadowMesh);

    // 5. Build High-Precision 3D Inverter Model
    const model = buildInverter3DModel();
    modelRef.current = model;
    scene.add(model.rootGroup);

    // 6. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 3.5;
    controls.maxDistance = 14;
    controls.maxPolarAngle = Math.PI / 2 + 0.15;
    controls.target.set(0, -0.2, 0);
    controlsRef.current = controls;

    controls.addEventListener("start", () => {
      isInteractingRef.current = true;
    });
    controls.addEventListener("end", () => {
      isInteractingRef.current = false;
    });

    // 7. Render & Animation Loop
    let currentExplodeVal = 0;
    let isVisible = true;

    const animate = () => {
      if (!isVisible) return;
      animFrameRef.current = requestAnimationFrame(animate);

      // Smoothly interpolate explode value
      const targetExplode = explodeRef.current;
      currentExplodeVal += (targetExplode - currentExplodeVal) * 0.1;
      model.updateExplode(currentExplodeVal);

      // Auto-rotation when not interacting
      if (isAutoRotateRef.current && !isInteractingRef.current) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.2;
      } else {
        controls.autoRotate = false;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(container);

    animate();

    // 8. Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      visibilityObserver.disconnect();
      cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      if (controlsRef.current) controlsRef.current.dispose();
      if (modelRef.current) modelRef.current.dispose();
      shadowTex.dispose();
      shadowMat.dispose();
      shadowGeo.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        cursor: "grab",
      }}
    />
  );
});

export default Inverter3DCanvas;
