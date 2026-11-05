import { Link } from "react-router-dom";
import "./HomeProductsSection.css";

import ongridImg from "../assets/images/products/showcase-ongrid.webp";
import hybridImg from "../assets/images/products/showcase-hybrid-three.webp";
import microImg from "../assets/images/products/showcase-micro.webp";
import storageImg from "../assets/images/products/showcase-storage-rack.webp";

const PRODUCT_SERIES = [
  {
    key: "ongrid",
    badge: "Grid-Tied",
    range: "2.3 kW - 110 kW",
    name: "On-Grid Solar Inverters",
    subtitle:
      "Engineered for maximum solar harvest with single-phase residential & three-phase C&I architectures.",
    img: ongridImg,
    alt: "Cathode Power On-Grid Inverter",
    link: "/products?tab=ongrid",
    features: [
      "Up to 98.8% peak efficiency with ultra-low startup voltage",
      "Multiple independent MPPTs with high DC/AC sizing ratio",
      "IP66 rated cast-aluminum casing for extreme industrial weather",
      "Integrated DC switch & Type II surge arresters",
    ],
  },
  {
    key: "hybrid",
    badge: "Storage Ready",
    range: "3 kW - 15 kW",
    name: "Hybrid Storage Inverters",
    subtitle:
      "All-in-one solar generation and smart battery energy storage with UPS-grade uninterruptible power.",
    img: hybridImg,
    alt: "Cathode Power Hybrid Inverter",
    link: "/products?tab=hybrid",
    features: [
      "Sub-10ms seamless UPS-level automatic power changeover",
      "Compatible with advanced LiFePO4 battery storage banks",
      "Dynamic peak shaving & multi-period programmable charge schedules",
      "Parallel stacking support for expanded enterprise backup",
    ],
  },
  {
    key: "micro",
    badge: "Module Level",
    range: "600 W - 2.4 kW",
    name: "Micro Inverters",
    subtitle:
      "Module-level power electronics for residential balconies, complex roofs, and maximum safety.",
    img: microImg,
    alt: "Cathode Power Micro Inverter",
    link: "/products?tab=micro",
    features: [
      "Independent panel-level MPPT harvest eliminates string mismatch",
      "Safe touchable DC voltage (<60V) eliminates fire hazard risks",
      "Dual & Quad MPPT configurations with built-in Wi-Fi monitoring",
      "Compact plug-and-play installation for space-constrained sites",
    ],
  },
  {
    key: "storage",
    badge: "LiFePO4 Storage",
    range: "5.12 kWh - 10.24 kWh",
    name: "Energy Storage Systems",
    subtitle:
      "High-cycle lithium iron phosphate battery systems in modular rack and sleek wall-mount form factors.",
    img: storageImg,
    alt: "Cathode Power Energy Storage Battery",
    link: "/products?tab=storage",
    features: [
      "Grade-A LiFePO4 cells with 6,000+ life cycles at 80% DoD",
      "Integrated Smart BMS with multi-level thermal & overcurrent safety",
      "Seamless plug-and-play communication with Cathode hybrid inverters",
      "Modular scalability for expandable residential & business backup",
    ],
  },
];

export default function HomeProductsSection({ onOpenQuote }) {
  return (
    <section className="hp-section" id="products">
      <div className="hp-container">
        <div className="hp-header">
          <div className="hp-header-left">
            <span className="hp-eyebrow">Product Ecosystem</span>
            <h2 className="hp-title">
              Complete Clean Energy Inverter Solutions
            </h2>
            <p className="hp-desc">
              Discover our comprehensive lineup of on-grid, hybrid energy storage,
              and micro-inverters built for residential homes, commercial complexes,
              and heavy industrial manufacturing.
            </p>
          </div>

          <Link to="/products" className="hp-all-link">
            <span>View All Models</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="hp-grid">
          {PRODUCT_SERIES.map((item) => (
            <article key={item.key} className="hp-card">
              <div className="hp-card-top">
                <span className="hp-card-badge">{item.badge}</span>
                <span className="hp-card-range">{item.range}</span>
              </div>

              <div className="hp-card-img-wrap">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="hp-card-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <h3 className="hp-card-name">{item.name}</h3>
              <p className="hp-card-subtitle">{item.subtitle}</p>

              <ul className="hp-card-features">
                {item.features.map((feat, fIdx) => (
                  <li key={fIdx} className="hp-card-feature">
                    <span className="hp-card-feature-icon">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="hp-card-actions">
                <Link to={item.link} className="hp-card-btn-view">
                  <span>Explore Specs</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>

                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="hp-card-btn-quote"
                >
                  Get Quote
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
