import { useState } from "react";
import { Link } from "react-router-dom";
import Hero3DCanvas from "../three/Hero3DCanvas";
import "./Hero3DSection.css";

export default function Hero3DSection({ onOpenQuote }) {
  const [activeMode, setActiveMode] = useState("ongrid");

  const modeData = {
    ongrid: {
      hudTopLabel: "Peak Efficiency",
      hudTopVal: "98.8%",
      hudBottomLabel: "Dual MPPT Architecture",
      hudBottomVal: "Active Balancing",
      colorClass: "is-active",
    },
    hybrid: {
      hudTopLabel: "Storage Routing",
      hudTopVal: "< 10ms UPS",
      hudBottomLabel: "Battery Voltage Match",
      hudBottomVal: "48V - 500V Wide Range",
      colorClass: "is-active is-hybrid",
    },
    grid: {
      hudTopLabel: "Grid Stabilization",
      hudTopVal: "0.80 - 1.00 PF",
      hudBottomLabel: "Ingress Protection",
      hudBottomVal: "IP66 Sealed",
      colorClass: "is-active is-grid",
    },
  };

  const currentModeInfo = modeData[activeMode] || modeData.ongrid;

  return (
    <section className="h3d-hero">
      <div className="h3d-container">
        <div className="h3d-grid">
          {/* Left: Headline, Value Proposition, Action CTAs */}
          <div className="h3d-copy">
            <div className="h3d-badge">
              <span className="h3d-badge-pulse" />
              <span>Next-Gen Solar Inverters • Made in India</span>
            </div>

            <h1 className="h3d-title">
              Powering India&apos;s Clean Energy Future with{" "}
              <span className="h3d-title-gradient">Intelligent Inverters</span>
            </h1>

            <p className="h3d-subtitle">
              Engineered for maximum harvest with up to 98.8% peak efficiency,
              intelligent dual-MPPT precision tracking, and rugged IP66
              weatherproof resilience. Delivering uninterrupted clean energy
              from residential rooftops to mega commercial industrial plants.
            </p>

            <div className="h3d-actions">
              <Link to="/products" className="h3d-btn-primary">
                <span>Explore Inverters</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>

              <button
                type="button"
                onClick={onOpenQuote}
                className="h3d-btn-secondary"
              >
                <span>Get a Fast Quote</span>
              </button>
            </div>

            <div className="h3d-highlights">
              <div className="h3d-pill">
                <span className="h3d-pill-check">✓</span>
                <span>MNRE &amp; BIS Certified</span>
              </div>
              <div className="h3d-pill">
                <span className="h3d-pill-check">✓</span>
                <span>500+ Nationwide Partners</span>
              </div>
              <div className="h3d-pill">
                <span className="h3d-pill-check">✓</span>
                <span>10–12 Year Operating Life</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive 3D Inverter Core & HUD */}
          <div className="h3d-stage">
            <div className="h3d-drag-hint">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <span>Move cursor to rotate 3D core</span>
            </div>

            {/* Top Right HUD card */}
            <div className="h3d-hud h3d-hud--top-right">
              <div className="h3d-hud-label">{currentModeInfo.hudTopLabel}</div>
              <div className="h3d-hud-value h3d-hud-value--highlight">
                {currentModeInfo.hudTopVal}
              </div>
            </div>

            {/* Bottom Left HUD card */}
            <div className="h3d-hud h3d-hud--bottom-left">
              <div className="h3d-hud-label">
                {currentModeInfo.hudBottomLabel}
              </div>
              <div className="h3d-hud-value h3d-hud-value--cyan">
                {currentModeInfo.hudBottomVal}
              </div>
            </div>

            {/* 3D Canvas Container */}
            <div className="h3d-canvas-wrap">
              <Hero3DCanvas mode={activeMode} />
            </div>

            {/* Interactive Mode Controls */}
            <div className="h3d-modes">
              <button
                type="button"
                className={`h3d-mode-btn ${
                  activeMode === "ongrid" ? currentModeInfo.colorClass : ""
                }`}
                onClick={() => setActiveMode("ongrid")}
              >
                ⚡ On-Grid Mode
              </button>

              <button
                type="button"
                className={`h3d-mode-btn ${
                  activeMode === "hybrid" ? currentModeInfo.colorClass : ""
                }`}
                onClick={() => setActiveMode("hybrid")}
              >
                🔋 Hybrid Storage
              </button>

              <button
                type="button"
                className={`h3d-mode-btn ${
                  activeMode === "grid" ? currentModeInfo.colorClass : ""
                }`}
                onClick={() => setActiveMode("grid")}
              >
                🌐 Grid Stabilization
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
