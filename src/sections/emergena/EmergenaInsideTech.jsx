import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./EmergenaInsideTech.css";

gsap.registerPlugin(ScrollTrigger);

const HOTSPOTS = [
  {
    id: "mppt",
    x: 28,
    y: 38,
    title: "Model-Specific MPPT Layout",
    text: "Published Cathode families use different tracker counts, voltage windows and current limits. Match each roof group and string to the exact model datasheet.",
    links: [
      { label: "Tracker count data", href: "/products?tab=ongrid" },
      { label: "Input voltage windows", href: "/downloads" },
    ],
  },
  {
    id: "display",
    x: 70,
    y: 59,
    title: "Local Display & Status",
    text: "Confirm on-device indicators, fault codes and commissioning menus for the selected model before site handover.",
    links: [
      { label: "User manuals", href: "/downloads" },
      { label: "View products", href: "/products" },
    ],
  },
  {
    id: "comms",
    x: 78,
    y: 72,
    title: "Monitoring & Comms Ports",
    text: "Verify Wi-Fi / RS485 / smart-meter interfaces and which values are exposed in the Cathode monitoring app for that SKU.",
    links: [
      { label: "Monitoring options", href: "/monitoring" },
      { label: "Check datasheets", href: "/downloads" },
    ],
  },
  {
    id: "protection",
    x: 40,
    y: 78,
    title: "Protection & Grid Interface",
    text: "Review published protection functions and DISCOM grid settings for the exact inverter, they vary by power class and phase.",
    links: [
      { label: "Grid requirements", href: "/downloads" },
      { label: "Get a quote", href: "/contact" },
    ],
  },
];

export default function EmergenaInsideTech() {
  const sectionRef = useRef(null);
  const [activeId, setActiveId] = useState(HOTSPOTS[0].id);
  const active = HOTSPOTS.find((h) => h.id === activeId) ?? HOTSPOTS[0];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cp-inside__eyebrow, .cp-inside__title, .cp-inside__subtitle, .cp-inside__visual, .cp-inside__panel",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cp-inside"
      id="inside-technology"
      aria-label="Designed for India technology"
    >
      <div className="cp-inside__container">
        <header className="cp-inside__header">
          <p className="cp-inside__eyebrow">Explore</p>
          <h2 className="cp-inside__title text-xl">
            Solar Inverters Which Are{" "}
            <span>Designed for India</span>, Not Adapted to India
          </h2>
          <p className="cp-inside__subtitle">
            Use the hotspots to see which model-specific fields should be verified
            in the current datasheet and quote.
          </p>
        </header>

        <div className="cp-inside__grid">
          <div className="cp-inside__visual">
            <span className="cp-inside__circle" aria-hidden="true" />
            <div className="cp-inside__stage">
              <img
                src="/images/products/4.4kW to 6kW Single Phase.webp"
                alt="Cathode Power 6 kW single phase on-grid inverter"
                className="cp-inside__image"
                loading="lazy"
                decoding="async"
              />
              {HOTSPOTS.map((spot) => (
                <button
                  key={spot.id}
                  type="button"
                  className={`cp-inside__hotspot${activeId === spot.id ? " is-active" : ""}`}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  onClick={() => setActiveId(spot.id)}
                  aria-pressed={activeId === spot.id}
                  aria-label={spot.title}
                >
                  <span className="cp-inside__hotspot-pulse" aria-hidden="true" />
                  <span className="cp-inside__hotspot-icon" aria-hidden="true">
                    +
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="cp-inside__panel" key={active.id}>
            <div className="cp-inside__panel-head">
              <span className="cp-inside__panel-icon" aria-hidden="true">
                +
              </span>
              <h3 className="cp-inside__panel-title">{active.title}</h3>
            </div>
            <p className="cp-inside__panel-text">{active.text}</p>
            <div className="cp-inside__panel-actions">
              {active.links.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="button-wrap cp-inside__btn w-inline-block"
                >
                  <div className="primary-text-wrap">
                    <div className="text-xs">{link.label}</div>
                  </div>
                  <div className="bg-primary-btn" />
                </Link>
              ))}
            </div>
            <Link to="/downloads" className="cp-inside__check text-xs">
              Check common datasheet fields →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
