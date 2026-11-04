import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GrainIcon, ArrowPrevIcon, ArrowNextIcon } from "./EmergenaIcons";

// Web-optimized showcase product images (<35KB each, 60fps, zero lag)
import ongridWebp from "../../assets/images/products/showcase-ongrid.webp";
import ongridPng from "../../assets/images/products/showcase-ongrid.png";

import hybridWebp from "../../assets/images/products/showcase-hybrid.webp";
import hybridPng from "../../assets/images/products/showcase-hybrid.png";

import microWebp from "../../assets/images/products/showcase-micro.webp";
import microPng from "../../assets/images/products/showcase-micro.png";

import storageWebp from "../../assets/images/products/showcase-storage.webp";
import storagePng from "../../assets/images/products/showcase-storage.png";

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS_LIST = [
  {
    id: 1,
    key: "ongrid",
    tabLabel: "Ongrid Inverter",
    tag: "ONGRID INVERTER",
    image: ongridWebp,
    fallback: ongridPng,
    client: "Residential, Commercial & Industrial Rooftops",
    location: "Single Phase & Three Phase Available (2.3 kW - 110 kW)",
    title: "High-Efficiency Grid-Tied Solar Inverters",
    description:
      "High-efficiency grid-tied solar inverters built for residential to heavy industrial installations with seamless grid synchronization, multi-MPPT tracking, and maximum energy yield.",
    metricValue: 110,
    metricUnit: "kW",
    metricLabel: "Power range: 2.3 kW to 110 kW",
    href: "/products?tab=ongrid&phase=single",
  },
  {
    id: 2,
    key: "hybrid",
    tabLabel: "Hybrid Inverter",
    tag: "HYBRID INVERTER",
    image: hybridWebp,
    fallback: hybridPng,
    client: "Solar Plus Storage & Continuous Backup",
    location: "Single Phase & Three Phase Available (3 kW - 15 kW)",
    title: "All-in-One Intelligent Hybrid Solar Inverters",
    description:
      "All-in-one hybrid inverter with integrated battery management for energy independence, sub-10ms uninterrupted backup power, and intelligent programmable load priority.",
    metricValue: 15,
    metricUnit: "kW",
    metricLabel: "Storage capacity: 3 kW to 15 kW",
    href: "/products?tab=hybrid&phase=single",
  },
  {
    id: 3,
    key: "micro",
    tabLabel: "Micro Inverter",
    tag: "MICRO INVERTER",
    image: microWebp,
    fallback: microPng,
    client: "Module-Level Power Electronics (MLPE)",
    location: "Individual MPPT Per Solar Panel (Dual & Quad)",
    title: "Module-Level Solar Micro Inverters",
    description:
      "Module-level power electronics for maximum energy harvest per panel — ideal for complex rooftop layouts, partial shading, balcony solar, and space-constrained systems.",
    metricValue: 2.4,
    metricUnit: "kW",
    metricLabel: "Per-unit yield: 600 W to 2.4 kW",
    href: "/products?tab=micro",
  },
  {
    id: 4,
    key: "storage",
    tabLabel: "Energy Storage",
    tag: "LITHIUM STORAGE",
    image: storageWebp,
    fallback: storagePng,
    client: "Residential & Commercial Battery Systems",
    location: "Wall-Mount & Rack-Mount LiFePO4 Architectures",
    title: "High-Density LiFePO4 Energy Storage Batteries",
    description:
      "Ultra-reliable lithium iron phosphate battery storage with intelligent BMS, 6,000+ cycle life, and scalable capacity engineered to pair seamlessly with hybrid solar systems.",
    metricValue: 10.2,
    metricUnit: "kWh",
    metricLabel: "Capacity range: 5.12 kWh to 10.24 kWh+",
    href: "/products?tab=storage",
  },
];

