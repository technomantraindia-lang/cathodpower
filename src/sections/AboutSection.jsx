import { useCallback, useEffect, useRef, useState } from "react";
import "./AboutSection.css";

const timeline = [
  {
    tag: null,
    year: null,
    hero: ["Powering", "India's Clean", "Energy Future"],
    description: null,
  },
  {
    tag: "Founded",
    year: "2021",
    hero: null,
    description:
      "Incorporated on 21st October with a bold vision to make clean energy accessible across India.",
  },
  {
    tag: "Growth",
    year: "2022",
    hero: null,
    description:
      "Established in-house manufacturing and launched our first product range of solar inverters.",
  },
  {
    tag: "Expansion",
    year: "2023",
    hero: null,
    description:
      "Opened corporate office, strengthened operations and expanded our dealer network nationwide.",
  },
  {
    tag: "Scale",
    year: "2024",
    hero: null,
    description:
      "Upscaled to 100+ manufacturing staff and 20+ R&D professionals. Launched advanced inverter models.",
  },
  {
    tag: "Recognition",
    year: "2025",
    hero: null,
    description:
      "Recognized as one of India's fastest-growing solar inverter brands, trusted by 500+ service partners.",
  },
];

const SLIDE_DURATION = 4000;
/**
 * First frames of the MP4 are black, start playback here (in seconds).
 * Tunable without re-encoding the file.
 */
