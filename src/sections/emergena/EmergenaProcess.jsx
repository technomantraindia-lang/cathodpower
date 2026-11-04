import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GrainIcon } from "./EmergenaIcons";

gsap.registerPlugin(ScrollTrigger);

const PROCESS_STEPS = [
  {
    id: 1,
    stepNum: "Step 01",
    stepClass: "_01",
    numBorderClass: "right-border _1",
    titleClass: "_1",
    imgWrapClass: "_1",
    category: "Site Assessment & Simulation",
    title: "We evaluate rooftop irradiance, grid dynamics, and load profiles to architect your optimal solar array",
    image: "/images/process/step_01.webp?v=4",
    alt: "Commercial rooftop solar photovoltaic array engineered for optimal irradiance and maximum yield.",
    layout: "normal",
  },
  {
    id: 2,
    stepNum: "Step 02",
    stepClass: "_02",
    numBorderClass: "left-border _2",
    titleClass: "_2",
    imgWrapClass: "_2",
    category: "Precision Inverter Engineering",
    title: "We engineer high-efficiency inverters with dual MPPT, IP66 die-cast protection, and robust thermal cooling",
    image: "/images/process/step_02.webp?v=4",
    alt: "Cleanroom electronic manufacturing and quality testing of Cathode Power solar inverters.",
    layout: "reversed",
  },
  {
    id: 3,
    stepNum: "Step 03",
    stepClass: "_03",
    numBorderClass: "right-border _3",
    titleClass: "_3",
    imgWrapClass: "_3",
    category: "Rapid Certified Deployment",
    title: "We execute certified on-site installation, safety compliance, and seamless grid synchronization",
    image: "/images/process/step_03.webp?v=4",
    alt: "On-site commercial solar deployment with grid synchronization and certified safety compliance.",
    layout: "normal",
  },
  {
    id: 4,
    stepNum: "Step 04",
    stepClass: "_04",
    numBorderClass: "left-border _4",
    titleClass: "_4",
    imgWrapClass: "_4",
    category: "AI Cloud IoT & Monitoring",
    title: "We provide 24/7 intelligent yield optimization, live generation analytics, and automated fault diagnostics",
    image: "/images/process/step_04.webp?v=4",
    alt: "Cathode Power Solar View intelligent monitoring app showing real-time generation curves and telemetry.",
    layout: "reversed",
  },
];

