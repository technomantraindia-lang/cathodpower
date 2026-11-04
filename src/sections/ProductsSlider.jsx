// src/sections/ProductsSlider.jsx

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { PRODUCTS } from "../data/productsData";

import "./ProductsSlider.css";

const toKwNumber = (power) => {
  if (!power) return null;
  const v = parseFloat(String(power).replace(/[^\d.]/g, ""));
  return Number.isFinite(v) ? v : null;
};

const formatPowerRange = (values) => {
  const nums = values.map(toKwNumber).filter((v) => typeof v === "number");
  if (!nums.length) return null;
  const min = Math.min(...nums);
  const max = Math.max(...nums);

  // Display format matches design: small numbers keep one decimal if needed
  const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
  return { min: fmt(min), max: fmt(max) };
};

const getRangesForTab = (mainTabKey) => {
  const items = PRODUCTS.filter((p) => p.mainTabKey === mainTabKey);

  if (mainTabKey === "micro") {
    const wValues = items.map((p) => p.specs?.find((s) => s.label === "Rated Power")?.value ?? p.meta?.split("|")[0]);
    // micro values are in W / kW; keep the existing string if missing
    return { display: "300 W – 1.2 kW", lines: [] };
  }

  const single = items
    .filter((p) => p.phaseKey === "single")
    .map((p) => p.specs?.find((s) => s.label === "Rated Power")?.value ?? p.meta?.split("|")[0]);
  const three = items
    .filter((p) => p.phaseKey === "three")
    .map((p) => p.specs?.find((s) => s.label === "Rated Power")?.value ?? p.meta?.split("|")[0]);

  const singleRange = formatPowerRange(single);
  const threeRange = formatPowerRange(three);

  const lines = [
    singleRange ? { label: "Single Phase", ...singleRange } : null,
    threeRange ? { label: "Three Phase", ...threeRange } : null,
  ].filter(Boolean);

  // Fallback to previous combined text if something is missing
  if (!lines.length) return { lines: [] };

  return { lines };
};

// Pull one representative product per category from live PRODUCTS data
const getRepProduct = (mainTabKey) =>
  PRODUCTS.find((p) => p.mainTabKey === mainTabKey);

const ongrid  = getRepProduct("ongrid");
const hybrid  = getRepProduct("hybrid");
const micro   = getRepProduct("micro");

const TABS = [
  {
    key: "ongrid",
    label: "Ongrid Inverter",
    image: ongrid?.image,
    description:
      "High-efficiency grid-tied solar inverter built for residential and commercial installations with seamless grid synchronisation and maximum energy yield.",
    powerRange: getRangesForTab("ongrid"),
    bullets: [
      "Single & Three Phase variants available",
      "Wide MPPT input voltage range for maximum yield",
      "IP66 rated for reliable outdoor installation",
      "Smart monitoring via Cathode cloud platform",
    ],
  },
  {
    key: "hybrid",
    label: "Hybrid Inverter",
    image: hybrid?.image,
    description:
      "All-in-one hybrid inverter with integrated battery management for energy independence, backup power and intelligent load control.",
    powerRange: getRangesForTab("hybrid"),
    bullets: [
      "On-grid, Off-grid & Battery backup in one unit",
      "Programmable supply priority for PV, Battery & Grid",
      "Single & Three Phase models available",
      "Cathode cloud remote monitoring included",
    ],
  },
  {
    key: "micro",
    label: "Micro Inverter",
    image: micro?.image,
    description:
      "Module-level power electronics for maximum energy harvest per panel — ideal for complex rooftop layouts, partial shading and space-constrained systems.",
    powerRange: getRangesForTab("micro"),
    bullets: [
      "Per-module MPPT for maximum individual panel yield",
      "Ideal for shaded or complex roof installations",
      "Plug & play installation, no high-voltage DC wiring",
      "Enhanced system safety with low DC voltage",
    ],
  },
];

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#ff7b00" />
    <path d="M7 12.5l3.5 3.5 6.5-7" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Matches `/products` URL contract in `Products.jsx` (tab + optional phase). */
