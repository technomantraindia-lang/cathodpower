import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./VisionCardsSection.css";

import forestImg from "../assets/images/forest.webp";
import mountainImg from "../assets/images/mountain.webp";

/** public/images/newimages — aerial solar building (Sustainable. slide) */
const sustainableBg =
  "/images/newimages/An_ultra_realistic_202604231257.webp";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    number: "01",
    word:   "Greener.",
    title:  "Flexible & Scalable for Any Scenario",
    desc:   "Seamlessly integrates with grid-tied, microgrid, solar-storage-charging, and solar-storage-diesel systems, ensuring uninterrupted power for diverse business needs.",
    img:    forestImg,
  },
  {
    number: "02",
    word:   "Sustainable.",
    title:  "AI-Driven Efficiency & Cost Savings",
    desc:   "Optimizes energy use with AI-powered weather forecasting, load analysis, and dynamic tariff tracking, automatically adjusting to maximize efficiency and reduce electricity costs.",
    img:    sustainableBg,
  },
  {
    number: "03",
    word:   "Tomorrow.",
    title:  "Reliable & Secure Energy Management",
    desc:   "Equipped with advanced battery protection, real-time monitoring, and intelligent fault diagnostics, delivering stable, secure, and long-term energy reliability for businesses.",
    img:    mountainImg,
  },
];

export default function VisionCardsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cardEls = section.querySelectorAll(".vc-card");
      cardEls.forEach((card) => {
        const leftEl = card.querySelector(".vc-card__left");
        const rightEl = card.querySelector(".vc-card__right");
        const bgEl = card.querySelector(".vc-card__bg");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        });

        if (bgEl) {
          tl.fromTo(
            bgEl,
            { scale: 1.08, opacity: 0.8 },
            { scale: 1, opacity: 1, duration: 0.9, ease: "power2.out" }
          );
        }

        tl.fromTo(
          [leftEl, rightEl],
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.65"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="vc-section perf-cv">
      <div className="vc-stack">
        {cards.map(({ number, word, title, desc, img }, i) => (
          <div key={i} className={`vc-card vc-card--${i + 1}`}>
            {/* First slide: eager load for LCP; rest stay lazy */}
            <img
              src={img}
              alt={word}
              className="vc-card__bg"
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={i === 0 ? "high" : "low"}
            />

            {/* Dark overlay */}
            <div className="vc-card__overlay" />

            {/* Content */}
            <div className="vc-card__content">
              <div className="vc-card__left">
                <span className="vc-card__num">{number}</span>
                <h2 className="vc-card__word">{word}</h2>
              </div>
              <div className="vc-card__right">
                <h3 className="vc-card__title">{title}</h3>
                <p className="vc-card__desc">{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
