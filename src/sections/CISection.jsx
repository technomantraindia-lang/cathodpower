import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function CISection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const pathRef = useRef(null);
  const dotRef = useRef(null);

  const slides = [
    {
      number: "01",
      title: "Flexible & Scalable for Any Scenario",
      desc: "Seamlessly integrates with grid-tied, microgrid and solar systems.",
      img: "/src/assets/images/ci1.jpg",
    },
    {
      number: "02",
      title: "AI-Driven Efficiency & Cost Savings",
      desc: "Optimizes energy use with AI-powered forecasting.",
      img: "/src/assets/images/ci2.jpg",
    },
    {
      number: "03",
      title: "Reliable & Secure Energy Management",
      desc: "Advanced battery protection and diagnostics.",
      img: "/src/assets/images/ci3.jpg",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".ci-panel");
      const totalWidth = track.scrollWidth - window.innerWidth;

      const path = pathRef.current;
      const dot = dotRef.current;
      const pathLength = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(track, {
        x: -totalWidth,
        ease: "none",
      }, 0);

      tl.to(path, {
        strokeDashoffset: 0,
        ease: "none",
      }, 0);

      tl.to(dot, {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
        },
        ease: "none",
      }, 0);
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="ci-section">

      <div className="ci-container">

        <svg className="ci-curve" viewBox="0 0 1400 250">
          <path
            ref={pathRef}
            d="M100 80 C400 20 900 20 1200 120"
            stroke="#f97316"
            strokeWidth="3"
            fill="none"
          />
          <circle ref={dotRef} r="8" fill="#f97316" />
        </svg>

        <div className="ci-track" ref={trackRef}>
          {slides.map((slide, i) => (
            <div className="ci-panel" key={i}>
              <div className="ci-content">

                <div className="ci-left">
                  <div className="ci-number">
                    {slide.number} — 03
                  </div>
                  <h2>{slide.title}</h2>
                  <p>{slide.desc}</p>
                </div>

                <div className="ci-right">
                  <img src={slide.img} alt={slide.title} loading="lazy" decoding="async" />
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}