import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./EmergenaTagPoints.css";

gsap.registerPlugin(ScrollTrigger);

const TAG_POINTS = [
  {
    title: "Smart",
    text: "Cloud-connected insights and live diagnostics that help EPCs act faster and keep plants optimized.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9.5 3.5h5M12 3.5v2.2M8.2 8.2a5.3 5.3 0 1 1 7.6 7.6M9.8 15.8 8 21h8l-1.8-5.2"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="11.2" r="2.1" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    title: "Reliable",
    text: "Stress-tested platforms with outdoor-ready protection for stable output in tough Indian climates.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3 4.8 6.2v5.1c0 4.5 3.1 8.6 7.2 9.7 4.1-1.1 7.2-5.2 7.2-9.7V6.2L12 3Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="m9.2 12.1 1.9 1.9 3.8-3.9"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Efficient",
    text: "Wide MPPT ranges and high conversion rates that squeeze more yield from every rooftop and site.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M13 3 5.5 13.2H12L11 21l7.5-10.2H12L13 3Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Future Ready",
    text: "Hybrid-ready architecture that scales with storage, smart loads, and next-generation grid needs.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 17.5 9.2 9.8l3.3 4.1L20 5.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.2 5.5H20v4.8"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function EmergenaTagPoints() {
  const sectionRef = useRef(null);

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

      tl.fromTo(
        ".cp-tags__title, .cp-tags__subtitle",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: "power3.out" }
      ).fromTo(
        ".cp-tags__card",
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: "power3.out" },
        "-=0.25"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cp-tags"
      id="tag-points"
      aria-label="Four strengths one powerful promise"
    >
      <div className="cp-tags__container">
        <div className="cp-tags__header">
          <h2 className="cp-tags__title text-xl">
            Four Strengths. <span>One Powerful Promise.</span>
          </h2>
          <p className="cp-tags__subtitle text-xs">
            At Cathode Power, every inverter is engineered with a purpose. Combining
            intelligent technology, dependable performance, energy efficiency, and
            forward-thinking innovation, we build solar solutions designed for India
            and ready for tomorrow.
          </p>
        </div>

        <div className="cp-tags__grid">
          {TAG_POINTS.map((item) => (
            <article key={item.title} className="cp-tags__card">
              <div className="cp-tags__icon">{item.icon}</div>
              <h3 className="cp-tags__card-title">{item.title}</h3>
              <p className="cp-tags__card-text text-xs">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
