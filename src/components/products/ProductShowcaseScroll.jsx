// src/components/products/ProductShowcaseScroll.jsx

import { useEffect, useRef, useState } from "react";
import "./ProductShowcaseScroll.css";

export default function ProductShowcaseScroll({ steps = [], heading }) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      const total = rect.height - windowH;
      const current = windowH - rect.top;

      const raw = current / total;
      const clamped = Math.min(Math.max(raw, 0), 1);

      setProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!steps.length) return null;

  const angleStep = 360 / steps.length;
  const rotation = progress * 360;

  const activeIndex = Math.min(
    steps.length - 1,
    Math.floor(progress * steps.length)
  );

  const activeStep = steps[activeIndex];

  return (
    <section ref={sectionRef} className="cleanOrbit">
      <div className="cleanOrbit__container">

        {heading && <h2 className="cleanOrbit__heading">{heading}</h2>}

        <div className="cleanOrbit__stage">

          {/* LEFT NAV */}
          <aside className="cleanOrbit__nav">
            {steps.map((s, i) => (
              <div
                key={s.key}
                className={`cleanOrbit__navItem ${
                  i === activeIndex ? "is-active" : ""
                }`}
              >
                {i + 1}. {s.navLabel}
              </div>
            ))}
          </aside>

          {/* CENTER ORBIT */}
          <div className="cleanOrbit__center">
            <div className="cleanOrbit__orbit">

              {/* Rotating chips */}
              <div
                className="cleanOrbit__rotator"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {steps.map((s, i) => (
                  <div
                    key={s.key}
                    className="cleanOrbit__chipWrapper"
                    style={{
                      transform: `rotate(${i * angleStep}deg)`
                    }}
                  >
                    <div
                      className={`cleanOrbit__chip ${
                        i === activeIndex ? "is-active" : ""
                      }`}
                      style={{
                        transform: `translateY(-210px) rotate(-${rotation + i * angleStep}deg)`
                      }}
                    >
                      {s.title}
                    </div>
                  </div>
                ))}
              </div>

              {/* Orbit ring */}
              <div className="cleanOrbit__ring" />

              {/* PRODUCT CENTER IMAGE */}
              <div className="cleanOrbit__product">
                {steps.map((s, i) => (
                  <img
                    key={s.key}
                    src={s.media?.src}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    className={`cleanOrbit__img ${
                      i === activeIndex ? "is-active" : ""
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="cleanOrbit__right">
            <div className="cleanOrbitCard">
              <span className="cleanOrbitCard__badge">Feature</span>
              <h3>{activeStep.title}</h3>
              <p>{activeStep.desc}</p>
            </div>
          </div>

        </div>

        <div className="cleanOrbit__scrollSpace" />
      </div>
    </section>
  );
}