import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./InverterScrollExplosion.css";

gsap.registerPlugin(ScrollTrigger);

// 6 Clean, Non-Ghosted, Solid Step Renders
const STEP_PATHS = [
  "/images/inverter-sequence/steps/step_0.webp", // 0: Fully Assembled Unit
  "/images/inverter-sequence/steps/step_1.webp", // 1: Fasteners Release & Shell Detaches
  "/images/inverter-sequence/steps/step_2.webp", // 2: Fascia Shell Slides Outward
  "/images/inverter-sequence/steps/step_3.webp", // 3: OLED Display Core Disengages
  "/images/inverter-sequence/steps/step_4.webp", // 4: OLED Module Extracts Forward
  "/images/inverter-sequence/steps/step_5.webp", // 5: Full Exploded View (All 5 Modules)
];

const COMPONENT_DATA = [
  {
    id: 1,
    step: "01",
    title: "UV-Resistant Fascia Shell",
    sub: "IP66 Weatherproof Seal • Impact-Proof Alloy",
    activeSteps: [1, 2],
    side: "left",
  },
  {
    id: 2,
    step: "02",
    title: "OLED Telemetry Display Core",
    sub: "High-Contrast OLED Matrix • Touch Sync",
    activeSteps: [3, 4],
    side: "left",
  },
  {
    id: 3,
    step: "03",
    title: "Dual MPPT Intelligent Control PCB",
    sub: "98.4% Peak Yield DSP • Dual String Tracker",
    activeSteps: [4, 5],
    side: "right",
  },
  {
    id: 4,
    step: "04",
    title: "Extruded Aluminum Heatsink",
    sub: "Multi-Fin Convection • 100% Fanless Cooling",
    activeSteps: [5],
    side: "right",
  },
  {
    id: 5,
    step: "05",
    title: "Die-Cast Armor Chassis & I/O",
    sub: "NEMA 4X Mount • Industrial MC4 Glands",
    activeSteps: [5],
    side: "right",
  },
];

