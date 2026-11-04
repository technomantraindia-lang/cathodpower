import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GrainIcon } from "./EmergenaIcons";

gsap.registerPlugin(ScrollTrigger);

export default function EmergenaPrinciples() {
  const sectionRef = useRef(null);
  const tagWrapRef = useRef(null);
  const titleTextRef = useRef(null);
  const leftColRef = useRef(null);
  const middleColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Main scroll-triggered entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 76%",
          once: true,
        },
      });

      // 1. Tag pill entrance
      if (tagWrapRef.current) {
        tl.fromTo(
          tagWrapRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: "power2.out" }
        );
      }

      // 2. Headline masked reveal (slides up from beneath its overflow-hidden mask)
      if (titleTextRef.current) {
        tl.fromTo(
          titleTextRef.current,
          { y: "115%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.95, ease: "power3.out" },
          "-=0.4"
        );
      }

      // 3. Center image card expanding vertical reveal and scale-down
      const middleCard = middleColRef.current?.querySelector(".img-card-middle");
      const middleImg = middleColRef.current?.querySelector(".img-principle");

      if (middleCard) {
        tl.fromTo(
          middleCard,
          {
            clipPath: "inset(18% 0% 18% 0% round 16px)",
            opacity: 0,
            scale: 0.95,
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 16px)",
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power2.out",
          },
          "-=0.5"
        );
      }

      if (middleImg) {
        tl.fromTo(
          middleImg,
          { scale: 1.25 },
          { scale: 1, duration: 1.25, ease: "power2.out" },
          "<"
        );
      }

      // 4. Left cards slide in from the left with staggered depth
      const leftCards = leftColRef.current?.querySelectorAll(".single-principal-wrap");
      if (leftCards && leftCards.length) {
        tl.fromTo(
          leftCards,
          {
            x: -85,
            y: 15,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.16,
            ease: "power3.out",
          },
          "-=0.85"
        );
      }

      // 5. Right cards slide in from the right with staggered depth
      const rightCards = rightColRef.current?.querySelectorAll(".single-principal-wrap");
      if (rightCards && rightCards.length) {
        tl.fromTo(
          rightCards,
          {
            x: 85,
            y: 15,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.16,
            ease: "power3.out",
          },
          "<"
        );
      }

      // 6. Number badges pop in with spring elasticity
      const badges = section.querySelectorAll(".principal-number");
      if (badges.length) {
        tl.fromTo(
          badges,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(2.2)",
          },
          "-=0.5"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="main-section principles" id="principles">
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="principles-content-wrapper">
          <div className="principles-content">
            {/* Header with masked title */}
            <div className="top-content-wrap vertical guiding-standard-section">
              <div className="element-overflow">
                <div ref={tagWrapRef} className="element-wrap">
                  <div data-wf--tag-section--variant="base" className="tag-wrap">
                    <div className="tag-icon">
                      <GrainIcon className="text-xs icon" />
                    </div>
                    <div className="tag-text">
                      <div className="tag-title">Guiding standards</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title masked by overflow: hidden */}
              <div className="element-overflow" style={{ overflow: "hidden", display: "inline-block" }}>
                <div className="title-wrap guiding-standard">
                  <h2 ref={titleTextRef} className="text-xl" style={{ margin: 0, display: "block" }}>
                    How we deliver lasting impact.
                  </h2>
                </div>
              </div>
            </div>

            <div className="principles-wrap">
              {/* Left Column (01 & 02) */}
              <div ref={leftColRef} card="left" className="principles-list-wrap">
                <div className="single-principal-wrap odd">
                  <div className="principal-content-list">
                    <div className="principal-number-title">
                      <div className="principal-number">
                        <div className="number-card">01</div>
                      </div>
                      <div className="principal-title">
                        <div className="text-s">Dual MPPT Precision</div>
                      </div>
                    </div>
                  </div>
                  <div className="description-wrap">
                    <div className="text-xs">
                      Independent multi-channel tracking optimizes split roof angles and shaded arrays, unlocking up to 30% higher lifetime harvest.
                    </div>
                  </div>
                </div>

                <div className="single-principal-wrap even">
                  <div className="principal-content-list">
                    <div className="principal-number-title">
                      <div className="principal-number">
                        <div className="number-card">02</div>
                      </div>
                      <div className="principal-title">
                        <div className="text-s">Indigenous Manufacturing</div>
                      </div>
                    </div>
                  </div>
                  <div className="description-wrap">
                    <div className="text-xs">
                      Engineered in India for local grid dynamics, severe voltage fluctuations, and strict BIS & MNRE compliance standards.
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Column (Vertical Solar Photo) */}
              <div ref={middleColRef} className="card-middle">
                <div className="img-card-middle-wrap">
                  <div className="img-card-middle" style={{ overflow: "hidden", borderRadius: "16px" }}>
                    <img
                      src="/images/principles_solar_center.webp"
                      loading="eager"
                      alt="Modern commercial and industrial solar photovoltaic array under bright clear sky."
                      className="img-principle"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column (03 & 04) */}
              <div ref={rightColRef} card="right" className="principles-list-wrap">
                <div className="single-principal-wrap odd">
                  <div className="principal-content-list">
                    <div className="principal-number-title">
                      <div className="principal-number">
                        <div className="number-card">03</div>
                      </div>
                      <div className="principal-title">
                        <div className="text-s">Thermal & IP66 Armor</div>
                      </div>
                    </div>
                  </div>
                  <div className="description-wrap">
                    <div className="text-xs">
                      Patented natural heat dissipation maintains sub-50°C junction operation, sealed in IP66 aluminum against heavy monsoons.
                    </div>
                  </div>
                </div>

                <div className="single-principal-wrap last">
                  <div className="principal-content-list">
                    <div className="principal-number-title">
                      <div className="principal-number">
                        <div className="number-card">04</div>
                      </div>
                      <div className="principal-title">
                        <div className="text-s">Intelligent Solar Cloud</div>
                      </div>
                    </div>
                  </div>
                  <div className="description-wrap">
                    <div className="text-xs">
                      Real-time IoT telemetry, AI generation analytics, and automated fault alerts guarantee maximum uptime and enduring ROI.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
