import { useCallback, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PATENT_COOLING_PRODUCT_IMAGE_URL } from "../../data/productsData";
import "./ProductAdvantageSection.css";

gsap.registerPlugin(ScrollTrigger);

// SVG left edge = product image right edge (orbit_center + image_half_width).
// Default: image 400px → half=200px, orbit_center=50%-160px → image_right=50%+40px.
// Paths start at x=4 (≈ image right edge) and end at x=122 (inside card left edge).
const CONNECTOR_PATHS = [
  {
    // Upper-L: exits image edge, bends up → card top area
    d: "M 4 85 L 40 85 L 40 18 L 122 18",
    dashLen: 185,
    startX: 4,
    startY: 85,
    endX: 122,
    endY: 18,
  },
  {
    // Moderate upper-L
    d: "M 4 85 L 44 85 L 44 40 L 122 40",
    dashLen: 163,
    startX: 4,
    startY: 85,
    endX: 122,
    endY: 40,
  },
  {
    // Shallow upper-L
    d: "M 4 85 L 48 85 L 48 56 L 122 56",
    dashLen: 147,
    startX: 4,
    startY: 85,
    endX: 122,
    endY: 56,
  },
  {
    // Lower-L: exits image edge, bends down → card lower area
    d: "M 4 85 L 40 85 L 40 132 L 122 132",
    dashLen: 165,
    startX: 4,
    startY: 85,
    endX: 122,
    endY: 132,
  },
  {
    // Shallow lower-L
    d: "M 4 85 L 44 85 L 44 108 L 122 108",
    dashLen: 141,
    startX: 4,
    startY: 85,
    endX: 122,
    endY: 108,
  },
];

const getSpecValue = (product, label) =>
  product?.specs?.find((item) => item.label === label)?.value ?? "";

const getParameterValue = (product, group, label) =>
  product?.parameters?.variants?.[0]?.[group]?.find((item) => item.label === label)?.value ?? "";

const buildProductAdvantages = (product) => {
  const uniqueImages = Array.from(
    new Set([product.image, ...(product.showcase ?? [])].filter(Boolean))
  );

  const pickImage = (index) => uniqueImages[index % uniqueImages.length] || product.image;

  const power = product.meta?.split("|")[0]?.trim() ?? "optimized output";
  const phase = getSpecValue(product, "Phase") || "Single Phase";
  const application = getSpecValue(product, "Application") || "modern solar applications";
  const series = getSpecValue(product, "Series") || product.series || "Cathode inverter";
  const mppt = getParameterValue(product, "pv", "MPPT architecture") || "smart MPPT";
  const monitoring = getParameterValue(product, "pv", "Monitoring") || "cloud monitoring";
  const protection = getParameterValue(product, "general", "Protection degree") || "IP66";
  const communication = getParameterValue(product, "general", "Communication") || "smart communication";
  const mounting = getParameterValue(product, "general", "Mounting") || "wall mounted format";
  const cooling = getParameterValue(product, "ac", "Cooling concept") || "smart cooling";
  const backupSupport = getParameterValue(product, "eps", "Backup support") || "Not applicable";

  const featureOne = product.features?.[0] || "Product Performance";
  const featureThree = product.features?.[2] || "Smart Visibility";

  // Cooling tab: shared 8.png (fan/heatsink) is only for **on-grid single phase**.
  // Hybrid / micro / three-phase on-grid use this product’s own showcase images via pickImage(1).
  const useGenericPatent8 =
    product.mainTabKey === "ongrid" && product.categoryKey === "single";
  const patentedCoolingImage = useGenericPatent8
    ? PATENT_COOLING_PRODUCT_IMAGE_URL
    : pickImage(1);

  // pickImage(i) cycles through uniqueImages via modulo.
  // Single-image products always get the same image (i % 1 === 0 always).
  // Multi-image products naturally cycle through their distinct showcase shots.
  return [
    {
      title: featureOne,
      description: `${product.name} delivers ${power} in the ${series} family for ${application}.`,
      image: pickImage(0),
    },
    {
      title: "Patented cooling technology",
      description: `Built for ${phase.toLowerCase()} installations, this platform supports ${mppt.toLowerCase()} and steady system output.`,
      image: patentedCoolingImage,
    },
    {
      title: featureThree,
      description: `${monitoring} keeps ${product.name} connected for clearer performance tracking and faster service visibility.`,
      image: pickImage(2),
    },
    {
      title: backupSupport === "Supported" ? "Backup Support" : "Reliable Protection",
      description:
        backupSupport === "Supported"
          ? `${product.name} is ready for solar-plus-storage control with backup-capable architecture for critical loads.`
          : `${protection} protection and ${cooling.toLowerCase()} help maintain dependable operation across demanding field conditions.`,
      image: pickImage(3),
    },
    {
      title: "System Integration",
      description: `${communication} with ${mounting.toLowerCase()} construction makes ${product.name} easier to integrate, monitor, and maintain.`,
      image: pickImage(4),
    },
  ];
};

