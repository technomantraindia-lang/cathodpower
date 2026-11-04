import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GrainIcon, EcoIcon, ForestIcon, BoltIcon, HubIcon } from "./EmergenaIcons";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    icon: EcoIcon,
    value: 31,
    decimals: 0,
    suffix: "%",
    title: "Emissions reduced",
  },
  {
    icon: ForestIcon,
    value: 6.2,
    decimals: 1,
    suffix: "M",
    title: "Tonnes offset",
  },
  {
    icon: BoltIcon,
    value: 17,
    decimals: 0,
    suffix: "Days",
    title: "To first savings",
  },
  {
    icon: HubIcon,
    value: 140,
    decimals: 0,
    suffix: "+",
    title: "Sites deployed",
  },
];

export default function EmergenaAboutCounters() {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const descRef = useRef(null);
  const separatorRef = useRef(null);
  const cardsRef = useRef([]);
  const iconBadgesRef = useRef([]);
  const numberElsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reset numbers initially so they count up from 0
    STATS.forEach((stat, index) => {
      const el = numberElsRef.current[index];
      if (el) el.textContent = stat.decimals > 0 ? (0).toFixed(stat.decimals) : "0";
    });

    const ctx = gsap.context(() => {
      // 1. Webflow t-cf9c9a75 intro timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      // Header Tag badge slides up with back.out(1.7)
      if (tagRef.current) {
        tl.fromTo(
          tagRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "back.out(1.7)",
          }
        );
      }

      // Manifesto description slides up with smooth power3.out
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.5"
        );
      }

      // Separator line draws smoothly across from left to right
      if (separatorRef.current) {
        tl.fromTo(
          separatorRef.current,
          { scaleX: 0, transformOrigin: "0% 50%" },
          {
            scaleX: 1,
            duration: 1.0,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      // Circular icon badges pop in with elastic bounce
      const validIcons = iconBadgesRef.current.filter(Boolean);
      if (validIcons.length) {
        tl.fromTo(
          validIcons,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.55"
        );
      }

      // Counter items entrance
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length) {
        tl.fromTo(
          validCards,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power2.out",
          },
          "<"
        );
      }

      // 2. Dynamic decimal-accurate rolling count-ups (Webflow script emulation)
      STATS.forEach((stat, index) => {
        const el = numberElsRef.current[index];
        if (!el) return;

        const obj = { val: 0 };
        tl.to(
          obj,
          {
            val: stat.value,
            duration: 2.8,
            delay: index * 0.15,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent =
                stat.decimals > 0
                  ? obj.val.toFixed(stat.decimals)
                  : Math.round(obj.val);
            },
            onComplete: () => {
              el.textContent =
                stat.decimals > 0
                  ? stat.value.toFixed(stat.decimals)
                  : stat.value;
            },
          },
          "<"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="main-section dark" id="about">
      <div className="w-layout-blockcontainer main-container about w-container">
        <div className="about-scroll">
          <div className="about-content-wrapper">
            {/* Top Manifesto Header */}
            <div className="top-content-wrap about-section">
              <div className="tag-about" ref={tagRef}>
                <div
                  data-wf--tag-section--variant="light"
                  className="tag-wrap w-variant-845cec6c-c1d0-4fc7-e96a-3c90cde403cf"
                >
                  <div className="tag-icon w-variant-845cec6c-c1d0-4fc7-e96a-3c90cde403cf">
                    <GrainIcon className="text-xs icon" />
                  </div>
                  <div className="tag-text w-variant-845cec6c-c1d0-4fc7-e96a-3c90cde403cf">
                    <div className="tag-title">Who we are</div>
                  </div>
                </div>
              </div>
              <div className="desc-about-company" ref={descRef}>
                <h2 className="text-l">
                  We partner with industries, farms, and commercial operators to deliver practical clean-energy solutions that reduce emissions, improve efficiency, and support long-term growth.
                </h2>
              </div>
            </div>

            {/* Animated Horizontal Separator Line */}
            <div ref={separatorRef} className="separator-line" />

            {/* 4 Interactive Counter Cards Grid */}
            <div className="about-counter">
              <div className="about-number-wrap">
                <div className="number-group-wrap">
                  {STATS.map((stat, idx) => {
                    const IconComponent = stat.icon;
                    return (
                      <div
                        key={stat.title}
                        className="number-card-wrap"
                      >
                        <div
                          className="number-icon"
                          ref={(el) => (iconBadgesRef.current[idx] = el)}
                        >
                          <div className="bg-counter" />
                          <div className="icon-counter-wrap">
                            <IconComponent className="icon-counter" />
                          </div>
                        </div>
                        <div
                          data-wf--counter--variant="base"
                          className="counter-item"
                          ref={(el) => (cardsRef.current[idx] = el)}
                        >
                          <div className="number-suffix-wrap">
                            <div className="number-text">
                              <div
                                className="counter-number"
                                ref={(el) => (numberElsRef.current[idx] = el)}
                              >
                                {stat.decimals > 0 ? (0).toFixed(stat.decimals) : "0"}
                              </div>
                            </div>
                            <div className="suffix-text">
                              <div className="text-m">{stat.suffix}</div>
                            </div>
                          </div>
                          <div className="counter-title">
                            <div className="text-sm">{stat.title}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