const getProductsPageHref = (mainTabKey) => {
  const p = new URLSearchParams();
  p.set("tab", mainTabKey);
  if (mainTabKey !== "micro") {
    p.set("phase", "single");
  }
  return `/products?${p.toString()}`;
};

export default function ProductsSlider() {
  const sectionRef = useRef(null);
  const didMountRef = useRef(false);
  const [activeKey, setActiveKey] = useState(TABS[0].key);
  const active = TABS.find((t) => t.key === activeKey);
  const productsHref = getProductsPageHref(activeKey);
  const [isNearView, setIsNearView] = useState(false);
  const [animateImage, setAnimateImage] = useState(false);

  const tabImages = useMemo(
    () => TABS.map((t) => t.image).filter(Boolean),
    []
  );

  // If user reloads while already at/near this section, avoid the "late flip"
  // that can cause a perceived stall before the main image starts loading.
  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight + 900) {
      setIsNearView(true);
    }
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsNearView(true);
          obs.disconnect();
        }
      },
      { root: null, threshold: 0, rootMargin: "800px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isNearView) return;

    // Warm the cache + decode early, but do it in idle time so scrolling never blocks.
    const run = () => {
      for (const src of tabImages) {
        const img = new Image();
        img.decoding = "async";
        img.fetchPriority = "low";
        img.src = src;
        img.decode?.().catch(() => {});
      }
    };

    const ric = window.requestIdleCallback;
    if (typeof ric === "function") {
      const id = ric(run, { timeout: 1200 });
      return () => window.cancelIdleCallback?.(id);
    }

    const t = window.setTimeout(run, 250);
    return () => window.clearTimeout(t);
  }, [isNearView, tabImages]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    // Keep the premium fade-in only for tab switches (not initial paint on scroll).
    setAnimateImage(true);
    const t = window.setTimeout(() => setAnimateImage(false), 520);
    return () => window.clearTimeout(t);
  }, [activeKey]);

  return (
    <section ref={sectionRef} className="pf-section" id="products-slider">
      <div className="pf-container">
        {/* ── Header ── */}
        <div className="pf-header">
          <p className="pf-eyebrow">Our Product Range</p>
          <h2 className="pf-title">Types Of Solar Inverters We Offer</h2>
          <p className="pf-subtitle">Engineered for every rooftop — grid-tied, hybrid storage, and micro-inverter systems built for Indian conditions.</p>

          <nav className="pf-tabs" aria-label="Product categories">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`pf-tab${activeKey === tab.key ? " pf-tab--active" : ""}`}
                onClick={() => setActiveKey(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* ── Featured Product ── */}
        <div className="pf-body">
          <div className="pf-img-wrap" data-label={active?.label}>
            {active?.image && (
              <img
                key={active.key}
                src={active.image}
                alt={active.label}
                className={`pf-img${animateImage ? " pf-img--animate" : ""}`}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            )}
          </div>

          <div className="pf-info">
            <h3 className="pf-product-type">{active?.label}</h3>
            <p className="pf-desc">{active?.description}</p>
            <p className="pf-power-label">Power Range</p>
            {active?.powerRange?.lines?.length ? (
              <div className="pf-power-rows" role="list">
                {active.powerRange.lines.map((line) => (
                  <div className="pf-power-row" role="listitem" key={line.label}>
                    <span className="pf-power-rowValue">
                      <strong>{line.min}</strong> kW to <strong>{line.max}</strong> kW
                    </span>
                    <span className="pf-power-pill">{line.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="pf-power">{active?.powerRange?.display ?? ""}</p>
            )}

            <ul className="pf-bullets">
              {active?.bullets.map((b) => (
                <li key={b} className="pf-bullet">
                  <CheckIcon />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="pf-cta-row">
              <Link to={productsHref} className="pf-cta">
                View Solar Inverter Details
              </Link>
              <Link to={productsHref} className="pf-explore-link">
                Explore all products →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
