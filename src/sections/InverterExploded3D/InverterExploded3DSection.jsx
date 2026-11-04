import { useState, useRef } from "react";
import Inverter3DCanvas from "./Inverter3DCanvas";
import "./InverterExploded3DSection.css";

export default function InverterExploded3DSection() {
  const [explode, setExplode] = useState(0); // Default to assembled unit
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const canvasRef = useRef(null);

  const handleReset = () => {
    setExplode(0);
    setIsAutoRotate(false);
    if (canvasRef.current) {
      canvasRef.current.resetCamera();
    }
  };

  return (
    <section className="inv3d-section" id="inverter-3d">
      <div className="inv3d-container">
        {/* Full-Width 3D Viewport Box */}
        <div className="inv3d-viewport">
          {/* Top Floating Controls */}
          <div className="inv3d-top-bar">
            <div className="inv3d-top-group">
              <button
                type="button"
                className={`inv3d-pill-btn ${explode < 0.1 ? "is-active" : ""}`}
                onClick={() => setExplode(0)}
              >
                <span>🔘</span>
                <span>Assembled Unit</span>
              </button>

              <button
                type="button"
                className={`inv3d-pill-btn ${explode > 0.85 ? "is-active" : ""}`}
                onClick={() => setExplode(1.0)}
              >
                <span>💥</span>
                <span>Exploded View</span>
              </button>
            </div>

            <div className="inv3d-top-group">
              <button
                type="button"
                className={`inv3d-pill-btn ${isAutoRotate ? "is-active" : ""}`}
                onClick={() => setIsAutoRotate((v) => !v)}
              >
                <span>🔄</span>
                <span>{isAutoRotate ? "Pause Spin" : "Auto-Spin"}</span>
              </button>

              <button
                type="button"
                className="inv3d-pill-btn"
                onClick={handleReset}
                title="Reset Camera Angle"
              >
                <span>🎯</span>
                <span>Reset View</span>
              </button>
            </div>
          </div>

          {/* 3D WebGL Canvas */}
          <Inverter3DCanvas
            ref={canvasRef}
            explode={explode}
            isAutoRotate={isAutoRotate}
          />

          {/* Drag Hint (Desktop) */}
          <div className="inv3d-hint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 0 0 0 12h3" />
            </svg>
            <span>Drag to rotate 360° • Scroll to zoom</span>
          </div>

          {/* Floating Bottom Explode HUD */}
          <div className="inv3d-bottom-hud">
            <span className="inv3d-hud-label">Architecture</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explode}
              onChange={(e) => setExplode(parseFloat(e.target.value))}
              className="inv3d-hud-slider"
              aria-label="Explode inverter layers"
            />
            <span className="inv3d-hud-val">
              {Math.round(explode * 100)}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
