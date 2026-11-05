import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutWho.css";

gsap.registerPlugin(ScrollTrigger);

const ACCENTS = ["A Different Vision.", "A Smarter Direction.", "A Powerful Future."];

export default function AboutWho() {
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
            start: "top 75%",
            once: true,
          },
        })
        .from(".aw__watermark", { opacity: 0, duration: 1, ease: "power2.out" })
        .from(
          ".aw__copy > *",
          {
            y: 24,
            opacity: 0,
            duration: 0.65,
            stagger: 0.09,
            ease: "power2.out",
          },
          "-=0.7"
        )
        .from(
          ".aw__media",
          {
            x: 40,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.55"
        )
        .from(
          ".aw__accent-item",
          {
            y: 12,
            opacity: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.35"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="aw" aria-label="Who we are" ref={rootRef}>
      <div className="aw__inner">
        <span className="aw__watermark" aria-hidden="true">
          02
        </span>

        <div className="aw__grid">
          <div className="aw__copy">
            <p className="aw__kicker">
              <span className="aw__kicker-line" aria-hidden="true" />
              02 / WHO WE ARE
            </p>

            <h2 className="aw__title">
              More Than a Manufacturer.
              <span> A Mindset to Innovate.</span>
            </h2>

            <p className="aw__lead">
              We are an Indian solar inverter manufacturer transforming real-world energy
              challenges into intelligent, reliable, and efficient solar solutions.
            </p>

            <ul className="aw__accents">
              {ACCENTS.map((line) => (
                <li className="aw__accent-item" key={line}>
                  <span className="aw__accent-dot" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <figure className="aw__media">
            <picture>
              <source srcSet="/images/factoryimages/4.webp" type="image/webp" />
              <img
                src="/images/factoryimages/4.jpeg"
                alt="Cathode Power manufacturing facility"
                loading="lazy"
              />
            </picture>
            <figcaption className="aw__caption">
              <span className="aw__caption-label">Manufacturing Campus</span>
              <span className="aw__caption-meta">Gujarat, India</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
