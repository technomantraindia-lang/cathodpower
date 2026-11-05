import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import gsap from "gsap";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ProductGridSection.css";

function ArrowRightIcon({ size = 12 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function NavArrow({ direction = "next" }) {
  const isPrev = direction === "prev";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {isPrev ? (
        <path
          d="M15 6 9 12l6 6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="m9 6 6 6-6 6"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

const resolvePhaseFromIndex = (index, phaseStartIndex) => {
  const threeStart = phaseStartIndex?.three ?? 0;
  if (threeStart > 0 && index >= threeStart) return "three";
  return "single";
};

export default function ProductGridSection({
  leadTitle,
  title,
  description,
  products,
  showPhaseTabs,
  phaseTabs,
  activePhase,
  onPhaseChange,
  continuousScroll = false,
  phaseStartIndex = { single: 0, three: 0 },
  sliderKey = "products",
}) {
  const sectionRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);
  const swiperRef = useRef(null);
  const activePhaseRef = useRef(activePhase);
  const [navReady, setNavReady] = useState(false);

  const useBulletDots = products.length > 0 && products.length <= 7;

  useEffect(() => {
    setNavReady(true);
  }, []);

  useEffect(() => {
    activePhaseRef.current = activePhase;
  }, [activePhase]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !navReady) return;

    const cards = section.querySelectorAll(".pgCard");
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: "power2.out",
        clearProps: "transform",
      }
    );
  }, [products, sliderKey, navReady]);

  const syncPhaseFromSlide = (index) => {
    if (!continuousScroll || !onPhaseChange) return;
    const nextPhase = resolvePhaseFromIndex(index, phaseStartIndex);
    if (nextPhase !== activePhaseRef.current) {
      onPhaseChange(nextPhase);
    }
  };

  const handlePhaseTabClick = (key) => {
    if (!onPhaseChange) return;
    onPhaseChange(key);
  };

  return (
    <section className="pg" ref={sectionRef}>
      <div className="pg__container">
        <div className="pg__header">
          {leadTitle ? <p className="pg__leadTitle">{leadTitle}</p> : null}
          <h2>{title}</h2>
          <p className="pg__desc">{description}</p>

          {showPhaseTabs && (
            <div className="pg__phaseTabs">
              {phaseTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={`pg__phaseTab ${
                    activePhase === tab.key ? "active" : ""
                  }`}
                  onClick={() => handlePhaseTabClick(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

        </div>

        {products.length === 0 ? (
          <div className="pg__empty">Products coming soon.</div>
        ) : (
          <div className="pg__sliderWrap">
            <button
              ref={prevRef}
              type="button"
              className="pg__nav pg__nav--prev"
              aria-label="Previous products"
            >
              <NavArrow direction="prev" />
            </button>

            <div className="pg__track">
              {navReady && (
                <Swiper
                  key={sliderKey}
                  className="pg__swiper"
                  modules={
                    useBulletDots
                      ? [Navigation, Pagination, A11y]
                      : [Navigation, A11y]
                  }
                  slidesPerView={1}
                  spaceBetween={20}
                  grabCursor
                  speed={550}
                  watchOverflow
                  breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 24 },
                  }}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  pagination={
                    useBulletDots
                      ? {
                          el: paginationRef.current,
                          clickable: true,
                          dynamicBullets: false,
                        }
                      : false
                  }
                  onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    if (useBulletDots && swiper.params.pagination) {
                      swiper.params.pagination.el = paginationRef.current;
                    }
                  }}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setTimeout(() => {
                      if (swiper?.params?.navigation) {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.destroy();
                        swiper.navigation.init();
                        swiper.navigation.update();
                      }
                      if (useBulletDots && swiper?.params?.pagination) {
                        swiper.params.pagination.el = paginationRef.current;
                        swiper.pagination.destroy();
                        swiper.pagination.init();
                        swiper.pagination.render();
                        swiper.pagination.update();
                      }

                    });
                  }}
                  onSlideChange={(swiper) => {
                    syncPhaseFromSlide(swiper.activeIndex);
                  }}
                >
                  {products.map((p) => {
                    const powerSpec =
                      p.specs?.find((s) => s.label === "Rated Power")?.value ||
                      p.meta?.split("|")[0]?.trim();
                    const phaseSpec =
                      p.specs?.find((s) => s.label === "Phase / Type")?.value ||
                      p.specs?.find((s) => s.label === "Phase")?.value ||
                      p.meta?.split("|")[1]?.trim();

                    return (
                      <SwiperSlide key={p.id} className="pg__slide">
                        <Link to={`/products/${p.slug}`} className="pgCardLink">
                          <article className="pgCard">
                            <div className="pgCard__media">
                              {powerSpec && (
                                <span className="pgCard__badge">{powerSpec}</span>
                              )}
                              {phaseSpec && (
                                <span className="pgCard__phaseTag">
                                  <span className="pgCard__phaseDot" />
                                  {phaseSpec}
                                </span>
                              )}
                              <img
                                src={p.image}
                                alt={p.name}
                                loading="lazy"
                                decoding="async"
                              />
                            </div>

                            <div className="pgCard__body">
                              <h3 className="pgCard__title">{p.name}</h3>
                              <p className="pgCard__meta">{p.meta}</p>
                              <div className="pgCard__footer">
                                <span className="pgCard__actionText">
                                  View Details
                                </span>
                                <span className="pgCard__actionIcon">
                                  <ArrowRightIcon size={12} />
                                </span>
                              </div>
                            </div>
                          </article>
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              )}
            </div>

            <button
              ref={nextRef}
              type="button"
              className="pg__nav pg__nav--next"
              aria-label="Next products"
            >
              <NavArrow direction="next" />
            </button>

            {useBulletDots ? (
              <div ref={paginationRef} className="pg__pagination" />
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