const VIDEO_START_TIME = 1.0;
const VIDEO_END_TIME = 82;
const VIDEO_PATH = "/images/factoryimages/INVERTER.mp4";
const VIDEO_POSTER = "/images/factoryimages/5.webp";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const didKickoffLoadRef = useRef(false);
  const progressFillRef = useRef(null);
  const activeIdxRef = useRef(0);
  const rafRef = useRef(null);
  const slideStartRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [videoVisible, setVideoVisible] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const goToSlide = useCallback((index) => {
    if (index < 0 || index >= timeline.length) return;
    activeIdxRef.current = index;
    setActiveIndex(index);
    slideStartRef.current = performance.now();
    if (progressFillRef.current) {
      progressFillRef.current.style.transform = "scaleX(0)";
    }
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        const inView = Boolean(entry?.isIntersecting);
        setIsInView(inView);
        if (entry && entry.intersectionRatio > 0) {
          setShouldLoadVideo(true);
        }
      },
      { root: null, threshold: [0, 0.05, 0.15], rootMargin: "600px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    slideStartRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - slideStartRef.current;
      const progress = Math.min(elapsed / SLIDE_DURATION, 1);

      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${progress})`;
      }

      if (progress >= 1) {
        const next = (activeIdxRef.current + 1) % timeline.length;
        activeIdxRef.current = next;
        setActiveIndex(next);
        slideStartRef.current = now;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const startLoop = () => {
      stopLoop();
      rafRef.current = requestAnimationFrame(tick);
    };

    if (!document.hidden) {
      startLoop();
    }

    const onVisibility = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        slideStartRef.current = performance.now();
        if (progressFillRef.current) {
          progressFillRef.current.style.transform = "scaleX(0)";
        }
        startLoop();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stopLoop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [isInView]);

  // Pause background video in hidden tabs to save CPU / bandwidth; resume when visible
  useEffect(() => {
    const onVis = () => {
      const v = videoRef.current;
      if (!v) return;
      if (document.hidden) v.pause();
      else v.play().catch(() => {});
    };
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const clampStart = () => {
      const t = video.duration;
      if (Number.isFinite(t) && t > 0) {
        return Math.min(VIDEO_START_TIME, Math.max(0, t - 0.2));
      }
      return VIDEO_START_TIME;
    };

    const onTimeUpdate = () => {
      if (video.currentTime >= VIDEO_END_TIME) {
        video.currentTime = clampStart();
        video.play().catch(() => {});
      }
    };

    /** Reveal + play only after the seek to the trim point (not frame at t=0). */
    const afterTrimSeek = () => {
      const start = clampStart();
      if (video.currentTime + 0.04 < start) return;
      setVideoVisible(true);
      video.play().catch(() => {});
    };

    const onLoadedMetadata = () => {
      try {
        video.pause();
      } catch {
        // ignore
      }
      const start = clampStart();
      // Seek away from t=0 before any play() so the first painted frame is not black.
      video.currentTime = start;
    };

    const onSeeked = () => {
      afterTrimSeek();
    };

    // React Strict / HMR: `loadedmetadata` may have already fired before this effect.
    if (video.readyState >= 1) {
      onLoadedMetadata();
    }

    const fallback = window.setTimeout(() => {
      if (video.currentTime < VIDEO_START_TIME - 0.02) {
        video.currentTime = clampStart();
      }
      setVideoVisible(true);
      video.play().catch(() => {});
    }, 3000);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata, { once: true });
    video.addEventListener("seeked", onSeeked);

    return () => {
      clearTimeout(fallback);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [shouldLoadVideo]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!isInView) {
      try {
        v.pause();
      } catch {}
      return;
    }
    if (!shouldLoadVideo) return;

    // Kick off network fetch only once; afterwards just resume playback
    // from the paused time (do NOT restart from the beginning).
    if (!didKickoffLoadRef.current) {
      didKickoffLoadRef.current = true;
      try {
        v.load();
      } catch {}
    }

    v.play().catch(() => {});
  }, [isInView, shouldLoadVideo]);

  return (
    <section className="cp-about" ref={sectionRef}>
      <div className="cp-sticky">
        <video
          ref={videoRef}
          className={`cp-video${videoVisible ? " cp-video--visible" : ""}`}
          src={`${VIDEO_PATH}#t=${VIDEO_START_TIME}`}
          muted
          playsInline
          preload={shouldLoadVideo ? "metadata" : "none"}
          poster={VIDEO_POSTER}
          disablePictureInPicture
          disableRemotePlayback
        />

        <div className="cp-overlay" />

        <div className="cp-content">
          {timeline.map((item, index) => (
            <div
              key={index}
              className={`cp-step${activeIndex === index ? " cp-step--active" : ""}`}
            >
              {item.hero ? (
                <div className="cp-hero-wrap">
                  <p className="cp-eyebrow">About Cathode Power</p>
                  <h2 className="cp-hero-title">
                    {item.hero.map((line, lineIndex) => (
                      <span
                        key={lineIndex}
                        className="cp-hero-line"
                        style={{
                          transitionDelay:
                            activeIndex === index
                              ? `${0.08 + lineIndex * 0.1}s`
                              : "0s",
                        }}
                      >
                        {line}
                      </span>
                    ))}
                  </h2>
                  <p
                    className="cp-hero-sub"
                    style={{
                      transitionDelay: activeIndex === index ? "0.38s" : "0s",
                    }}
                  >
                    Discover our journey
                  </p>
                </div>
              ) : (
                <div className="cp-timeline-wrap">
                  <span
                    className="cp-tag"
                    style={{
                      transitionDelay: activeIndex === index ? "0.04s" : "0s",
                    }}
                  >
                    {item.tag}
                  </span>
                  <div
                    className="cp-year"
                    style={{
                      transitionDelay: activeIndex === index ? "0.1s" : "0s",
                    }}
                  >
                    {item.year}
                  </div>
                  <p
                    className="cp-desc"
                    style={{
                      transitionDelay: activeIndex === index ? "0.2s" : "0s",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="cp-progress-bar">
          <div ref={progressFillRef} className="cp-progress-fill" />
        </div>

        <nav className="cp-dots" aria-label="About timeline">
          {timeline.map((item, index) => (
            <button
              key={index}
              type="button"
              className={`cp-dot${activeIndex === index ? " is-active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={
                item.hero
                  ? "Intro About Cathode Power"
                  : `Go to ${item.tag ?? "slide"} ${item.year ?? ""}`.trim()
              }
              aria-current={activeIndex === index ? "true" : undefined}
            >
              <span className="cp-dot__inner" aria-hidden="true" />
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}

