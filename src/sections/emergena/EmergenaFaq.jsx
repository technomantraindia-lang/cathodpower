import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GrainIcon, PlusIcon } from "./EmergenaIcons";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    question: "What applications and sectors do Cathode Power inverters support?",
    answer:
      "We power residential rooftops, commercial complexes, high-demand industrial plants, and agricultural microgrids with on-grid, hybrid, and microinverter configurations ranging from 2.3 kW to 110 kW with dual MPPT precision.",
  },
  {
    question: "Are Cathode Power inverters approved for PM Surya Ghar and government subsidies?",
    answer:
      "Yes. Our single-phase and three-phase on-grid inverters fully comply with MNRE technical specifications, BIS certifications, and ALMM guidelines required for swift DBT subsidy releases under the national PM Surya Ghar: Muft Bijli Yojana.",
  },
  {
    question: "What makes Dual MPPT and IP66 die-cast protection critical for Indian conditions?",
    answer:
      "Our Dual MPPT architecture optimizes split-orientation roofs and shaded panels independently so partial shading never degrades total output, while IP66-rated enclosures withstand severe monsoon downpours, dust storms, and ambient temperatures up to 60°C.",
  },
  {
    question: "How does the hybrid inverter coordinate solar, battery storage, and the utility grid?",
    answer:
      "Cathode Power hybrid systems intelligently prioritize solar to power daytime household loads, store excess harvest in batteries, and switch seamlessly to UPS backup mode in under 10ms during sudden grid outages with zero flicker.",
  },
  {
    question: "What warranty, service network, and monitoring support do you provide?",
    answer:
      "All inverters come with a standard 5 to 10-year manufacturer warranty, backed by a nationwide network of 500+ certified service partners, genuine spare parts, and 24/7 intelligent telemetry and fault alerts via the Solar Cloud app.",
  },
];

export default function EmergenaFaq() {
  // First item open by default matching reference site & screenshot
  const [openIndex, setOpenIndex] = useState(0);

  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const faqListRef = useRef(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const faqList = faqListRef.current;
    if (!section || !leftCol || !faqList) return;

    const ctx = gsap.context(() => {
      // Authentic entrance animation corresponding to Webflow t-8d17090f
      const leftItems = leftCol.children;
      const faqCards = faqList.querySelectorAll(".faq-dropdown");

      // Left column stagger reveal
      gsap.fromTo(
        leftItems,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        }
      );

      // Right column FAQ cards stagger entrance
      if (faqCards.length) {
        gsap.fromTo(
          faqCards,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="main-section" id="faq">
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="faq-content-wrapper">
          {/* Top / Left Column */}
          <div ref={leftColRef} className="top-content-wrap faq">
            <div className="element-wrap">
              <div data-wf--tag-section--variant="base" className="tag-wrap">
                <div className="tag-icon">
                  <GrainIcon className="text-xs icon" />
                </div>
                <div className="tag-text">
                  <div className="tag-title">Clear answers</div>
                </div>
              </div>
            </div>

            <div className="title-wrap">
              <h2 className="text-xl">Before you reach out.</h2>
            </div>

            {/* Founder / Technical Advisory Card */}
            <div className="founder-wrap">
              <div className="img-founder">
                <img
                  src="/images/faq_engineer_portrait.webp"
                  loading="lazy"
                  alt="Cathode Power Technical Solutions Specialist"
                  className="image radius"
                />
              </div>
              <div className="identity-founder">
                <div className="founder-name">
                  <div className="text-sm">Solar Advisory Desk</div>
                </div>
                <div className="founder-role">
                  <div className="text-xxs">
                    Engineering & Solutions — <span className="highlight-emergena">Cathode Power</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="element-overflow">
              <div className="description-wrap center-mobile">
                <div className="text-xs">
                  Everything you need to know about Cathode Power inverters, grid compliance, subsidies, and warranty support.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="bottom-content faq-wrapper">
            <div ref={faqListRef} className="faq-wrap">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={faq.question}
                    className={`faq-dropdown w-dropdown ${isOpen ? "open" : ""}`}
                    onClick={() => toggle(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggle(idx);
                      }
                    }}
                  >
                    <div className="dropdown-toggle w-dropdown-toggle">
                      <div className="faq-title _w-500">{faq.question}</div>
                      <div className={`faq-icon-wrap ${isOpen ? "is-open" : ""}`}>
                        <PlusIcon />
                      </div>
                    </div>
                    <div className={`dropdown-list w-dropdown-list ${isOpen ? "is-open" : ""}`}>
                      <div className="faq-answer">
                        <div className="faq-answer-inner">
                          <p className="faq-answer-text">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