export default function InverterScrollExplosion() {
  const trackRef = useRef(null);
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const imagesRef = useRef([]);
  const currentStepRef = useRef(0);

  const [activeStep, setActiveStep] = useState(0);
  const [cycleProgress, setCycleProgress] = useState(0);
  const [isReassembling, setIsReassembling] = useState(false);

  // Draw discrete solid step on canvas - 100% crisp, zero double-exposure
  const drawStep = useCallback((stepIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[stepIdx];
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      currentStepRef.current = stepIdx;
    } else {
      // Fallback to nearest loaded step
      for (let i = 0; i < STEP_PATHS.length; i++) {
        const fallback = imagesRef.current[i];
        if (fallback && fallback.complete && fallback.naturalWidth > 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(fallback, 0, 0, canvas.width, canvas.height);
          break;
        }
      }
    }
  }, []);

  // Preload all 6 pristine WebP steps
  useEffect(() => {
    let isMounted = true;
    const images = [];

    STEP_PATHS.forEach((path, idx) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        if (!isMounted) return;
        if (currentStepRef.current === idx) {
          drawStep(idx);
        }
      };
      images.push(img);
    });
    imagesRef.current = images;

    // Initial draw
    drawStep(0);

    return () => {
      isMounted = false;
      images.forEach((img) => {
        img.onload = null;
      });
    };
  }, [drawStep]);

  // ScrollTrigger scrub with step-by-step explosion and re-assembly
  useEffect(() => {
    if (!trackRef.current) return;

    const st = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;

        // 0.0 -> 0.5: Explode out step-by-step (0 to 1)
        // 0.5 -> 1.0: Re-assemble back step-by-step (1 down to 0)
        let prog;
        const reassemble = p > 0.5;
        setIsReassembling(reassemble);

        if (p <= 0.5) {
          prog = p / 0.5;
        } else {
          prog = (1.0 - p) / 0.5;
        }
        prog = Math.max(0, Math.min(1, prog));
        setCycleProgress(prog);

        // Step mapping across 6 crisp stages
        let step;
        if (prog < 0.14) {
          step = 0; // Assembled unit
        } else if (prog < 0.32) {
          step = 1; // Fasteners pop open
        } else if (prog < 0.50) {
          step = 2; // Fascia shell separates
        } else if (prog < 0.68) {
          step = 3; // OLED display unseats
        } else if (prog < 0.85) {
          step = 4; // OLED display extracts forward
        } else {
          step = 5; // Full 3D exploded view
        }

        if (currentStepRef.current !== step) {
          currentStepRef.current = step;
          setActiveStep(step);
          drawStep(step);
        }

        // Smooth continuous 3D stage rotation and scale
        if (stageRef.current) {
          stageRef.current.style.setProperty("--exp-prog", prog);
        }
      },
    });

    // Interactive mouse parallax in 3D
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;

      if (stageRef.current) {
        stageRef.current.style.setProperty("--mouse-x", `${x * 3.5}deg`);
        stageRef.current.style.setProperty("--mouse-y", `${-y * 2}deg`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      st.kill();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [drawStep]);

  // Status label
  const getStepStatus = () => {
    const isDocking = isReassembling && activeStep > 0;

    switch (activeStep) {
      case 0:
        return {
          badge: isReassembling ? "SEALED" : "ASSEMBLED",
          title: "CP-4000L Sealed Solar Inverter",
        };
      case 1:
        return {
          badge: isDocking ? "DOCKING 01" : "STEP 01",
          title: "Fastener Release & Weatherproof Seal",
        };
      case 2:
        return {
          badge: isDocking ? "DOCKING 02" : "STEP 02",
          title: "UV-Resistant Aluminum Fascia Detachment",
        };
      case 3:
        return {
          badge: isDocking ? "DOCKING 03" : "STEP 03",
          title: "OLED Telemetry Display Core Extraction",
        };
      case 4:
        return {
          badge: isDocking ? "DOCKING 04" : "STEP 04",
          title: "Data Ribbon & Controller Interface Uncoupling",
        };
      case 5:
        return {
          badge: "EXPLODED (3D)",
          title: "Full 3D CAD Architecture • Dual MPPT PCB & Thermal Core",
        };
      default:
        return {
          badge: "EXPLODED",
          title: "Complete Modular Architecture",
        };
    }
  };

  const status = getStepStatus();

  return (
    <div ref={trackRef} className="inv-scroll-track" id="inverter-3d">
      <div className="inv-scroll-sticky">
        <div className="inv-layout-container">
          {/* 1. TOP HEADER: Clean Editorial Hierarchy */}
          <div className="inv-top-header">
            <div className="inv-tagline">
              <span className="inv-tag-dot" />
              <span>CATHODE POWER • ARCHITECTURE</span>
            </div>
            <h2 className="inv-main-heading">Inside The CP-4000L Core</h2>
          </div>

          {/* 2. MAIN 3D SHOWCASE ZONE: Flanking Columns + Centered 3D Model */}
          <div className="inv-showcase-zone">
            {/* Left Column: Front Enclosure & Interface */}
            <div className="inv-hud-column inv-hud-left">
              {COMPONENT_DATA.filter((c) => c.side === "left").map((comp) => {
                const isActive = comp.activeSteps.includes(activeStep);
                const isPassed = activeStep > Math.max(...comp.activeSteps);
                return (
                  <div
                    key={comp.id}
                    className={`inv-hud-card ${isActive ? "is-active" : ""} ${
                      isPassed ? "is-passed" : ""
                    } ${activeStep === 0 ? "is-idle" : ""}`}
                  >
                    <div className="inv-hud-card-header">
                      <span className="inv-hud-card-step">{comp.step}</span>
                      <span className="inv-hud-card-indicator" />
                    </div>
                    <h4 className="inv-hud-card-title">{comp.title}</h4>
                    <p className="inv-hud-card-sub">{comp.sub}</p>
                  </div>
                );
              })}
            </div>

            {/* Center: Interactive 3D Canvas Stage */}
            <div className="inv-stage-center">
              <div
                ref={stageRef}
                className="inv-3d-stage"
                style={{
                  "--mouse-x": "0deg",
                  "--mouse-y": "0deg",
                  "--exp-prog": 0,
                }}
              >
                {/* Contact Ground Shadow */}
                <div
                  className="inv-ground-shadow"
                  style={{
                    transform: `translateX(-50%) scaleX(${
                      1 + cycleProgress * 0.42
                    }) scaleY(${1 + cycleProgress * 0.12})`,
                    opacity: 0.65 - cycleProgress * 0.16,
                  }}
                />

                {/* Crystal-Clear 3D Canvas */}
                <canvas
                  ref={canvasRef}
                  width={1264}
                  height={848}
                  className="inv-canvas"
                />
              </div>
            </div>

            {/* Right Column: Electronics & Thermal Architecture */}
            <div className="inv-hud-column inv-hud-right">
              {COMPONENT_DATA.filter((c) => c.side === "right").map((comp) => {
                const isActive = comp.activeSteps.includes(activeStep);
                const isPassed = activeStep > Math.max(...comp.activeSteps);
                return (
                  <div
                    key={comp.id}
                    className={`inv-hud-card ${isActive ? "is-active" : ""} ${
                      isPassed ? "is-passed" : ""
                    } ${activeStep === 0 ? "is-idle" : ""}`}
                  >
                    <div className="inv-hud-card-header">
                      <span className="inv-hud-card-step">{comp.step}</span>
                      <span className="inv-hud-card-indicator" />
                    </div>
                    <h4 className="inv-hud-card-title">{comp.title}</h4>
                    <p className="inv-hud-card-sub">{comp.sub}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. BOTTOM BAR: Real-time Status & Scrub Timeline */}
          <div className="inv-bottom-bar">
            <div className="inv-status-label">
              <span className="inv-status-badge">{status.badge}</span>
              <span className="inv-status-sep">•</span>
              <span className="inv-status-title">{status.title}</span>
            </div>

            <div className="inv-timeline-container">
              <span className="inv-timeline-endpoint">ASSEMBLED</span>
              <div className="inv-timeline-track">
                <div
                  className="inv-timeline-fill"
                  style={{ width: `${cycleProgress * 100}%` }}
                />
                <div
                  className="inv-timeline-thumb"
                  style={{ left: `${cycleProgress * 100}%` }}
                />
              </div>
              <span className="inv-timeline-endpoint">EXPLODED (3D)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
