import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./EmergenaWideRangeBanner.css";

gsap.registerPlugin(ScrollTrigger);

export default function EmergenaWideRangeBanner() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const image = section.querySelector(".cp-wide-banner__image");
      const overlay = section.querySelector(".cp-wide-banner__overlay");
      const title = section.querySelector(".cp-wide-banner__title");
      const subtitle = section.querySelector(".cp-wide-banner__subtitle");
      const cta = section.querySelector(".cp-wide-banner__cta");

      if (image) {
        gsap.set(image, {
          scale: reduceMotion ? 1.04 : 1.18,
          opacity: reduceMotion ? 1 : 0.55,
        });
      }
      if (overlay) gsap.set(overlay, { opacity: reduceMotion ? 1 : 0 });
      gsap.set([title, subtitle, cta].filter(Boolean), {
        y: reduceMotion ? 0 : 40,
        opacity: 0,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      if (image) {
        tl.to(
          image,
          {
            scale: 1.04,
            opacity: 1,
            duration: reduceMotion ? 0.4 : 1.15,
            ease: "power2.out",
          },
          0
        );
      }

      if (overlay) {
        tl.to(
          overlay,
          { opacity: 1, duration: reduceMotion ? 0.35 : 0.85, ease: "power2.out" },
          0.08
        );
      }

      if (title) {
        tl.to(title, { y: 0, opacity: 1, duration: 0.7 }, reduceMotion ? 0.1 : 0.28);
      }

      if (subtitle) {
        tl.to(subtitle, { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");
      }

      if (cta) {
        tl.to(
          cta,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: reduceMotion ? "power2.out" : "back.out(1.4)",
          },
          "-=0.32"
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
      className="cp-wide-banner"
      id="wide-range"
      aria-label="Built for Indian solar conditions"
    >
      <div className="cp-wide-banner__bg" aria-hidden="true">
        <img
          src="/images/factoryimages/4.webp"
          alt=""
          className="cp-wide-banner__image"
          loading="eager"
          decoding="async"
        />
        <div className="cp-wide-banner__overlay" />
      </div>

      <div className="cp-wide-banner__content">
        <h2 className="cp-wide-banner__title text-xl">
          Engineered in India for real-world power.
        </h2>
        <p className="cp-wide-banner__subtitle text-xs">
          From precision manufacturing to field-ready inverters — built for reliability,
          efficiency, and long-term performance across every installation.
        </p>
        <Link
          to="/products"
          className="button-wrap cp-wide-banner__cta w-inline-block"
        >
          <div className="primary-text-wrap">
            <div className="text-xs">Discover Our Products →</div>
          </div>
          <div className="bg-primary-btn" />
        </Link>
      </div>
    </section>
  );
}
