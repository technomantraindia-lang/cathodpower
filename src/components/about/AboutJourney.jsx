import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutJourney.css";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    topic: "Our Story",
    title: "It Started With a Question. Why Not Build Better?",
    text: "What began as an idea in 2018 became a journey of research, determination, and innovation — driven by a vision to develop inverter technology for India's unique needs.",
    note: "Since 2018",
  },
  {
    topic: "Manufacturing",
    title: "Built With Precision. Backed by Purpose.",
    text: "Inside our 26,000 sq. ft. manufacturing facility, technology, skilled professionals, and quality-focused processes come together to turn innovation into dependable energy solutions.",
    note: "26,000 sq. ft.",
  },
  {
    topic: "Our People",
    title: "Great Technology Begins With Great Minds.",
    text: "Behind every Cathode inverter stands a team of 200+ professionals, united by curiosity, commitment, and the drive to create something better.",
    note: "200+ professionals",
  },
  {
    topic: "Vision & Mission",
    title: "Our Ambition Goes Beyond Generating Power.",
    text: "We envision an energy future where Indian innovation drives smarter technology, greater reliability, and sustainable progress for generations to come.",
    note: "Built for India",
  },
];

export default function AboutJourney() {
  const rootRef = useRef(null);
  const contentRef = useRef(null);
  const [active, setActive] = useState(0);
  const chapter = CHAPTERS[active];
  const progress = (active + 1) / CHAPTERS.length;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from([".aj__intro", ".aj__stage"], {
        y: 22,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.children,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }, content);

    return () => ctx.revert();
  }, [active]);

  return (
    <section className="aj" aria-label="Our journey" ref={rootRef}>
      <div className="aj__inner">
        <header className="aj__intro">
          <div className="aj__intro-left">
            <p className="aj__kicker">
              <span className="aj__kicker-line" aria-hidden="true" />
              The Cathode Journey
            </p>
            <h2 className="aj__title">
              From a Question to a Nationwide Vision
            </h2>
          </div>
          <p className="aj__lead">
            Four defining chapters — explore how Cathode Power grew from an idea into
            engineering built for India.
          </p>
        </header>

        <div
          className="aj__stage"
          style={{ "--aj-progress": progress }}
        >
          <nav className="aj__rail" aria-label="Journey chapters">
            <span className="aj__rail-track" aria-hidden="true" />
            <span className="aj__rail-fill" aria-hidden="true" />

            {CHAPTERS.map((item, index) => {
              const isActive = index === active;
              return (
                <button
                  key={item.topic}
                  type="button"
                  className={`aj__rail-btn${isActive ? " is-active" : ""}${index < active ? " is-done" : ""}`}
                  onClick={() => setActive(index)}
                  aria-pressed={isActive}
                >
                  <span className="aj__rail-topic">{item.topic}</span>
                </button>
              );
            })}
          </nav>

          <div className="aj__detail" aria-live="polite">
            <div className="aj__content" ref={contentRef}>
              <p className="aj__note">{chapter.note}</p>
              <h3 className="aj__chapter-title">{chapter.title}</h3>
              <p className="aj__chapter-text">{chapter.text}</p>

              <div className="aj__pager">
                <button
                  type="button"
                  className="aj__pager-btn"
                  onClick={() => setActive((i) => Math.max(0, i - 1))}
                  disabled={active === 0}
                  aria-label="Previous chapter"
                >
                  Prev
                </button>
                <div className="aj__pager-dots" aria-hidden="true">
                  {CHAPTERS.map((item, index) => (
                    <span
                      key={item.topic}
                      className={`aj__pager-dot${index === active ? " is-active" : ""}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="aj__pager-btn"
                  onClick={() => setActive((i) => Math.min(CHAPTERS.length - 1, i + 1))}
                  disabled={active === CHAPTERS.length - 1}
                  aria-label="Next chapter"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
