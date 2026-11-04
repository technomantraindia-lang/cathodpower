import { useState, useRef } from "react";
import "./SmartTestingSection.css";

import t1 from "../assets/testing/1.webp";
import t2 from "../assets/testing/2.webp";
import t3 from "../assets/testing/3.webp";
import t4 from "../assets/testing/4.webp";
import t5 from "../assets/testing/5.webp";
import t6 from "../assets/testing/6.webp";
import t7 from "../assets/testing/7.webp";
import t8 from "../assets/testing/8.webp";

const TESTS = [
  {
    step: "01",
    short: "Assembly Check",
    title: "Meticulous Assembly Verification",
    desc: "Every inverter undergoing final assembly is inspected with laser alignment and automated torque monitoring to eliminate micro-vibrations and loose terminal connections.",
    img: t1,
    standard: "ISO 9001 Protocol",
    highlight: "100% Torque & Alignment Pass",
  },
  {
    step: "02",
    short: "Impulse Winding",
    title: "High-Voltage Impulse Winding Test",
    desc: "Applies high-frequency, high-voltage pulses directly across internal winding systems to detect subtle interlayer insulation defects long before field deployment.",
    img: t2,
    standard: "IEC 60076 Compliance",
    highlight: "Zero Breakdown Tolerance",
  },
  {
    step: "03",
    short: "Thermal Ageing",
    title: "Extreme Environmental Ageing Test",
    desc: "Simulates 10+ years of extreme thermal stress cycles under alternating temperatures from -25°C to +65°C to guarantee long-term semiconductor stability.",
    img: t3,
    standard: "Accelerated Stress Testing",
    highlight: "Simulated 10-Year Lifecycle",
  },
  {
    step: "04",
    short: "Heat Run Test",
    title: "Full-Load Continuous Heat Run Test",
    desc: "Monitors real-time thermal dispersion across transformers and power MOSFETs under maximum 100% continuous electrical load to ensure junction temperatures remain safe.",
    img: t4,
    standard: "Thermal Imaging Verification",
    highlight: "Sub-50°C Junction Operation",
  },
  {
    step: "05",
    short: "IV Curve Scan",
    title: "Precision IV Curve & MPPT Tracking",
    desc: "Scans voltage-current curves across multi-channel solar inputs to measure MPPT response speeds and verify dynamic solar harvest efficiency under variable irradiance.",
    img: t5,
    standard: "EN 50530 Standard",
    highlight: "> 99.9% MPPT Dynamic Accuracy",
  },
  {
    step: "06",
    short: "Efficiency Test",
    title: "Full Power DC-to-AC Efficiency Test",
    desc: "Calibrates harmonic distortion, power factor range, and DC-to-AC conversion curves across all power thresholds to verify certified 98.8% peak efficiency.",
    img: t6,
    standard: "IEC 61683 Verification",
    highlight: "98.8% Peak Output Confirmed",
  },
  {
    step: "07",
    short: "HV Insulation",
    title: "High-Voltage Dielectric Insulation Test",
    desc: "Subjected to 3000V+ AC dielectric withstand tests to ensure absolute operator galvanic safety and complete protection against lightning or utility transients.",
    img: t7,
    standard: "IEC 62109-1 / IEC 62109-2",
    highlight: "3.5kV Dielectric Isolation",
  },
  {
    step: "08",
    short: "Inductor Function",
    title: "Magnetic Inductor Functionality Test",
    desc: "Verifies high-frequency magnetic permeability, core losses, and saturation margins to ensure quiet operation and smooth power quality even at peak summer heat.",
    img: t8,
    standard: "Ultra-Low Harmonic THDi < 3%",
    highlight: "Pure Sine Wave Integrity",
  },
];

export default function SmartTestingSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mediaRef = useRef(null);

  const activeTest = TESTS[activeIndex] || TESTS[0];

  const handleMouseMove = (e) => {
    const el = mediaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const el = mediaRef.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <section className="st-section" id="quality">
      <div className="st-container">
        <div className="st-header">
          <span className="st-eyebrow">Zero-Defect Quality Assurance</span>
          <h2 className="st-heading">
            8-Stage <span>Smart Manufacturing &amp; Testing</span>
          </h2>
          <p className="st-desc">
            Every Cathode Power inverter leaves our facility only after passing
            rigorous multi-stage stress tests, ensuring decades of reliable clean
            energy generation.
          </p>
        </div>

        {/* Step Tabs Strip */}
        <div className="st-nav" role="tablist">
          {TESTS.map((item, idx) => (
            <button
              key={item.step}
              type="button"
              role="tab"
              aria-selected={activeIndex === idx}
              className={`st-nav-btn ${activeIndex === idx ? "is-active" : ""}`}
              onClick={() => setActiveIndex(idx)}
            >
              <span className="st-nav-btn-idx">{item.step}</span>
              <span>{item.short}</span>
            </button>
          ))}
        </div>

        {/* Interactive Active Stage */}
        <div className="st-stage">
          {/* Left: 3D-tilting photo */}
          <div
            ref={mediaRef}
            className="st-media"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={activeTest.img}
              alt={activeTest.title}
              className="st-img"
              loading="lazy"
            />
            <div className="st-media-badge">STAGE {activeTest.step} / 08</div>
          </div>

          {/* Right: Details and Highlights */}
          <div className="st-details">
            <span className="st-step-number">{activeTest.step}</span>
            <h3 className="st-title">{activeTest.title}</h3>
            <p className="st-body">{activeTest.desc}</p>

            <div className="st-badge-row">
              <div className="st-spec-pill">
                <span className="st-spec-pill-dot" />
                <span>{activeTest.standard}</span>
              </div>
              <div className="st-spec-pill">
                <span className="st-spec-pill-dot" />
                <span>{activeTest.highlight}</span>
              </div>
            </div>

            <div className="st-progress-wrap">
              <div
                className="st-progress-bar"
                style={{
                  width: `${((activeIndex + 1) / TESTS.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}