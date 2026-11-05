import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutIndiaDesign.css";

gsap.registerPlugin(ScrollTrigger);

const POINTS = [
  {
    title: "Model-Specific MPPT Layout",
    text: "Thoughtfully configured MPPT architecture across models to optimize harvest for diverse rooftop layouts.",
  },
  {
    title: "Temperature & Derating Management",
    text: "Advanced thermal management and intelligent cooling help maintain stable output in India’s heat.",
  },
  {
    title: "Documented Protection Functions",
    text: "Anti-islanding, surge, and fault protection help safeguard the inverter and the connected solar system.",
  },
  {
    title: "Real-Time Diagnostic Suite",
    text: "Intelligent monitoring and diagnostics enable faster fault identification and clearer performance insight.",
  },
];

export default function AboutIndiaDesign() {
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
        .from(".aid__intro > *", {
          y: 18,
          opacity: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
        })
        .from(
          ".aid__row",
          {
            y: 22,
            opacity: 0,
            duration: 0.5,
            stagger: 0.09,
            ease: "power2.out",
          },
          "-=0.2"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="aid" aria-label="Designed for India" ref={rootRef}>
      <div className="aid__inner">
        <header className="aid__intro">
          <div className="aid__intro-left">
            <p className="aid__kicker">
              <span className="aid__kicker-line" aria-hidden="true" />
              Engineered for India
            </p>
            <h2 className="aid__title">
              Solar Inverters Which Are Designed for India, Not Adapted to India
            </h2>
          </div>
          <div className="aid__intro-right">
            <p className="aid__lead">
              Engineered for Indian Conditions. Optimized for Real-World Performance.
            </p>
            <p className="aid__desc">
              At Cathode Power, we understand that India&apos;s diverse climate, fluctuating grid
              conditions, and varying solar installations demand more than standard inverter
              technology. That&apos;s why our inverters are purposefully engineered to deliver
              intelligent performance, dependable protection, and long-term efficiency.
            </p>
          </div>
        </header>

        <div className="aid__list">
          {POINTS.map((item) => (
            <article className="aid__row" key={item.title}>
              <span className="aid__dot" aria-hidden="true" />
              <h3 className="aid__row-title">{item.title}</h3>
              <p className="aid__row-text">{item.text}</p>
              <span className="aid__mark" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
