import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SolarViewSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function SolarViewSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector(".sv-cta-eyebrow");
      const title = section.querySelector(".sv-cta-title");
      const accent = section.querySelector(".sv-cta-accent");
      const lead = section.querySelector(".sv-cta-lead");
      const copy = section.querySelector(".sv-cta-copy");
      const actions = section.querySelector(".sv-cta-actions");
      const media = section.querySelector(".sv-cta-media");
      const phone = section.querySelector(".sv-cta-mockup");

      gsap.set([eyebrow, title, lead, copy, actions].filter(Boolean), {
        y: reduceMotion ? 0 : 32,
        opacity: 0,
      });
      if (accent) {
        gsap.set(accent, { scaleX: 0, opacity: 0, transformOrigin: "0% 50%" });
      }
      if (media) {
        gsap.set(media, {
          x: reduceMotion ? 0 : 48,
          opacity: 0,
        });
      }
      if (phone && !reduceMotion) {
        gsap.set(phone, { y: 24, scale: 0.94, transformOrigin: "50% 80%" });
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      if (eyebrow) tl.to(eyebrow, { y: 0, opacity: 1, duration: 0.5 }, 0);
      if (title) tl.to(title, { y: 0, opacity: 1, duration: 0.6 }, "-=0.28");
      if (accent) {
        tl.to(accent, { scaleX: 1, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.35");
      }
      if (lead) tl.to(lead, { y: 0, opacity: 1, duration: 0.5 }, "-=0.22");
      if (copy) tl.to(copy, { y: 0, opacity: 1, duration: 0.5 }, "-=0.28");
      if (actions) tl.to(actions, { y: 0, opacity: 1, duration: 0.5 }, "-=0.28");

      if (media) {
        tl.to(
          media,
          {
            x: 0,
            opacity: 1,
            duration: reduceMotion ? 0.4 : 0.75,
            ease: "power2.out",
          },
          0.12
        );
      }

      if (phone && !reduceMotion) {
        tl.to(
          phone,
          {
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
          },
          0.18
        );
      }
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
      className="sv-section"
      id="solar-view"
      aria-label="Solar View smart energy monitoring"
    >
      <div className="sv-cta-wrapper">
        <div className="sv-cta-content">
          <p className="sv-cta-eyebrow">
            <span className="sv-cta-dot" />
            Solar View
          </p>

          <h2 className="sv-cta-title text-xl">Smart Energy Monitoring</h2>
          <div className="sv-cta-accent" aria-hidden="true" />

          <p className="sv-cta-lead">Control from Anywhere, Anytime</p>

          <p className="sv-cta-copy text-xs">
            Track real-time generation, consumption, and battery status from your
            phone. Solar View gives you full visibility and control over your
            solar system — 24/7, wherever you are.
          </p>

          <div className="sv-cta-actions">
            <Link
              to="/monitoring"
              className="button-wrap sv-cta-btn w-inline-block"
              aria-label="Learn more about Solar View monitoring"
            >
              <div className="primary-text-wrap">
                <div className="text-xs">Learn More →</div>
              </div>
              <div className="bg-primary-btn" />
            </Link>
            <Link to="/downloads" className="sv-cta-link text-xs">
              View app resources →
            </Link>
          </div>
        </div>

        <div className="sv-cta-media">
          <div className="sv-cta-stage">
            <picture>
              <source srcSet="/images/solar-view-mockup-1.webp" type="image/webp" />
              <img
                src="/images/solar-view-mockup-1.png"
                alt="Cathode Power Solar View monitoring app on phone"
                className="sv-cta-mockup"
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