export default function EmergenaCaseStudies({ onOpenQuote }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sectionRef = useRef(null);
  const headerTagRef = useRef(null);
  const headerTitleRef = useRef(null);
  const tabsRef = useRef(null);
  const arrowsRef = useRef(null);
  const sliderRef = useRef(null);

  const total = PRODUCTS_LIST.length;

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % total);
  };

  // 1. Initial Webflow Scroll Entrance Animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      tl.from(
        [
          headerTagRef.current,
          headerTitleRef.current,
          tabsRef.current,
          arrowsRef.current,
        ],
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        }
      ).from(
        sliderRef.current,
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2. Autoplay with hover pause (5000ms delay)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, total]);

  return (
    <section className="main-section dark" id="stories" ref={sectionRef}>
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="projects-content-wrapper">
          {/* Header Row: Title & Tag on Left, Arrow Controls on Right */}
          <div className="projects-header-row top-content-wrap">
            <div className="left-content-wrap">
              <div className="element-overflow">
                <div className="element-wrap" ref={headerTagRef}>
                  <div
                    data-wf--tag-section--variant="light"
                    className="tag-wrap w-variant-845cec6c-c1d0-4fc7-e96a-3c90cde403cf"
                  >
                    <div className="tag-icon w-variant-845cec6c-c1d0-4fc7-e96a-3c90cde403cf">
                      <GrainIcon className="text-xs icon" />
                    </div>
                    <div className="tag-text w-variant-845cec6c-c1d0-4fc7-e96a-3c90cde403cf">
                      <div className="tag-title">Our Products</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ttitle-testimonials-section" ref={headerTitleRef}>
                <h2 className="text-xl">Types Of Solar Inverters We Offer.</h2>
              </div>
            </div>

            {/* Slider Navigation Arrows in Header */}
            <div className="arrows-wrap-stories" ref={arrowsRef}>
              <button
                type="button"
                className="prev-button left"
                onClick={handlePrev}
                aria-label="Previous Product"
              >
                <div className="arrow-icon">
                  <ArrowPrevIcon />
                </div>
              </button>
              <button
                type="button"
                className="prev-button right"
                onClick={handleNext}
                aria-label="Next Product"
              >
                <div className="arrow-icon">
                  <ArrowNextIcon />
                </div>
              </button>
            </div>
          </div>

          {/* Product Category Tabs (Quick switcher synchronized with slider) */}
          <div
            className="emergena-product-tabs-wrap"
            ref={tabsRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <nav className="emergena-product-tabs" aria-label="Product categories">
              {PRODUCTS_LIST.map((prod, idx) => (
                <button
                  key={prod.id}
                  type="button"
                  className={`emergena-product-tab ${
                    activeIdx === idx ? "active" : ""
                  }`}
                  onClick={() => setActiveIdx(idx)}
                >
                  {prod.tabLabel}
                </button>
              ))}
            </nav>
          </div>

          {/* Exact Webflow Parity Horizontal Slider Carousel */}
          <div
            className="slider w-slider"
            ref={sliderRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="mask w-slider-mask">
              <div
                className="slider-track"
                style={{
                  transform: `translate3d(-${activeIdx * 100}%, 0, 0)`,
                  transition: "transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)",
                  willChange: "transform",
                }}
              >
                {PRODUCTS_LIST.map((product) => (
                  <div className="slide w-slide" key={product.id}>
                    <div className="projects-card-wrap">
                      {/* Authentic Emergena Box Layout (Preserved Exactly) */}
                      <div className="project-item">
                        {/* Left Column: Dark Studio Showcase & Product Image */}
                        <div className="left-content-wrap projects-card">
                          <div className="img-tag-stories">
                            <div className="project-number">
                              <div className="tag-project">{product.tag}</div>
                            </div>
                            <div className="client-image">
                              <picture>
                                <source srcSet={product.image} type="image/webp" />
                                <img
                                  src={product.fallback}
                                  loading="eager"
                                  decoding="async"
                                  alt={product.title}
                                  className="image"
                                  onError={(e) => {
                                    if (!e.currentTarget.dataset.fallbackApplied) {
                                      e.currentTarget.dataset.fallbackApplied = "true";
                                      e.currentTarget.src = product.fallback;
                                    }
                                  }}
                                />
                              </picture>
                            </div>
                          </div>
                          <div className="title-description-wrap">
                            <div className="title-wrap white">
                              <div className="text-xs">{product.client}</div>
                            </div>
                            <div className="description-wrap accent">
                              <div className="text-xxs">{product.location}</div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Title, Description, Metrics & Button */}
                        <div className="right-content-wrap projects-card">
                          <div className="title-card-stories">
                            <div className="title-wrap white">
                              <h3 className="text-l">{product.title}</h3>
                            </div>
                            <div className="desc-stories">
                              <p className="text-xs">{product.description}</p>
                            </div>
                          </div>

                          <div className="bottom-content-wrap projects-card-content">
                            <div className="left-content-wrap">
                              <div className="number-card-wrap project-card">
                                <div className="number-suffix-wrap">
                                  <div className="metric-value">
                                    <div className="text-l">
                                      {product.metricValue}
                                    </div>
                                  </div>
                                  <div className="metric-unit">
                                    <div className="text-l">
                                      {product.metricUnit}
                                    </div>
                                  </div>
                                </div>
                                <div className="counter-title-stories">
                                  <div className="text-sm">
                                    {product.metricLabel}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="right-content-wrap project-card-cta">
                              <Link
                                to={product.href}
                                className="button-wrap w-variant-3c4ebf71-bf7d-51e4-aaf8-51d9d17171fd w-inline-block"
                              >
                                <div className="primary-text-wrap w-variant-3c4ebf71-bf7d-51e4-aaf8-51d9d17171fd">
                                  <div className="text-xs w-variant-3c4ebf71-bf7d-51e4-aaf8-51d9d17171fd">
                                    View product details
                                  </div>
                                </div>
                                <div className="bg-primary-btn" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
