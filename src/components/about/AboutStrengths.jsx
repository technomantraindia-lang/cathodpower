import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutStrengths.css";

gsap.registerPlugin(ScrollTrigger);

const STRENGTHS = [
  {
    tag: "Smart",
    text: "Real-time monitoring and intelligent control help you stay connected to your system anytime, anywhere.",
  },
  {
    tag: "Reliable",
    text: "With IP66 protection and a robust all-weather design, our inverters are built to perform consistently in diverse Indian conditions.",
  },
  {
    tag: "Efficient",
    text: "Advanced HERIC topology and optimized cooling fan technology work together to deliver higher performance with better thermal management.",
  },
  {
    tag: "Future-Ready",
    text: "Designed with modern technology and smart energy features, our inverters are ready to support the evolving needs of tomorrow.",
  },
];

export default function AboutStrengths() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 78%",
            once: true,
          },
        })
        .from(".as__header > *", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        })
        .from(
          ".as__item",
          {
            y: 28,
            opacity: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.25"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="as" aria-label="Four strengths" ref={rootRef}>
      <div className="as__inner">
        <header className="as__header">
          <p className="as__kicker">
            <span className="as__kicker-line" aria-hidden="true" />
            Our Promise
          </p>
          <h2 className="as__title">
            Four Strengths. <span>One Powerful Promise.</span>
          </h2>
          <p className="as__lead">
            At Cathode Power, every inverter is engineered with a purpose. Combining intelligent
            technology, dependable performance, energy efficiency, and forward-thinking innovation,
            we build solar solutions designed for India and ready for tomorrow.
          </p>
        </header>

        <div className="as__grid" role="list">
          {STRENGTHS.map((item) => (
            <article className="as__item" role="listitem" key={item.tag}>
              <span className="as__mark" aria-hidden="true" />
              <h3 className="as__tag">{item.tag}</h3>
              <p className="as__text">{item.text}</p>
              <span className="as__rule" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
