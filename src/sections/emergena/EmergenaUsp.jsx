import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GrainIcon } from "./EmergenaIcons";

gsap.registerPlugin(ScrollTrigger);

export default function EmergenaUsp() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const pinRef = useRef(null);
  const tagRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);

  // 4 Corner cards
  const card1Ref = useRef(null); // left-up (Solar streetlight)
  const card2Ref = useRef(null); // left-bottom (Wind turbine)
  const card3Ref = useRef(null); // right-up (Solar array tilted)
  const card4Ref = useRef(null); // right-bottom (Spiral staircase)

  // 4 Connecting dashed lines
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const line4Ref = useRef(null);

  // 4 Stat badge cards
  const stats1Ref = useRef(null);
  const stats2Ref = useRef(null);
  const stats3Ref = useRef(null);
  const stats4Ref = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!section || !track || !pin) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 1. Desktop & Tablet Scroll Experience (min-width: 992px)
      // Exactly replicated from Webflow IX3 interaction timeline t-6f3f6be4 & trigger i-c2a1c85e
      mm.add("(min-width: 992px)", () => {
        const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current].filter(Boolean);
        const leftLines = [line1Ref.current, line2Ref.current].filter(Boolean);
        const rightLines = [line3Ref.current, line4Ref.current].filter(Boolean);
        const allStats = [stats1Ref.current, stats2Ref.current, stats3Ref.current, stats4Ref.current].filter(Boolean);

        // Webflow t-6f3f6be4 initial states at pos 0:
        // Titles setup
        gsap.set(title1Ref.current, { yPercent: 0, opacity: 1, force3D: true });
        gsap.set(title2Ref.current, { yPercent: 0, opacity: 0, force3D: true });

        // Action 0: Stats & lines initially transparent & scaled to 0
        gsap.set(leftLines, { scaleX: 0, opacity: 0, transformOrigin: "0% 50%" });
        gsap.set(rightLines, { scaleX: 0, opacity: 0, transformOrigin: "100% 50%" });
        gsap.set(allStats, { scale: 0, opacity: 0, transformOrigin: "50% 50%" });

        // Actions 1-4: 4 cards start scaled to 0.2, opacity 0, with exact Webflow coordinate offsets
        gsap.set(cards, { scale: 0.2, opacity: 0, force3D: true });
        if (card1Ref.current) gsap.set(card1Ref.current, { x: "-15vw", y: "25vw" });
        if (card2Ref.current) gsap.set(card2Ref.current, { x: "45vw", y: "10vw" });
        if (card3Ref.current) gsap.set(card3Ref.current, { x: "-40vw", y: "-6vw" });
        if (card4Ref.current) gsap.set(card4Ref.current, { x: "12vw", y: "-20vw" });

        // Scrubbed Scroll Timeline linked to the 300vh track matching Webflow t-6f3f6be4
        // Trigger: .usp-home-scroll, Start: clamp(top bottom), End: clamp(bottom center), Scrub: 1
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: track,
            start: "clamp(top bottom)",
            end: "clamp(bottom center)",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Action 5 (pos: 0, dur: 0.25, ease: none): 4 cards fade in and scale from 0.2 to 1.0
        tl.to(
          cards,
          {
            scale: 1,
            opacity: 1,
            duration: 0.25,
            ease: "none",
          },
          0
        );

        // Actions 6-13 (pos: 0, dur: 0.37): 4 cards glide smoothly into corners with Webflow bezier curve eases
        // Card 1: left-up (Solar streetlight) -> ease: power1.in (x), power1.out (y)
        if (card1Ref.current) {
          tl.to(card1Ref.current, { x: "0vw", duration: 0.37, ease: "power1.in" }, 0);
          tl.to(card1Ref.current, { y: "0vw", duration: 0.37, ease: "power1.out" }, 0);
        }
        // Card 2: left-bottom (Wind turbine) -> ease: power1.out (x), power1.in (y)
        if (card2Ref.current) {
          tl.to(card2Ref.current, { x: "0vw", duration: 0.37, ease: "power1.out" }, 0);
          tl.to(card2Ref.current, { y: "0vw", duration: 0.37, ease: "power1.in" }, 0);
        }
        // Card 3: right-up (Solar array tilted) -> ease: power1.out (x), power1.in (y)
        if (card3Ref.current) {
          tl.to(card3Ref.current, { x: "0vw", duration: 0.37, ease: "power1.out" }, 0);
          tl.to(card3Ref.current, { y: "0vw", duration: 0.37, ease: "power1.in" }, 0);
        }
        // Card 4: right-bottom (Spiral staircase) -> ease: power1.in (x), power1.out (y)
        if (card4Ref.current) {
          tl.to(card4Ref.current, { x: "0vw", duration: 0.37, ease: "power1.in" }, 0);
          tl.to(card4Ref.current, { y: "0vw", duration: 0.37, ease: "power1.out" }, 0);
        }

        // Actions 16-17 (pos: 0.38, dur: 0.10, ease: none): Connecting dashed lines expand from images outward
        if (leftLines.length) {
          tl.fromTo(
            leftLines,
            { scaleX: 0, opacity: 0, transformOrigin: "0% 50%" },
            { scaleX: 1, opacity: 1, duration: 0.1, ease: "none" },
            0.38
          );
        }
        if (rightLines.length) {
          tl.fromTo(
            rightLines,
            { scaleX: 0, opacity: 0, transformOrigin: "100% 50%" },
            { scaleX: 1, opacity: 1, duration: 0.1, ease: "none" },
            0.38
          );
        }

        // Action 18 (pos: 0.48, dur: 0.10, ease: none): Telemetry stat cards pop into view
        if (allStats.length) {
          tl.fromTo(
            allStats,
            { scale: 0, opacity: 0, transformOrigin: "50% 50%" },
            { scale: 1, opacity: 1, duration: 0.1, ease: "none" },
            0.48
          );
        }

        // Actions 14-15 (pos: 0.68, dur: 0.10, ease: none): Center Title Morph
        // Title 1 slides UP out of view and fades out
        if (title1Ref.current) {
          tl.to(
            title1Ref.current,
            {
              yPercent: -100,
              opacity: 0,
              duration: 0.1,
              ease: "none",
            },
            0.68
          );
        }
        // Title 2 slides UP into view from below and fades in
        if (title2Ref.current) {
          tl.fromTo(
            title2Ref.current,
            { yPercent: 0, opacity: 0 },
            {
              yPercent: -100,
              opacity: 1,
              duration: 0.1,
              ease: "none",
            },
            0.68
          );
        }

        // Action hold (pos: 0.78, dur: 0.22): Holds completed state for reading until canvasDuration: 1.00
        tl.to({}, { duration: 0.22 }, 0.78);
      });

      // 2. Mobile Experience (< 992px)
      // Corresponds to Webflow mobile interaction t-02c7ef0e
      mm.add("(max-width: 991px)", () => {
        // Mobile layout: Title 1 visible, Title 2 hidden
        gsap.set(title1Ref.current, { yPercent: 0, opacity: 1, position: "relative" });
        gsap.set(title2Ref.current, { display: "none" });

        const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current].filter(Boolean);
        const images = cards.map((c) => c?.querySelector(".img-usp-overflow")).filter(Boolean);
        const lines = cards.map((c) => c?.querySelector(".line-usp")).filter(Boolean);
        const stats = cards.map((c) => c?.querySelector(".usp-stats")).filter(Boolean);

        // Clear any desktop inline transform overrides
        gsap.set(cards, { clearProps: "all" });

        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: pin, // .usp-home-wrap
            start: "top bottom",
            end: "bottom top",
            once: true,
          },
        });

        if (images.length) {
          mobileTl.fromTo(
            images,
            { xPercent: -100 },
            {
              xPercent: 0,
              duration: 0.75,
              stagger: 0.15,
              ease: "power2.out",
            },
            0
          );
        }

        if (lines.length) {
          mobileTl.fromTo(
            lines,
            { scaleX: 0, transformOrigin: "0% 50%" },
            {
              scaleX: 1,
              duration: 0.4,
              stagger: 0.15,
              ease: "none",
            },
            0.61
          );
        }

        if (stats.length) {
          mobileTl.fromTo(
            stats,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.4,
              stagger: 0.15,
              ease: "none",
            },
            1.09
          );
        }
      });
    }, section);

    // Refresh ScrollTrigger after any assets or fonts finish settling
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="main-section usp" id="usp">
      <div className="w-layout-blockcontainer main-container w-container">
        {/* Scroll Track: Provides 300vh scroll space on desktop */}
        <div ref={trackRef} className="usp-home-scroll">
          {/* Viewport Sticky Container: Stays pinned at top: 0 while scrolling through track */}
          <div ref={pinRef} className="usp-home">
            <div className="usp-home-wrap">
              {/* Central Title */}
              <div className="usp-section-title">
                <div className="element-wrap" ref={tagRef}>
                  <div data-wf--tag-section--variant="base" className="tag-wrap">
                    <div className="tag-icon">
                      <GrainIcon className="text-xs icon" />
                    </div>
                    <div className="tag-text">
                      <div className="tag-title">Live data. Better decisions.</div>
                    </div>
                  </div>
                </div>

                <div className="title-change">
                  {/* Title 1: Initial state */}
                  <div ref={title1Ref} title="middle" className="usp-title-wrap">
                    <h2 className="text-xl">See performance as it happens</h2>
                  </div>
                  {/* Title 2: Revealed on scroll */}
                  <div ref={title2Ref} title="bottom" className="usp-title-wrap secondary">
                    <h2 className="text-xl">Technology that makes impact visible</h2>
                  </div>
                </div>
              </div>

              {/* Card 1: Top Left (Inverter Peak Efficiency) */}
              <div ref={card1Ref} className="usp-card left-up">
                <div className="img-usp-overflow">
                  <div className="img-usp-wrapper">
                    <img
                      src="/images/usp/usp_01.webp"
                      loading="lazy"
                      alt="Cathode Power high-efficiency solar inverter displaying real-time generation metrics."
                      className="img-usp"
                    />
                  </div>
                </div>
                <div ref={line1Ref} line="left" className="line-usp" />
                <div ref={stats1Ref} className="usp-stats">
                  <div className="stats-number-wrap">
                    <div className="stats-number">98.8%</div>
                  </div>
                  <div className="stats-title-wrap">
                    <div className="stats-title">Peak Efficiency</div>
                  </div>
                </div>
              </div>

              {/* Card 2: Bottom Left (Carbon Reduction / Eco Architecture) */}
              <div ref={card2Ref} className="usp-card left-bottom">
                <div className="img-usp-overflow">
                  <div className="img-usp-wrapper">
                    <img
                      src="/images/usp/usp_02.webp"
                      loading="lazy"
                      alt="Modern eco-friendly architecture with rooftop solar panels reducing carbon emissions."
                      className="img-usp"
                    />
                  </div>
                </div>
                <div ref={line2Ref} line="left" className="line-usp" />
                <div ref={stats2Ref} className="usp-stats">
                  <div className="stats-number-wrap full">
                    <div className="stats-number">45,000+ t</div>
                  </div>
                  <div className="stats-title-wrap">
                    <div className="stats-title">CO₂ Avoided</div>
                  </div>
                </div>
              </div>

              {/* Card 3: Top Right (Clean Solar Energy Harvest) */}
              <div ref={card3Ref} className="usp-card right-up">
                <div className="img-usp-overflow">
                  <div className="img-usp-wrapper">
                    <img
                      src="/images/usp/usp_03.webp"
                      loading="lazy"
                      alt="Large commercial and industrial rooftop solar PV array generating clean power."
                      className="img-usp"
                    />
                  </div>
                </div>
                <div ref={line3Ref} line="right" className="line-usp" />
                <div ref={stats3Ref} className="usp-stats">
                  <div className="stats-number-wrap">
                    <div className="stats-number">350+ GWh</div>
                  </div>
                  <div className="stats-title-wrap">
                    <div className="stats-title">Energy Generated</div>
                  </div>
                </div>
              </div>

              {/* Card 4: Bottom Right (Active Inverter Fleet & Deployments) */}
              <div ref={card4Ref} className="usp-card right-bottom">
                <div className="img-usp-overflow">
                  <div className="img-usp-wrapper">
                    <img
                      src="/images/usp/usp_04.webp"
                      loading="lazy"
                      alt="Commercial solar installation with grid-tied Cathode Power inverters."
                      className="img-usp"
                    />
                  </div>
                </div>
                <div ref={line4Ref} line="right" className="line-usp" />
                <div ref={stats4Ref} className="usp-stats">
                  <div className="stats-number-wrap">
                    <div className="stats-number">15,000+</div>
                  </div>
                  <div className="stats-title-wrap">
                    <div className="stats-title">Active Systems</div>
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
