import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutMilestones.css";

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: "2018",
    title: "The Idea",
    text: "It started with a question — why not build better? What began as an idea became a journey of research and determination for India’s unique energy needs.",
  },
  {
    year: "2021",
    title: "Foundation",
    text: "Cathode Power was established to engineer solar inverters designed for Indian conditions — not adapted from other markets.",
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
    text: "Advanced our 26,000 sq. ft. manufacturing capability and quality systems to deliver dependable energy solutions at scale.",
  },
  {
    year: "2026",
    title: "The Road Ahead",
    text: "From smarter solar inverters to evolving energy storage, our pursuit of innovation continues beyond today’s possibilities.",
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
      aria-label="Our story"
      style={{ backgroundImage: "url(/images/mountain.webp)" }}
    >
      <div className="am__overlay" aria-hidden="true" />

      <div className="am__inner">
        <p className="am__kicker">OUR STORY</p>
        <h2 className="am__title">
          Every Milestone Has a Story. <span>Ours Is Just Getting Started.</span>
        </h2>
        <p className="am__subtitle">
          From our first prototype to a growing portfolio of solar technologies and expanded
          manufacturing capabilities, every step has brought us closer to our vision.
        </p>

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
