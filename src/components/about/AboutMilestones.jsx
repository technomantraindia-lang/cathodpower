import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutMilestones.css";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: "2021",
    title: "Foundation",
    text: "Cathode Power was established with a clear mission — engineer solar inverters built for Indian grid conditions, not adapted from other markets.",
  },
  {
    year: "2022",
    title: "Product Expansion",
    text: "Expanded the on-grid portfolio across residential and commercial ranges, strengthening field reliability and EPC partnerships nationwide.",
  },
  {
    year: "2023",
    title: "Hybrid & Storage",
    text: "Launched hybrid platforms and LiFePO4 BESS architectures for backup-ready solar systems with intelligent energy management.",
  },
  {
    year: "2024",
    title: "Smart Monitoring",
    text: "Scaled Solar View monitoring and cloud telemetry so EPCs and homeowners can track performance in real time, anywhere.",
  },
  {
    year: "2025",
    title: "Manufacturing Growth",
    text: "Advanced precision manufacturing capacity and quality systems to deliver consistent, high-efficiency inverters at scale.",
  },
  {
    year: "2026",
    title: "Next Chapter",
    text: "Continuing to build future-ready platforms for hybrid, storage, and next-generation solar ecosystems across India.",
  },
];

export default function AboutMilestones() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const active = useMemo(
    () => MILESTONES[activeIndex] ?? MILESTONES[0],
    [activeIndex]
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const nodes = gsap.utils.toArray(".am__node", section);
    const total = MILESTONES.length;
    const maxIndex = total - 1;

    const setActive = (index) => {
      const next = gsap.utils.clamp(0, maxIndex, index);
      if (next === activeIndexRef.current) return;
      activeIndexRef.current = next;
      setActiveIndex(next);

      nodes.forEach((node, i) => {
        node.classList.toggle("is-active", i === next);
      });
    };

    const ctx = gsap.context(() => {
      // Center first node initially
      const getShiftForIndex = (index) => {
        const trackWidth = track.offsetWidth;
        const node = nodes[index];
        if (!node) return 0;
        const nodeCenter = node.offsetLeft + node.offsetWidth / 2;
        return trackWidth / 2 - nodeCenter;
      };

      gsap.set(track, { x: getShiftForIndex(0) });
      setActive(0);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(2200, total * 520)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * maxIndex);
            setActive(idx);
          },
        },
      });

      // Move track so each year centers as you scroll
      for (let i = 1; i <= maxIndex; i += 1) {
        tl.to(
          track,
          {
            x: () => getShiftForIndex(i),
            duration: 1,
          },
          i - 1
        );
      }

      // Soft parallax on background
      gsap.fromTo(
        section,
        { backgroundPosition: "50% 40%" },
        {
          backgroundPosition: "50% 60%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  const goTo = (index) => {
    const section = sectionRef.current;
    if (!section) return;
    const st = ScrollTrigger.getAll().find((t) => t.trigger === section);
    if (!st) return;
    const maxIndex = MILESTONES.length - 1;
    const progress = gsap.utils.clamp(0, 1, index / maxIndex);
    const targetY = st.start + (st.end - st.start) * progress;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="am"
      id="milestones"
      aria-label="Our milestones"
      style={{ backgroundImage: "url(/images/mountain.webp)" }}
    >
      <div className="am__overlay" aria-hidden="true" />

      <div className="am__inner">
        <h2 className="am__title">
          <span>Our</span> Milestones
        </h2>

        <div className="am__timeline">
          <button
            type="button"
            className="am__nav am__nav--prev"
            aria-label="Previous milestone"
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex <= 0}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 6 9 12l6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="am__viewport">
            <div className="am__line" aria-hidden="true" />
            <div className="am__track" ref={trackRef}>
              {MILESTONES.map((item, index) => (
                <button
                  key={`${item.year}-${index}`}
                  type="button"
                  className={`am__node${index === activeIndex ? " is-active" : ""}`}
                  onClick={() => goTo(index)}
                  aria-label={`Milestone ${item.year}`}
                  aria-pressed={index === activeIndex}
                >
                  <span className="am__node-circle">{item.year}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="am__nav am__nav--next"
            aria-label="Next milestone"
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex >= MILESTONES.length - 1}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="m9 6 6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="am__detail" key={active.year}>
          <div className="am__detail-year">{active.year}</div>
          <div className="am__detail-copy">
            <h3>{active.title}</h3>
            <p>{active.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
