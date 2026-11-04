import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCTS } from "../../data/productsData";
import "./EmergenaPerfectFit.css";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "#22727f";

const getRepProduct = (mainTabKey) =>
  PRODUCTS.find((p) => p.mainTabKey === mainTabKey);

const ongrid = getRepProduct("ongrid");
const hybrid = getRepProduct("hybrid");
const micro = getRepProduct("micro");
const storage = getRepProduct("storage");

const TABS = [
  {
    key: "ongrid",
    label: "Ongrid Inverter",
    badge: "Ongrid Inverter",
    image: ongrid?.image,
    description:
      "High-efficiency grid-tied solar inverters for residential and commercial sites — seamless synchronisation, wide MPPT range, and maximum energy yield.",
    powerLabel: "Power Range",
    powerDisplay: "2.3 kW – 110 kW",
    powerLines: [
      { label: "Single Phase", value: "2.3 – 6 kW" },
      { label: "Three Phase", value: "4 – 110 kW" },
    ],
    bullets: [
      "Single & three phase variants for every site size",
      "Wide MPPT input voltage range for maximum yield",
      "IP66-rated outdoor-ready enclosures",
      "Smart monitoring via Cathode cloud platform",
    ],
    cta: "View Solar Inverter Details",
  },
  {
    key: "hybrid",
    label: "Hybrid Inverter",
    badge: "Hybrid Inverter",
    image: hybrid?.image,
    description:
      "All-in-one hybrid platforms with integrated battery management for energy independence, backup power, and intelligent load control.",
    powerLabel: "Power Range",
    powerDisplay: "3 kW – 15 kW",
    powerLines: [
      { label: "Single Phase", value: "3 – 6 kW" },
      { label: "Three Phase", value: "5 – 15 kW" },
    ],
    bullets: [
      "On-grid, off-grid & battery backup in one unit",
      "Programmable supply priority for PV, battery & grid",
      "Single & three phase models available",
      "Cathode cloud remote monitoring included",
    ],
    cta: "View Solar Inverter Details",
  },
  {
    key: "micro",
    label: "Micro Inverter",
    badge: "Micro Inverter",
    image: micro?.image,
    description:
      "Module-level power electronics for maximum energy harvest per panel — ideal for complex rooftop layouts, partial shading, and space-constrained systems.",
    powerLabel: "Power Range",
    powerDisplay: "0.6 kW – 2.4 kW",
    powerLines: [],
    bullets: [
      "Per-module MPPT for maximum individual panel yield",
      "Ideal for shaded or complex roof installations",
      "Plug & play installation, no high-voltage DC wiring",
      "Enhanced system safety with low DC voltage",
    ],
    cta: "View Solar Inverter Details",
  },
  {
    key: "storage",
    label: "BESS",
    badge: "BESS",
    image: storage?.image,
    description:
      "High-cycle LiFePO4 battery energy storage systems with intelligent BMS — engineered for seamless pairing with Cathode hybrid inverters.",
    powerLabel: "Capacity Range",
    powerDisplay: "5.12 – 10.24 kWh+",
    powerLines: [
      { label: "Wall-Mount", value: "5.12 – 10.24 kWh" },
      { label: "Rack-Mount", value: "5.12 – 10.24 kWh" },
    ],
    bullets: [
      "Tier-1 LiFePO4 cells with 6,000+ cycle life",
      "Intelligent BMS for safety and cell balancing",
      "Wall-mount & rack-mount architectures",
      "Plug-and-play hybrid inverter compatibility",
    ],
    cta: "View BESS Details",
  },
];

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill={ACCENT} />
    <path
      d="M7 12.5l3.5 3.5 6.5-7"
      stroke="#ffffff"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const getProductsPageHref = (mainTabKey) => {
  const p = new URLSearchParams();
  p.set("tab", mainTabKey);
  if (mainTabKey !== "micro" && mainTabKey !== "storage") {
    p.set("phase", "single");
  }
  return `/products?${p.toString()}`;
};

export default function EmergenaPerfectFit() {
  const sectionRef = useRef(null);
  const didMountRef = useRef(false);
  const [activeKey, setActiveKey] = useState(TABS[0].key);
  const active = TABS.find((t) => t.key === activeKey) ?? TABS[0];
  const productsHref = getProductsPageHref(activeKey);
  const [isNearView, setIsNearView] = useState(false);
  const [animateImage, setAnimateImage] = useState(false);

  const tabImages = useMemo(
    () => TABS.map((t) => t.image).filter(Boolean),
    []
  );

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
    setAnimateImage(true);
    const t = window.setTimeout(() => setAnimateImage(false), 520);
    return () => window.clearTimeout(t);
  }, [activeKey]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cp-fit__header > *, .cp-fit__body",
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
      className="cp-fit"
      id="perfect-fit"
      aria-label="Find your perfect fit"
    >
      <div className="cp-fit__container">
        <div className="cp-fit__header">
          <h2 className="cp-fit__title text-xl">
            Find Your <span>Perfect Fit</span>
          </h2>
          <p className="cp-fit__intro text-xs">
            Cathode Power offers a comprehensive range of solar energy solutions,
            including On-Grid Inverters from 2.3 kW to 110 kW, Hybrid Inverters from
            3 kW to 15 kW, Microinverters from 0.6 kW to 2.4 kW, and Battery Energy
            Storage Systems (BESS), designed to meet diverse residential, commercial,
            and industrial energy needs.
          </p>

          <nav className="cp-fit__tabs" aria-label="Product categories">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`cp-fit__tab${activeKey === tab.key ? " is-active" : ""}`}
                onClick={() => setActiveKey(tab.key)}
                aria-pressed={activeKey === tab.key}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="cp-fit__body">
          <div
            className={`cp-fit__media cp-fit__media--${active.key}`}
            data-label={active.badge}
          >
            {active.image && (
              <img
                key={active.key}
                src={active.image}
                alt={active.label}
                className={`cp-fit__img cp-fit__img--${active.key}${animateImage ? " is-animate" : ""}`}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            )}
          </div>

          <div className="cp-fit__info">
            <p className="cp-fit__type">{active.label}</p>
            <p className="cp-fit__desc">{active.description}</p>

            <p className="cp-fit__power-label">{active.powerLabel}</p>
            {active.powerLines?.length ? (
              <div className="cp-fit__power-rows" role="list">
                {active.powerLines.map((line) => (
                  <div className="cp-fit__power-row" role="listitem" key={line.label}>
                    <span className="cp-fit__power-value">{line.value}</span>
                    <span className="cp-fit__power-pill">{line.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="cp-fit__power">{active.powerDisplay}</p>
            )}

            <ul className="cp-fit__bullets">
              {active.bullets.map((b) => (
                <li key={b} className="cp-fit__bullet">
                  <CheckIcon />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="cp-fit__actions">
              <Link
                to={productsHref}
                className="button-wrap cp-fit__cta w-inline-block"
              >
                <div className="primary-text-wrap">
                  <div className="text-xs">{active.cta}</div>
                </div>
                <div className="bg-primary-btn" />
              </Link>
              <Link to="/products" className="cp-fit__explore text-xs">
                Explore all products →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
