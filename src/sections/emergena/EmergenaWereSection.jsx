import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./EmergenaWereSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function EmergenaWereSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector(".cp-were__eyebrow");
      const title = section.querySelector(".cp-were__title");
      const accent = section.querySelector(".cp-were__accent");
      const copy = section.querySelectorAll(".cp-were__copy p");
      const actions = section.querySelector(".cp-were__actions");
      const rings = section.querySelectorAll(".cp-were__ring");
      const mascot = section.querySelector(".cp-were__mascot");

      gsap.set([eyebrow, title, ...copy, actions].filter(Boolean), {
        y: reduceMotion ? 0 : 36,
        opacity: 0,
      });
      if (accent) gsap.set(accent, { scaleX: 0, opacity: 0, transformOrigin: "0% 50%" });
      if (rings.length) gsap.set(rings, { scale: 0.72, opacity: 0 });

      if (mascot) {
        gsap.set(mascot, {
          y: reduceMotion ? 0 : 18,
          opacity: 0,
          transformOrigin: "50% 100%",
        });
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      if (rings.length) {
        tl.to(rings, {
          scale: 1,
          opacity: 1,
          duration: reduceMotion ? 0.35 : 0.9,
          stagger: 0.12,
          ease: "power2.out",
        }, 0);
      }

      if (eyebrow) {
        tl.to(eyebrow, { y: 0, opacity: 1, duration: 0.5 }, 0.05);
      }

      if (title) {
        tl.to(title, { y: 0, opacity: 1, duration: 0.65 }, "-=0.28");
      }

      if (accent) {
        tl.to(
          accent,
          { scaleX: 1, opacity: 1, duration: 0.45, ease: "power2.out" },
          "-=0.35"
        );
      }

      if (copy.length) {
        tl.to(
          copy,
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.1 },
          "-=0.2"
        );
      }

      if (actions) {
        tl.to(actions, { y: 0, opacity: 1, duration: 0.5 }, "-=0.28");
      }

      if (!mascot) return;

      // Minimal entrance — soft fade + slight rise, no bounce/float loop
      tl.to(
        mascot,
        {
          y: 0,
          opacity: 1,
          duration: reduceMotion ? 0.35 : 0.55,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }, sectionRef);

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cp-were"
      id="were"
      aria-label="About Cathode Power"
    >
      <div className="cp-were__bg" aria-hidden="true">
        <span className="cp-were__ring cp-were__ring--tl" />
        <span className="cp-were__ring cp-were__ring--br" />
      </div>
      <div className="cp-were__container">
        <div className="cp-were__content">
          <p className="cp-were__eyebrow">We&apos;re</p>
          <h2 className="cp-were__title text-xl">Cathode Power</h2>
          <div className="cp-were__accent" aria-hidden="true" />

          <div className="cp-were__copy">
            <p className="text-xs">
              Cathode Power delivers robust, world-class renewable power systems
              engineered for real Indian grid conditions — from residential rooftops
              to commercial and industrial installations.
            </p>
            <p className="text-xs">
              With high-efficiency on-grid, hybrid, and micro-inverter platforms plus
              intelligent monitoring, we help EPCs and homeowners achieve reliable
              performance and long-term solar confidence.
            </p>
          </div>

          <div className="cp-were__actions">
            <Link
              to="/products"
              className="button-wrap cp-were__cta w-inline-block"
            >
              <div className="primary-text-wrap">
                <div className="text-xs">Discover Our Products →</div>
              </div>
              <div className="bg-primary-btn" />
            </Link>
            <Link to="/about" className="cp-were__link text-xs">
              Know More About Us
            </Link>
          </div>
        </div>

        <div className="cp-were__visual">
          <span className="cp-were__glow" aria-hidden="true" />
          <span className="cp-were__platform" aria-hidden="true" />
          <img
            src="/images/mascot/Macot.png"
            alt="Cathode Power mascot"
            className="cp-were__mascot"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
