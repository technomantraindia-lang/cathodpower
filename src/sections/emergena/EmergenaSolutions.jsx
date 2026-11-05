import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GrainIcon } from "./EmergenaIcons";

gsap.registerPlugin(ScrollTrigger);

export default function EmergenaSolutions() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !header || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Create the Webflow t-b41a1c11 timeline triggered on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      // 1. Staggered reveal of header elements: tag badge, h2 title, description
      const tag = header.querySelector(".element-wrap");
      const title = header.querySelector(".title-wrap");
      const desc = header.querySelector(".description-wrap");

      tl.fromTo(
        [tag, title, desc],
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
        }
      );

      // 2. Animate the solution cards sliding up into place
      tl.fromTo(
        cards,
        {
          y: 45,
          opacity: 0,
          scale: 0.98,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // 3. Top accent border drawing in across each card
      const borders = section.querySelectorAll(".border-card-solution");
      if (borders.length) {
        tl.fromTo(
          borders,
          {
            scaleX: 0,
            transformOrigin: "0% 50%",
          },
          {
            scaleX: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.5"
        );
      }

      // 4. Subtle zoom reveal on card images
      const images = section.querySelectorAll(".solution-image img");
      if (images.length) {
        tl.fromTo(
          images,
          {
            scale: 1.12,
            opacity: 0.85,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.55"
        );
      }

      // 5. Card text elements fade in
      const cardTexts = section.querySelectorAll(".solution-number, .title-solution-card, .description-solution");
      if (cardTexts.length) {
        tl.fromTo(
          cardTexts,
          {
            y: 12,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.03,
            ease: "power2.out",
          },
          "-=0.6"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="main-section" id="solutions">
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="solutions-content-wrapper">
          {/* Header */}
          <div ref={headerRef} className="top-content-wrap solutions">
            <div className="element-wrap">
              <div data-wf--tag-section--variant="base" className="tag-wrap">
                <div className="tag-icon">
                  <GrainIcon className="text-xs icon" />
                </div>
                <div className="tag-text">
                  <div className="tag-title">Three connected disciplines</div>
                </div>
              </div>
            </div>
            <div className="title-wrap center">
              <h2 className="text-xl">We drive sustainable performance.</h2>
            </div>
            <div className="description-wrap center">
              <div className="text-xs">
                We combine renewable energy, intelligent monitoring, and sustainable energy storage to help businesses
                improve efficiency, lower emissions, and maximize long-term performance.
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="bottom-content-wrap discipline-section">
            <div className="solution-group-wrap">
              {/* Card 01 */}
              <div
                ref={(el) => (cardsRef.current[0] = el)}
                className="solution-card-wrap"
              >
                <div className="border-card-solution" />
                <div className="title-card-solution">
                  <div className="solution-number">
                    <div id="text-xs" className="text-tag size-s">
                      01 GREENER
                    </div>
                  </div>
                  <div className="wrapper-text-card">
                    <div className="title-solution-card">
                      <div className="text-ms">Flexible &amp; Scalable for Any Scenario</div>
                    </div>
                    <div className="description-solution">
                      <div className="text-xs">
                        Seamlessly integrates with grid-tied, microgrid, solar-storage-charging, and solar-storage-diesel systems, ensuring uninterrupted power for diverse business needs.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="solution-image-wrap">
                  <div className="solution-image">
                    <div className="gradient-wrap" />
                    <img
                      src="/images/forest.webp"
                      loading="eager"
                      alt="Flexible & Scalable - Greener energy landscape"
                      className="image"
                    />
                  </div>
                </div>
                <div className="bg-card-solutions" />
              </div>

              {/* Card 02 */}
              <div
                ref={(el) => (cardsRef.current[1] = el)}
                className="solution-card-wrap"
              >
                <div className="border-card-solution" />
                <div className="title-card-solution">
                  <div className="solution-number">
                    <div id="text-xs" className="text-tag size-s">
                      02, SUSTAINABLE
                    </div>
                  </div>
                  <div className="wrapper-text-card">
                    <div className="title-solution-card">
                      <div className="text-ms">AI-Driven Efficiency &amp; Cost Savings</div>
                    </div>
                    <div className="description-solution">
                      <div className="text-xs">
                        Optimizes energy use with AI-powered weather forecasting, load analysis, and dynamic tariff tracking, automatically adjusting to maximize efficiency and reduce electricity costs.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="solution-image-wrap">
                  <div className="solution-image">
                    <div className="gradient-wrap" />
                    <img
                      src="/images/newimages/An_ultra_realistic_202604231257.webp"
                      loading="eager"
                      alt="Sustainable - AI-driven rooftop solar installation"
                      className="image"
                    />
                  </div>
                </div>
                <div className="bg-card-solutions" />
              </div>

              {/* Card 03 */}
              <div
                ref={(el) => (cardsRef.current[2] = el)}
                className="solution-card-wrap"
              >
                <div className="border-card-solution" />
                <div className="title-card-solution">
                  <div className="solution-number">
                    <div id="text-xs" className="text-tag size-s">
                      03, TOMORROW
                    </div>
                  </div>
                  <div className="wrapper-text-card">
                    <div className="title-solution-card">
                      <div className="text-ms">Reliable &amp; Secure Energy Management</div>
                    </div>
                    <div className="description-solution">
                      <div className="text-xs">
                        Equipped with advanced battery protection, real-time monitoring, and intelligent fault diagnostics, delivering stable, secure, and long-term energy reliability for businesses.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="solution-image-wrap">
                  <div className="solution-image">
                    <div className="gradient-wrap" />
                    <img
                      src="/images/mountain.webp"
                      loading="eager"
                      alt="Tomorrow - Reliable & Secure Energy Management"
                      className="image"
                    />
                  </div>
                </div>
                <div className="bg-card-solutions" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
