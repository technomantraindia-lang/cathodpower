import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";

import "./OurSolutions.css";

gsap.registerPlugin(ScrollTrigger);

const OS01 = "/images/newimages/our-solutions-01-industrial.jpeg";
const OS02 = "/images/newimages/our-solutions-02-commercial.jpeg";
const OS03 = "/images/newimages/our-solutions-03-ci-scenario.jpeg";
const OS04 = "/images/newimages/our-solutions-04-hybrid.png";

const SOLUTIONS = [
  {
    id: "01",
    total: "04",
    title: "Industrial Applications",
    subtitle: "Energy optimization and long-run stability for heavy-duty industrial environments.",
    bullets: [
      "Steel, chemical, and cement manufacturing clusters",
      "Smart factories and production-line power balancing",
      "Industrial parks and special economic zones",
    ],
    image: OS01,
  },
  {
    id: "02",
    total: "04",
    title: "Commercial Applications",
    subtitle: "Reliable solar-first power design for business campuses and high-demand facilities.",
    bullets: [
      "Shopping malls and retail complexes",
      "Data centers and high-availability server infrastructure",
      "Hotels, office towers, and mixed-use developments",
    ],
    image: OS02,
  },
  {
    id: "03",
    total: "04",
    title: "C&I Scenario",
    subtitle: "Scalable solar plus storage architecture for fast-moving commercial and industrial sites.",
    bullets: [
      "Large-scale distributed rooftop deployments",
      "Multi-site energy monitoring and centralized control",
      "Grid-tied hybrid systems with smart dispatch logic",
    ],
    image: OS03,
  },
  {
    id: "04",
    total: "04",
    title: "Hybrid Energy",
    subtitle: "Integrated generation, storage, and control for resilient energy independence.",
    bullets: [
      "On-grid plus storage hybrid system integration",
      "Peak shaving, load shifting, and backup resilience",
      "Smoother power quality with intelligent energy routing",
    ],
    image: OS04,
  },
];

const CAROUSEL_SLIDES = [...SOLUTIONS, ...SOLUTIONS];

const SWIPER_EASE_MS = 820; /* 700–900ms */

function ArrowLeft() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function SolutionCard({ solution }) {
  const webpSrc = useMemo(() => {
    if (!solution?.image) return null;
    return solution.image.replace(/\.(png|jpe?g)$/i, ".webp");
  }, [solution?.image]);

  return (
    <article className="os-card">
      <div className="os-card-media">
        <picture>
          {webpSrc ? <source srcSet={webpSrc} type="image/webp" /> : null}
          <img src={solution.image} alt={solution.title} loading="lazy" decoding="async" fetchPriority="low" />
        </picture>
        <span className="os-card-index">{solution.id}</span>
      </div>

      <div className="os-card-body">
        <p className="os-card-tag">
          <span className="os-card-tag-dot" />
          Solution {solution.id}
        </p>

        <h3 className="os-card-title">{solution.title}</h3>
        <p className="os-card-desc">{solution.subtitle}</p>

        <div className="os-card-rule" />

        <ul className="os-card-list">
          {solution.bullets.map((bullet) => (
            <li key={bullet}>
              <span className="os-card-bullet" />
              {bullet}
            </li>
          ))}
        </ul>

        <div className="os-card-footer">
          <span className="os-counter">
            <strong>{solution.id}</strong>
            <span className="os-counter-divider" />
            {solution.total}
          </span>

          <Link to="/contact" className="os-card-link">
            Learn more
            <ArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function OurSolutions() {
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headerEl = section.querySelector(".os-header");
      const stageEl = section.querySelector(".os-stage");
      const dotsEl = section.querySelector(".os-dots");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      if (headerEl) {
        tl.fromTo(
          headerEl.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
          }
        );
      }

      if (stageEl) {
        tl.fromTo(
          stageEl,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      if (dotsEl) {
        tl.fromTo(
          dotsEl,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeSolution = useMemo(() => SOLUTIONS[activeIndex], [activeIndex]);

  const onSwiperInit = useCallback((swiper) => {
    swiperRef.current = swiper;
    setActiveIndex(swiper.realIndex % SOLUTIONS.length);
  }, []);

  const handlePrev = useCallback(() => {
    if (!swiperRef.current || isSliding) return;
    swiperRef.current.slidePrev();
  }, [isSliding]);

  const handleNext = useCallback(() => {
    if (!swiperRef.current || isSliding) return;
    swiperRef.current.slideNext();
  }, [isSliding]);

  const handleDotClick = useCallback(
    (logicalIndex) => {
      if (!swiperRef.current || isSliding) return;
      swiperRef.current.slideToLoop(logicalIndex);
    },
    [isSliding]
  );

  return (
    <section ref={sectionRef} className={`os-section perf-cv${isSliding ? " os-section--sliding" : ""}`} id="our-solutions">
      <div className="os-shell">
        <header className="os-header">
          <p className="os-eyebrow">
            <span className="os-eyebrow-line" />
            What we offer
            <span className="os-eyebrow-line" />
          </p>

          <h2 className="os-title">Our Solutions</h2>

          <p className="os-subtitle">
            <span className="os-dot" />
            {activeSolution.title}
          </p>
        </header>

        <div className="os-stage">
          <button
            type="button"
            className={`os-arrow os-arrow--prev${isSliding ? " os-arrow--busy" : ""}`}
            data-os-nav="prev"
            aria-label="Show previous solution"
            onClick={handlePrev}
            disabled={isSliding}
          >
            <ArrowLeft />
          </button>

          <div className="os-carousel-window">
            <Swiper
              className="os-swiper"
              loop
              loopAdditionalSlides={0}
              slidesPerView={3}
              centeredSlides
              spaceBetween={34}
              speed={SWIPER_EASE_MS}
              watchOverflow={false}
              grabCursor
              onSwiper={onSwiperInit}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex % SOLUTIONS.length);
              }}
              onSlideChangeTransitionStart={() => setIsSliding(true)}
              onSlideChangeTransitionEnd={() => setIsSliding(false)}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 18,
                  centeredSlides: true,
                },
                560: {
                  slidesPerView: 1.08,
                  spaceBetween: 20,
                  centeredSlides: true,
                },
                768: {
                  slidesPerView: 1.5,
                  spaceBetween: 22,
                  centeredSlides: true,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 26,
                  centeredSlides: true,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 34,
                  centeredSlides: true,
                },
              }}
            >
              {CAROUSEL_SLIDES.map((solution, slideIndex) => (
                <SwiperSlide key={`${solution.id}-${slideIndex}`} className="os-swiper-slide">
                  <div className="os-slide-inner">
                    <SolutionCard solution={solution} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <button
            type="button"
            className={`os-arrow os-arrow--next${isSliding ? " os-arrow--busy" : ""}`}
            data-os-nav="next"
            aria-label="Show next solution"
            onClick={handleNext}
            disabled={isSliding}
          >
            <ArrowRight />
          </button>
        </div>

        <div className="os-footer">
          <div className="os-pagination" role="tablist" aria-label="Solution pagination">
            {SOLUTIONS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                className={`os-pip${activeIndex === i ? " is-active" : ""}`}
                aria-selected={activeIndex === i}
                aria-label={`Go to solution ${s.id}`}
                disabled={isSliding}
                onClick={() => handleDotClick(i)}
              />
            ))}
          </div>
          <p className="os-hint">Use the arrows or dots to explore all 4 solutions</p>
        </div>
      </div>
    </section>
  );
}
