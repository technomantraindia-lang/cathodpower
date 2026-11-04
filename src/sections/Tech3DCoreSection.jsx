import { useState } from "react";
import TechCircuitCanvas from "../three/TechCircuitCanvas";
import "./Tech3DCoreSection.css";

const PILLARS = [
  {
    num: "01",
    spec: "99.9% MPPT Precision",
    title: "Dual MPPT Precision Tracking",
    desc: "Independent string optimization allows maximum power point tracking across split roof orientations and shaded panels, eliminating string mismatch losses.",
    badge: "Independent East-West Arrays",
  },
  {
    num: "02",
    spec: "< 48°C Junction Temp",
    title: "Patented Natural Thermal Dissipation",
    desc: "Unique die-cast aluminum heat-sink fins maintain sub-50°C junction temperatures without noisy external fans, doubling component operational life.",
    badge: "Zero Fan Failures • Natural Convection",
  },
  {
    num: "03",
    spec: "Ultra-Low 70V Start",
    title: "Wide DC Operating Voltage Window",
    desc: "Starts generating at just 70V–120V input, harvesting solar power 45 minutes earlier in the morning and continuing later into twilight.",
    badge: "+12% Daily Generation Window",
  },
  {
    num: "04",
    spec: "AFCI < 2.5ms Cutoff",
    title: "AI-Driven Cloud Safety & Arc Interruption",
    desc: "Intelligent DC arc-fault detection automatically halts hazardous micro-arcs in milliseconds while streaming telemetry directly to Solar View.",
    badge: "Active Fire Prevention Standard",
  },
];

export default function Tech3DCoreSection() {
  const [activePillar, setActivePillar] = useState(0);

  const current = PILLARS[activePillar] || PILLARS[0];

  return (
    <section className="t3d-section" id="technology">
      <div className="t3d-container">
        <div className="t3d-header">
          <span className="t3d-eyebrow">Proprietary Engineering</span>
          <h2 className="t3d-title">
            Inside the <span>Intelligent Power Core</span>
          </h2>
          <p className="t3d-desc">
            Explore the advanced power electronics and thermal architectures that
            make Cathode Power inverters some of the most reliable and efficient in
            the market.
          </p>
        </div>

        <div className="t3d-grid">
          {/* Left: 4 Interactive Pillars */}
          <div className="t3d-tabs">
            {PILLARS.map((p, idx) => (
              <div
                key={idx}
                className={`t3d-tab ${activePillar === idx ? "is-active" : ""}`}
                onClick={() => setActivePillar(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActivePillar(idx);
                }}
              >
                <div className="t3d-tab-top">
                  <span className="t3d-tab-num">PILLAR {p.num}</span>
                  <span className="t3d-tab-spec">{p.spec}</span>
                </div>
                <h3 className="t3d-tab-title">{p.title}</h3>
                {activePillar === idx && (
                  <p className="t3d-tab-body">{p.desc}</p>
                )}
              </div>
            ))}
          </div>

          {/* Right: 3D Circuit Canvas Stage */}
          <div className="t3d-stage">
            <div className="t3d-stage-overlay">
              <span className="t3d-stage-tag">3D Interactive Blueprint</span>
              <div className="t3d-stage-title">{current.title}</div>
            </div>

            <TechCircuitCanvas activePillar={activePillar} />

            <div className="t3d-stage-badge">
              <span className="t3d-stage-badge-dot" />
              <span>{current.badge}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
