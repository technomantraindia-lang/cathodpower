import { useEffect, useMemo, useRef, useState } from "react";
import "./SmartEcosystemSection.css";

import dottedGray from "../assets/images/a2_img01.svg";
import dottedOrange from "../assets/images/a2_img02.svg";

import ci1 from "../assets/images/ci1.jpg";
import ci2 from "../assets/images/ci2.jpg";
import ci3 from "../assets/images/ci3.jpg";
import productImg from "../assets/invertor.png";

const slides = [
  {
    id: "01",
    title: "Flexible & Scalable for Any Scenario",
    description:
      "Seamlessly integrates with grid-tied, microgrid, solar-storage-charging, and solar-storage-diesel systems, ensuring uninterrupted power for diverse business needs.",
    image: ci1,
  },
  {
    id: "02",
    title: "AI-Driven Efficiency & Cost Savings",
    description:
      "Optimizes energy use with AI-powered weather forecasting, load analysis, and dynamic tariff tracking, automatically adjusting to maximize efficiency and reduce electricity costs.",
    image: ci2,
  },
  {
    id: "03",
    title: "Reliable & Secure Energy Management",
    description:
      "Equipped with advanced battery protection, real-time monitoring, and intelligent fault diagnostics, delivering stable, secure, and long-term energy reliability for businesses.",
    image: ci3,
  },
];

const TOTAL_SLIDES = slides.length;

const SmartEcosystemSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrolled = -rect.top;
      const totalScrollable = sectionHeight - viewportHeight;
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

      setScrollProgress(progress);

      const slideIndex = Math.min(
        Math.floor(progress * TOTAL_SLIDES),
        TOTAL_SLIDES - 1
      );
      setActiveIndex(slideIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translateX = useMemo(() => {
    const maxTranslate = (TOTAL_SLIDES - 1) * 100;
    return -(scrollProgress * maxTranslate);
  }, [scrollProgress]);

  const lineProgress = useMemo(() => {
    return scrollProgress * 100;
  }, [scrollProgress]);

  return (
    <section className="se-section" ref={sectionRef}>
      <div className="se-sticky-wrapper">
        <div
          className="se-track"
          ref={trackRef}
          style={{ transform: `translateX(${translateX}vw)` }}
        >
          {slides.map((slide, index) => {
            const slideStart = index / TOTAL_SLIDES;
            const slideEnd = (index + 1) / TOTAL_SLIDES;
            const slideProgress = Math.min(
              Math.max(
                (scrollProgress - slideStart) / (slideEnd - slideStart),
                0
              ),
              1
            );

            return (
              <div
                className={`se-slide ${
                  index === activeIndex ? "se-slide--active" : ""
                }`}
                key={slide.id}
              >
                {/* Curve line container */}
                <div className="se-curve-line">
                  <img
                    src={dottedGray}
                    alt=""
                    className="se-curve-line__gray"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className="se-curve-line__orange-wrapper"
                    style={{
                      clipPath: `inset(0 ${100 - slideProgress * 100}% 0 0)`,
                    }}
                  >
                    <img
                      src={dottedOrange}
                      alt=""
                      className="se-curve-line__orange"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                {/* Content area */}
                <div className="se-slide__content">
                  {/* Left: Text */}
                  <div className="se-slide__text">
                    <div className="se-slide__counter">
                      <span className="se-slide__dot"></span>
                      <span className="se-slide__counter-current">
                        {slide.id}
                      </span>
                      <span className="se-slide__counter-separator">
                        {" "}
                        - {String(TOTAL_SLIDES).padStart(2, "0")}
                      </span>
                    </div>

                    <h2 className="se-slide__title">{slide.title}</h2>
                    <p className="se-slide__description">
                      {slide.description}
                    </p>
                  </div>

                  {/* Right: Image + Product */}
                  <div className="se-slide__visual">
                    <div className="se-slide__image-wrapper">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="se-slide__image"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="se-slide__product">
                      <img
                        src={productImg}
                        alt="Cathode Power Invertor"
                        className="se-slide__product-img"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SmartEcosystemSection;