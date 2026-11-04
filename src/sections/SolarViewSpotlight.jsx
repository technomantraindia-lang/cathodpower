import { useState } from "react";
import { Link } from "react-router-dom";
import "./SolarViewSpotlight.css";

import phoneMockup from "../assets/images/solar-phone.png";

export default function SolarViewSpotlight() {
  const [simulationMode, setSimulationMode] = useState("day");

  const isDay = simulationMode === "day";

  return (
    <section className="svs-section" id="monitoring">
      <div className="svs-container">
        <div className="svs-header">
          <span className="svs-eyebrow">Smart Energy Management</span>
          <h2 className="svs-title">
            Total Visibility with <span>Solar View &amp; Cloud</span>
          </h2>
          <p className="svs-desc">
            Monitor, manage, and optimize your entire solar ecosystem 24/7 from
            any device. Track real-time solar generation, home loads, battery
            charge cycles, and grid interactions with millisecond precision.
          </p>
        </div>

        <div className="svs-grid">
          {/* Left: Interactive Energy Flow Simulation */}
          <div className="svs-sim-card">
            <div className="svs-sim-top">
              <h3 className="svs-sim-title">Live Telemetry Simulation</h3>
              <div className="svs-sim-toggle">
                <button
                  type="button"
                  className={`svs-toggle-btn ${isDay ? "is-active" : ""}`}
                  onClick={() => setSimulationMode("day")}
                >
                  ☀️ Day (Solar Yield)
                </button>
                <button
                  type="button"
                  className={`svs-toggle-btn ${!isDay ? "is-active is-night" : ""}`}
                  onClick={() => setSimulationMode("night")}
                >
                  🌙 Night (Battery Eco)
                </button>
              </div>
            </div>

            <div className="svs-flow-grid">
              {/* Node 1: Solar Panels */}
              <div className={`svs-node ${isDay ? "is-active-flow" : ""}`}>
                <div className="svs-node-header">
                  <span className="svs-node-name">Solar Arrays</span>
                  <span className="svs-node-icon">☀️</span>
                </div>
                <div className="svs-node-metric">
                  {isDay ? "8.65" : "0.00"}
                  <span className="svs-node-unit">kW</span>
                </div>
                <div className="svs-node-status">
                  {isDay ? "● Peak Solar Harvest" : "○ Idle (Standby)"}
                </div>
              </div>

              {/* Node 2: Inverter Core */}
              <div className="svs-node is-active-flow">
                <div className="svs-node-header">
                  <span className="svs-node-name">Cathode Inverter</span>
                  <span className="svs-node-icon">⚡</span>
                </div>
                <div className="svs-node-metric">
                  {isDay ? "98.6" : "97.8"}
                  <span className="svs-node-unit">% Eff</span>
                </div>
                <div className="svs-node-status">
                  {isDay ? "● Active Dual MPPT" : "● Smart Inversion Active"}
                </div>
              </div>

              {/* Node 3: Home & Plant Load */}
              <div className="svs-node">
                <div className="svs-node-header">
                  <span className="svs-node-name">Facility Load</span>
                  <span className="svs-node-icon">🏢</span>
                </div>
                <div className="svs-node-metric">
                  {isDay ? "3.20" : "2.40"}
                  <span className="svs-node-unit">kW</span>
                </div>
                <div className="svs-node-status">● 100% Clean Powered</div>
              </div>

              {/* Node 4: Battery Storage / Grid */}
              <div
                className={`svs-node ${
                  isDay ? "is-active-storage" : "is-active-grid"
                }`}
              >
                <div className="svs-node-header">
                  <span className="svs-node-name">
                    {isDay ? "Battery Storage" : "Battery Discharge"}
                  </span>
                  <span className="svs-node-icon">🔋</span>
                </div>
                <div className="svs-node-metric">
                  {isDay ? "+4.25" : "-2.40"}
                  <span className="svs-node-unit">kW</span>
                </div>
                <div className="svs-node-status">
                  {isDay ? "● Rapid Charging (94%)" : "● Supplying Load (82%)"}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Mobile App Showcase */}
          <div className="svs-app-card">
            <div className="svs-app-media">
              <img
                src={phoneMockup}
                alt="Solar View Mobile Application"
                className="svs-app-img"
                loading="lazy"
              />
            </div>

            <div className="svs-app-info">
              <h3>Control from Anywhere, Anytime</h3>
              <p>
                Solar View connects with Cathode Power hardware via high-speed
                Wi-Fi, 4G, or RS485 Ethernet, delivering real-time diagnostics,
                yield statistics, and instant fault warnings directly to your
                smartphone.
              </p>

              <div className="svs-app-features">
                <div className="svs-app-feat">
                  <span className="svs-app-feat-dot" />
                  <span>Sub-second refresh rates</span>
                </div>
                <div className="svs-app-feat">
                  <span className="svs-app-feat-dot" />
                  <span>Remote firmware OTA updates</span>
                </div>
                <div className="svs-app-feat">
                  <span className="svs-app-feat-dot" />
                  <span>Dynamic tariff peak shaving</span>
                </div>
                <div className="svs-app-feat">
                  <span className="svs-app-feat-dot" />
                  <span>Multi-plant fleet monitoring</span>
                </div>
              </div>

              <Link to="/monitoring" className="svs-cta-link">
                <span>Explore Monitoring Platform</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
