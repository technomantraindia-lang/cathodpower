import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GrainIcon, PlayIcon } from "./EmergenaIcons";

gsap.registerPlugin(ScrollTrigger);

export default function EmergenaCta({ onTalkToEngineer, onPlayVideo }) {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      tl.fromTo(
        left,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        }
      );

      tl.fromTo(
        right,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "back.out(1.5)",
        },
        "-=0.7"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-wf--cta-section--variant="base" className="main-section cta" id="cta">
      <div className="w-layout-blockcontainer main-container cta w-container">
        <div className="cta-content-wrapper">
          <div className="cta-image">
            <img
              loading="eager"
              src="/images/cta/cta_solar_bg.webp"
              alt="Cathode Power commercial and industrial rooftop solar installation."
              className="image"
            />
          </div>

          <div ref={leftRef} className="left-content-wrap cta">
            <div className="tag-title-wrap cta">
              <div data-wf--tag-section--variant="light" className="tag-wrap w-variant-845cec6c-c1d0-4fc7-e96a-3c90cde403cf">
                <div className="tag-icon w-variant-845cec6c-c1d0-4fc7-e96a-3c90cde403cf">
                  <GrainIcon className="text-xs icon" />
                </div>
                <div className="tag-text w-variant-845cec6c-c1d0-4fc7-e96a-3c90cde403cf">
                  <div className="tag-title">Let&#39;s Power Tomorrow</div>
                </div>
              </div>
              <div className="title-wrap white">
                <h2 className="text-xxl">Ready to power your facility with next-gen solar?</h2>
              </div>
            </div>

            <div className="cta-btn-wrap">
              <a
                data-wf--primary-button--variant="light"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  if (onTalkToEngineer) onTalkToEngineer();
                }}
                className="button-wrap w-variant-3c4ebf71-bf7d-51e4-aaf8-51d9d17171fd w-inline-block"
              >
                <div className="primary-text-wrap w-variant-3c4ebf71-bf7d-51e4-aaf8-51d9d17171fd">
                  <div className="text-xs w-variant-3c4ebf71-bf7d-51e4-aaf8-51d9d17171fd">
                    Talk to an Engineer
                  </div>
                </div>
                <div className="bg-primary-btn" />
              </a>
            </div>
          </div>

          <div ref={rightRef} className="right-content-wrap cta">
            <div
              className="video-card-wrap"
              onClick={() => onPlayVideo && onPlayVideo()}
              style={{ cursor: "pointer" }}
            >
              <div className="title-wrap cta-watch">
                <div className="text-sm">Watch Our Process</div>
              </div>
              <div className="video-wrap">
                <div className="video-bg-wrap">
                  <img
                    loading="eager"
                    src="/images/cta/cta_video_thumb.jpg"
                    alt="Cathode Power film — Watch Our Process"
                    className="image"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/cta/cta_video_thumb.webp";
                    }}
                  />
                </div>
                <div
                  className="play-button-video"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <PlayIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