export default function ProductAdvantageSection({ product, onInquire }) {
  const advantageItems = useMemo(() => buildProductAdvantages(product), [product]);

  const scrollTrackRef = useRef(null);
  const stickyRef = useRef(null);
  const innerOrbitRef = useRef(null);
  const outerOrbitRef = useRef(null);
  const outerCardRefs = useRef([]);
  const connectorSvgRef = useRef(null);
  const connectorRef = useRef(null);
  const startDotRef = useRef(null);
  const endDotRef = useRef(null);
  const cardRef = useRef(null);

  const stepRefs = useRef([]);
  const stepBarRefs = useRef([]);
  const cardTitleRef = useRef(null);
  const cardDescRef = useRef(null);
  const productImgRef = useRef(null);

  const isOpenRef = useRef(false);
  const activeIdxRef = useRef(0);
  const advantageScrollTriggerRef = useRef(null);

  const total = advantageItems.length;
  const step = 360 / total;
  const outerRadius = 400;

  function applyPath(index) {
    const path = CONNECTOR_PATHS[index] || CONNECTOR_PATHS[0];
    if (connectorRef.current) {
      connectorRef.current.setAttribute("d", path.d);
      connectorRef.current.setAttribute("stroke-dasharray", path.dashLen);
      connectorRef.current.setAttribute("stroke-dashoffset", path.dashLen);
    }
    if (startDotRef.current) {
      startDotRef.current.setAttribute("cx", path.startX);
      startDotRef.current.setAttribute("cy", path.startY);
    }
    if (endDotRef.current) {
      endDotRef.current.setAttribute("cx", path.endX);
      endDotRef.current.setAttribute("cy", path.endY);
    }
  }

  function drawPath(index, duration = 0.45) {
    const path = CONNECTOR_PATHS[index] || CONNECTOR_PATHS[0];
    if (!connectorRef.current) return;

    gsap.fromTo(
      connectorRef.current,
      { strokeDashoffset: path.dashLen },
      { strokeDashoffset: 0, duration, ease: "power2.out" }
    );
  }

  const goToAdvantage = useCallback(
    (index) => {
      const st = advantageScrollTriggerRef.current;
      if (!st) return;
      const startY = st.start;
      const endY = st.end;
      if (typeof startY !== "number" || typeof endY !== "number") return;

      const clamped = Math.max(0, Math.min(index, total - 1));
      // Use the *middle* of each 1/total progress slice. Old formula used index/(total-1)
      // so the last tab needed progress === 1 (st.end), the page often can't scroll that
      // far, so onUpdate never reached index 4. Mid-bucket + floor mapping stays in sync.
      const progress = total <= 1 ? 0 : (clamped + 0.5) / total;
      const targetY = startY + progress * (endY - startY);
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      const y = Math.min(targetY, Math.max(0, maxY));

      const lenis = window.__lenis;
      if (lenis?.scrollTo) {
        lenis.scrollTo(y, { immediate: true });
      } else {
        window.scrollTo(0, y);
      }

      requestAnimationFrame(() => ScrollTrigger.update());
    },
    [total]
  );

  useEffect(() => {
    const outerCards = outerCardRefs.current;
    const steps = stepRefs.current;
    const stepBars = stepBarRefs.current;
    let lastIndex = 0;

    activeIdxRef.current = 0;
    // Start fully “open” so the orbit, labels, connector, and card are visible
    // as soon as the section is seen, not after a scroll-driven reveal.
    isOpenRef.current = true;
    applyPath(0);
    if (connectorRef.current) {
      const p0 = CONNECTOR_PATHS[0];
      connectorRef.current.setAttribute("stroke-dashoffset", 0);
      connectorRef.current.setAttribute("stroke-dasharray", String(p0.dashLen));
    }

    gsap.set(outerOrbitRef.current, { scale: 1, transformOrigin: "50% 50%" });
    gsap.set(innerOrbitRef.current, { scale: 1, transformOrigin: "50% 50%" });
    gsap.set(connectorSvgRef.current, { opacity: 1 });
    gsap.set(cardRef.current, { opacity: 1, x: 0, y: 0 });

    const outerSpin = gsap.to(outerOrbitRef.current, {
      rotate: 360,
      duration: 60,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
      force3D: true,
    });

    const textSpin = gsap.to(outerCards, {
      rotate: -360,
      duration: 60,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
      force3D: true,
    });

    const innerSpin = gsap.to(innerOrbitRef.current, {
      rotate: -360,
      duration: 35,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
      force3D: true,
    });

    function playOpen() {
      isOpenRef.current = true;
      const idx = activeIdxRef.current;
      applyPath(idx);

      gsap.timeline()
        .to(outerOrbitRef.current, {
          scale: 1,
          duration: 0.75,
          ease: "back.out(1.2)",
          transformOrigin: "50% 50%",
        })
        .to(
          innerOrbitRef.current,
          {
            scale: 1,
            duration: 0.65,
            ease: "back.out(1.2)",
            transformOrigin: "50% 50%",
          },
          "<0.1"
        )
        .to(connectorSvgRef.current, { opacity: 1, duration: 0.2 }, "<0.35")
        .set(cardRef.current, { opacity: 0, x: -40 })
        .add(() => drawPath(idx, 0.6), "<0.1")
        .to(cardRef.current, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }, "+=0.5");
    }

    function playClose() {
      isOpenRef.current = false;

      gsap.timeline()
        .to(cardRef.current, { opacity: 0, x: -40, duration: 0.35, ease: "power2.in" })
        .to(connectorSvgRef.current, { opacity: 0, duration: 0.25 }, "<")
        .to(
          innerOrbitRef.current,
          {
            scale: 0,
            duration: 0.55,
            ease: "back.in(1.2)",
            transformOrigin: "50% 50%",
          },
          "<0.1"
        )
        .to(
          outerOrbitRef.current,
          {
            scale: 0,
            duration: 0.65,
            ease: "back.in(1.2)",
            transformOrigin: "50% 50%",
          },
          "<0.1"
        );
    }

    function activateIndex(index) {
      if (index === lastIndex) return;
      lastIndex = index;
      activeIdxRef.current = index;

      const item = advantageItems[index];

      steps.forEach((el, i) => {
        if (!el) return;
        el.classList.toggle("active", i === index);
      });

      stepBars.forEach((bar, i) => {
        if (!bar) return;
        bar.style.transform =
          i === index
            ? "translateY(-50%) scaleY(1)"
            : "translateY(-50%) scaleY(0)";
      });

      if (cardTitleRef.current) cardTitleRef.current.textContent = item.title;
      if (cardDescRef.current) cardDescRef.current.textContent = item.description;
      if (productImgRef.current) {
        productImgRef.current.src = item.image;
        productImgRef.current.alt = item.title;
      }

      if (!isOpenRef.current) return;

      applyPath(index);

      gsap.timeline()
        .set(cardRef.current, { opacity: 0, y: 8 })
        .add(() => drawPath(index, 0.45))
        .to(cardRef.current, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "+=0.35");
    }

    const st = ScrollTrigger.create({
      trigger: scrollTrackRef.current,
      start: "top top",
      end: "bottom bottom",
      onEnter() {
        if (!isOpenRef.current) playOpen();
      },
      onLeave() {
        playClose();
      },
      onEnterBack() {
        if (!isOpenRef.current) playOpen();
      },
      onLeaveBack() {
        playClose();
      },
      onUpdate(self) {
        const rawProgress = (self.scroll() - self.start) / (self.end - self.start);
        const p = Math.max(0, Math.min(1, rawProgress));
        // Match goToAdvantage: equal buckets, last bucket includes max scroll w/o needing p==1
        const index =
          total <= 1
            ? 0
            : Math.min(total - 1, Math.floor(p * total));
        activateIndex(index);
      },
    });
    advantageScrollTriggerRef.current = st;

    return () => {
      advantageScrollTriggerRef.current = null;
      st.kill();
      outerSpin.kill();
      textSpin.kill();
      innerSpin.kill();
      gsap.killTweensOf([
        innerOrbitRef.current,
        outerOrbitRef.current,
        connectorRef.current,
        connectorSvgRef.current,
        cardRef.current,
        ...outerCards,
      ]);
    };
  }, [advantageItems, total]);

  const first = advantageItems[0];

  return (
    <div
      ref={scrollTrackRef}
      className="adv-scroll-track"
      style={{ height: `${(total + 1) * 100}vh` }}
    >
      <div ref={stickyRef} className="adv-sticky">
        <section className="adv-section">
          <div className="adv-left">
            <p className="adv-left-label">Key Advantages</p>
            {advantageItems.map((item, index) => (
              <button
                type="button"
                key={`${item.title}-${index}`}
                ref={(el) => (stepRefs.current[index] = el)}
                className={`adv-step ${index === 0 ? "active" : ""}`}
                onClick={() => goToAdvantage(index)}
                aria-label={`Show advantage: ${item.title}`}
              >
                <span
                  ref={(el) => (stepBarRefs.current[index] = el)}
                  className="adv-step-bar"
                  style={{
                    transform:
                      index === 0
                        ? "translateY(-50%) scaleY(1)"
                        : "translateY(-50%) scaleY(0)",
                  }}
                />
                <span className="adv-step-num">{index + 1}</span>
                <span className="adv-step-title">{item.title}</span>
              </button>
            ))}
          </div>

          <div className="adv-main">
            <div className="orbit-wrapper">
              <div className="outer-orbit" ref={outerOrbitRef}>
                {advantageItems.map((item, index) => (
                  <div
                    key={`${item.title}-orbit-${index}`}
                    className="outer-card-pos"
                    style={{
                      transform: `rotate(${index * step}deg) translate(${outerRadius}px) rotate(-${index * step}deg)`,
                    }}
                  >
                    <button
                      type="button"
                      className="outer-card"
                      ref={(el) => (outerCardRefs.current[index] = el)}
                      onClick={() => goToAdvantage(index)}
                      aria-label={item.title}
                    >
                      {item.title}
                    </button>
                  </div>
                ))}
              </div>

              <div className="inner-orbit" ref={innerOrbitRef} />

              <img
                ref={productImgRef}
                src={first.image}
                className="adv-product"
                alt={first.title}
                decoding="async"
              />
            </div>

          <svg
              ref={connectorSvgRef}
              className="adv-connector-svg"
              viewBox="0 0 130 170"
              fill="none"
              overflow="visible"
            >
              <defs>
                <linearGradient id="connGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5BC8C1" />
                  <stop offset="100%" stopColor="#7ED3C8" />
                </linearGradient>
              </defs>
              <path
                ref={connectorRef}
                d={CONNECTOR_PATHS[0].d}
                stroke="url(#connGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={CONNECTOR_PATHS[0].dashLen}
                strokeDashoffset={CONNECTOR_PATHS[0].dashLen}
                fill="none"
              />
              <circle
                ref={startDotRef}
                cx={CONNECTOR_PATHS[0].startX}
                cy={CONNECTOR_PATHS[0].startY}
                r="5"
                fill="#5BC8C1"
              />
              <circle
                ref={endDotRef}
                cx={CONNECTOR_PATHS[0].endX}
                cy={CONNECTOR_PATHS[0].endY}
                r="5"
                fill="#7ED3C8"
              />
            </svg>

            <div className="adv-card" ref={cardRef}>
              <div className="adv-card-body">
                <h3 ref={cardTitleRef}>{first.title}</h3>
                <p ref={cardDescRef}>{first.description}</p>
                <button type="button" className="adv-btn" onClick={onInquire}>
                  Inquire Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