export default function EmergenaProcess() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const titleSectionRef = useRef(null);
  const listWrapRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollEl = scrollRef.current;
    const contentWrapper = contentWrapperRef.current;
    const titleSection = titleSectionRef.current;
    const listWrap = listWrapRef.current;

    if (!section || !scrollEl || !contentWrapper || !titleSection || !listWrap)
      return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ────────────────────────────────────────────────────────
      // DESKTOP (≥ 992px) — Faithful Webflow Scroll Scrub & Pinning
      // ────────────────────────────────────────────────────────
      mm.add("(min-width: 992px)", () => {
        const cards = gsap.utils.toArray(
          listWrap.querySelectorAll(".single-process-wrap")
        );
        if (cards.length < 2) return;

        // Set initial positions:
        // Card 0 starts with center title at 0 and step opacity at 1.
        // Subsequent cards start with center title hidden above at -100% and step opacity at 0.
        cards.forEach((card, i) => {
          const title = card.querySelector(".process-title");
          const step = card.querySelector(".process-step");
          const imgWrap = card.querySelector(".img-process-wrap");
          if (i === 0) {
            gsap.set(title, { yPercent: 0, opacity: 1 });
            if (step) gsap.set(step, { opacity: 1 });
          } else {
            if (title) gsap.set(title, { yPercent: -100, opacity: 1 });
            if (step) gsap.set(step, { opacity: 0 });
          }
          if (imgWrap) gsap.set(imgWrap, { y: 0, scale: 1 });
        });

        // Calculate dynamic travel distance based on card height + gap
        const calculateMetrics = () => {
          const cardHeight = cards[0].offsetHeight;
          const style = window.getComputedStyle(listWrap);
          const gap = parseFloat(style.rowGap) || parseFloat(style.gridRowGap) || 16;
          const stepDistance = cardHeight + gap;
          const totalDistance = (cards.length - 1) * stepDistance;
          return { cardHeight, stepDistance, totalDistance };
        };

        const { totalDistance } = calculateMetrics();

        // Master scrub timeline keyed directly to the 300vh scroll track
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollEl,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
            pin: contentWrapper,
            pinSpacing: false,
            invalidateOnRefresh: true,
          },
        });

        // 1. Title section fades and translates up as scrolling begins (0.03 → 0.18)
        tl.to(
          titleSection,
          {
            yPercent: -80,
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.15,
          },
          0.03
        );

        // 2. The entire cards list glides up smoothly (0.10 → 0.95)
        tl.to(
          listWrap,
          {
            y: -totalDistance,
            ease: "none",
            duration: 0.85,
          },
          0.10
        );

        // 3. Card-by-Card Center Box Text & Step Animations (Exact Webflow Behavior)
        // Card 0 (Step 01):
        const card0 = cards[0];
        const title0 = card0?.querySelector(".process-title");
        const img0 = card0?.querySelector(".img-process-wrap");
        if (title0) {
          // Slide down from 0% to 100% and fade out as Card 0 exits
          tl.to(
            title0,
            {
              yPercent: 100,
              ease: "none",
              duration: 0.24,
            },
            0.18
          );
          tl.to(
            title0,
            {
              opacity: 0,
              ease: "none",
              duration: 0.14,
            },
            0.28
          );
        }
        if (img0) {
          tl.to(
            img0,
            {
              y: 28,
              scale: 1.12,
              ease: "none",
              duration: 0.24,
            },
            0.18
          );
        }

        // Card 1 (Step 02):
        const card1 = cards[1];
        const title1 = card1?.querySelector(".process-title");
        const step1 = card1?.querySelector(".process-step");
        const img1 = card1?.querySelector(".img-process-wrap");
        if (step1) {
          tl.to(
            step1,
            {
              opacity: 1,
              ease: "power1.out",
              duration: 0.08,
            },
            0.31
          );
        }
        if (title1) {
          // Slide in from top (-100% → 0%) into Card 1 center box
          tl.to(
            title1,
            {
              yPercent: 0,
              ease: "none",
              duration: 0.14,
            },
            0.31
          );
          // Slide down out (0% → 100%) and fade out as Card 1 exits
          tl.to(
            title1,
            {
              yPercent: 100,
              ease: "none",
              duration: 0.14,
            },
            0.52
          );
          tl.to(
            title1,
            {
              opacity: 0,
              ease: "none",
              duration: 0.10,
            },
            0.56
          );
        }
        if (img1) {
          tl.to(
            img1,
            {
              y: 28,
              scale: 1.12,
              ease: "none",
              duration: 0.25,
            },
            0.34
          );
        }

        // Card 2 (Step 03):
        const card2 = cards[2];
        const title2 = card2?.querySelector(".process-title");
        const step2 = card2?.querySelector(".process-step");
        const img2 = card2?.querySelector(".img-process-wrap");
        if (step2) {
          tl.to(
            step2,
            {
              opacity: 1,
              ease: "power1.out",
              duration: 0.08,
            },
            0.54
          );
        }
        if (title2) {
          // Slide in from top (-100% → 0%) into Card 2 center box
          tl.to(
            title2,
            {
              yPercent: 0,
              ease: "none",
              duration: 0.14,
            },
            0.54
          );
          // Slide down out (0% → 100%) and fade out as Card 2 exits
          tl.to(
            title2,
            {
              yPercent: 100,
              ease: "none",
              duration: 0.14,
            },
            0.75
          );
          tl.to(
            title2,
            {
              opacity: 0,
              ease: "none",
              duration: 0.10,
            },
            0.79
          );
        }
        if (img2) {
          tl.to(
            img2,
            {
              y: 28,
              scale: 1.12,
              ease: "none",
              duration: 0.25,
            },
            0.56
          );
        }

        // Card 3 (Step 04):
        const card3 = cards[3];
        const title3 = card3?.querySelector(".process-title");
        const step3 = card3?.querySelector(".process-step");
        const img3 = card3?.querySelector(".img-process-wrap");
        if (step3) {
          tl.to(
            step3,
            {
              opacity: 1,
              ease: "power1.out",
              duration: 0.08,
            },
            0.77
          );
        }
        if (title3) {
          // Slide in from top (-100% → 0%) into Card 3 center box and settle
          tl.to(
            title3,
            {
              yPercent: 0,
              ease: "none",
              duration: 0.15,
            },
            0.77
          );
        }
        if (img3) {
          tl.to(
            img3,
            {
              y: 28,
              scale: 1.12,
              ease: "none",
              duration: 0.20,
            },
            0.79
          );
        }
      });

      // ────────────────────────────────────────────────────────
      // TABLET / MOBILE (< 992px) — Clean Reveal Animations
      // ────────────────────────────────────────────────────────
      mm.add("(max-width: 991px)", () => {
        gsap.set([titleSection, listWrap], { clearProps: "all" });
        const cards = gsap.utils.toArray(
          listWrap.querySelectorAll(".single-process-wrap")
        );
        cards.forEach((card) => {
          const title = card.querySelector(".process-title");
          const step = card.querySelector(".process-step");
          const imgWrap = card.querySelector(".img-process-wrap");
          gsap.set([card, title, step, imgWrap], { clearProps: "all" });
          gsap.fromTo(
            card,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
              },
            }
          );
        });
      });
    }, sectionRef);

    const timer = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section className="main-section process-section" id="process" ref={sectionRef}>
      <div className="w-layout-blockcontainer main-container process-section w-container">
        {/* Scroll track — height: 300vh */}
        <div className="process-scroll secondary" ref={scrollRef}>
          {/* Sticky content wrapper pinned while scrolling */}
          <div className="process-content-wrapper" ref={contentWrapperRef}>
            {/* Header: Tag, Title, Description */}
            <div className="process-title-section" ref={titleSectionRef}>
              <div className="element-wrap">
                <div data-wf--tag-section--variant="base" className="tag-wrap">
                  <div className="tag-icon">
                    <GrainIcon className="text-xs icon" />
                  </div>
                  <div className="tag-text">
                    <div className="tag-title">How we deliver</div>
                  </div>
                </div>
              </div>
              <div className="title-wrap center">
                <h2 className="text-xl">A proven path to cleaner performance.</h2>
              </div>
              <div className="element-overflow">
                <div className="description-wrap center">
                  <div className="text-xs">
                    Every installation follows a rigorous engineering lifecycle that maximizes solar harvesting, guarantees grid compliance, and delivers enduring performance backed by intelligent monitoring.
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Content Wrap containing the Cards List */}
            <div className="bottom-content-wrap">
              <div className="process-list-wrap" ref={listWrapRef}>
                {PROCESS_STEPS.map((step) => {
                  const isNormal = step.layout === "normal";
                  return (
                    <div key={step.id} className="single-process-wrap">
                      {isNormal ? (
                        <>
                          {/* 1. Step Number (Left) */}
                          <div className={`number-process ${step.numBorderClass}`}>
                            <div className={`process-step ${step.stepClass}`}>
                              <div className="text-ms">{step.stepNum}</div>
                            </div>
                          </div>

                          {/* 2. Text Content (Center) */}
                          <div className={`process-title ${step.titleClass}`}>
                            <div className="process-title-wrap">
                              <div className="process-titles">{step.category}</div>
                              <div className="desc-process-card">
                                <h3 className="process-step-title">{step.title}</h3>
                              </div>
                            </div>
                          </div>

                          {/* 3. Image (Right) */}
                          <div className="process-img-desc flip">
                            <div className="process-image">
                              <div className={`img-process-wrap ${step.imgWrapClass}`}>
                                <img
                                  src={step.image}
                                  loading="lazy"
                                  alt={step.alt}
                                  className="img-process"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* 1. Image (Left) */}
                          <div className="process-img-desc flip">
                            <div className="process-image">
                              <div className={`img-process-wrap ${step.imgWrapClass}`}>
                                <img
                                  src={step.image}
                                  loading="lazy"
                                  alt={step.alt}
                                  className="img-process"
                                />
                              </div>
                            </div>
                          </div>

                          {/* 2. Text Content (Center) */}
                          <div className={`process-title ${step.titleClass}`}>
                            <div className="process-title-wrap">
                              <div className="process-titles">{step.category}</div>
                              <div className="desc-process-card">
                                <h3 className="process-step-title">{step.title}</h3>
                              </div>
                            </div>
                          </div>

                          {/* 3. Step Number (Right) */}
                          <div className={`number-process ${step.numBorderClass}`}>
                            <div className={`process-step ${step.stepClass}`}>
                              <div className="text-ms">{step.stepNum}</div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mobile swipe indicator */}
              <div className="swipe-indicator-wrap">
                <div className="swipe-indicator-line-wrap">
                  <div className="swipe-indicator-line"></div>
                </div>
                <div className="swipe-icon">swipe</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
