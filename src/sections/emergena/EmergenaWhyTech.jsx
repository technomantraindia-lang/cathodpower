import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./EmergenaWhyTech.css";

gsap.registerPlugin(ScrollTrigger);

const POINTS = [
  {
    num: "01",
    title: "MPPT Architecture",
    text: "Tracker count, voltage window and current limits vary by model and must match the proposed strings.",
  },
  {
    num: "02",
    title: "Protection Functions",
    text: "Published functions vary by model and do not replace the external protection required by the project design.",
  },
  {
    num: "03",
    title: "Monitoring Options",
    text: "Confirm the communication hardware, interface, app access and available values for the exact configuration.",
  },
  {
    num: "04",
    title: "Grid Requirements",
    text: "Request current model evidence for the grid functions, standards and settings required by the project and DISCOM.",
  },
];

export default function EmergenaWhyTech() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cp-why__eyebrow, .cp-why__title, .cp-why__point, .cp-why__visual",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cp-why"
      id="why-technology"
      aria-label="Why Cathode Technology"
    >
      <div className="cp-why__container">
        <header className="cp-why__header">
          <p className="cp-why__eyebrow">Technology</p>
          <h2 className="cp-why__title text-xl">
            Why <span>Cathode</span> Technology
          </h2>
        </header>

        <div className="cp-why__grid">
          <ol className="cp-why__list">
            {POINTS.map((point) => (
              <li key={point.num} className="cp-why__point">
                <span className="cp-why__num" aria-hidden="true">
                  {point.num}
                </span>
                <div className="cp-why__point-body">
                  <h3 className="cp-why__point-title">{point.title}</h3>
                  <p className="cp-why__point-text">{point.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="cp-why__visual">
            <span className="cp-why__circle" aria-hidden="true" />
            <img
              src="/images/products/2kW - 4kW Single Phase.webp"
              alt="Cathode Power on-grid solar inverter"
              className="cp-why__image"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
