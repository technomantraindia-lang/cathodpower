import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GrainIcon } from "./EmergenaIcons";

gsap.registerPlugin(ScrollTrigger);

const ARTICLES = [
  {
    id: 1,
    category: "R&D & Manufacturing",
    date: "October 12, 2025",
    title: "Inside India's Cleanroom Inverter Line: Automated Testing for 10+ Year Durability",
    image: "/images/journal/journal_01.webp?v=2",
  },
  {
    id: 2,
    category: "Grid & Policy",
    date: "November 04, 2025",
    title: "Accelerating PM Surya Ghar: Why Dual MPPT Compliance Unlocks Maximum Rooftop Subsidies",
    image: "/images/journal/journal_02.webp?v=2",
  },
  {
    id: 3,
    category: "Energy Storage & IoT",
    date: "December 18, 2025",
    title: "Sub-10ms UPS Transition: The Strategic Role of Hybrid Inverters in Industrial Continuity",
    image: "/images/journal/journal_03.webp?v=2",
  },
];

export default function EmergenaJournal() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const list = listRef.current;
    if (!section || !header || !list) return;

    const ctx = gsap.context(() => {
      const cards = list.querySelectorAll(".blog-item");

      // Fire as soon as the section enters the viewport (was waiting until ~78%).
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 92%",
          once: true,
          fastScrollEnd: true,
        },
      });

      tl.fromTo(
        header,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
        }
      );

      tl.fromTo(
        cards,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.28"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="main-section" id="journal">
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="blog-content-wrapper">
          <div ref={headerRef} className="top-content-wrap">
            <div className="left-content-wrap blog">
              <div className="element-overflow">
                <div className="element-wrap">
                  <div data-wf--tag-section--variant="base" className="tag-wrap">
                    <div className="tag-icon">
                      <GrainIcon className="text-xs icon" />
                    </div>
                    <div className="tag-text">
                      <div className="tag-title">Field notes</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="element-overflow">
                <div className="title-wrap">
                  <h2 className="text-xl">Insights that power better decisions.</h2>
                </div>
              </div>
            </div>

            <div className="right-content-wrap blog left-mobile">
              <div className="element-overflow">
                <div className="element-wrap">
                  <a
                    data-wf--primary-button--variant="base"
                    href="#journal"
                    className="button-wrap w-inline-block"
                  >
                    <div className="primary-text-wrap">
                      <div className="text-xs">Explore the Journal</div>
                    </div>
                    <div className="bg-primary-btn" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-content-wrap field-notes-section">
            <div ref={listRef} className="blog-list-wrap w-dyn-list">
              <div role="list" className="blog-list w-dyn-items">
                {ARTICLES.map((article) => (
                  <div key={article.id} role="listitem" className="blog-item w-dyn-item">
                    <a
                      aria-label={article.title}
                      href="#journal"
                      className="link-blog-wrap w-inline-block"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="blog-card-wrap">
                        <div className="blog-image">
                          <img
                            src={article.image}
                            loading="eager"
                            alt={article.title}
                            className="image"
                          />
                          <div className="gradient-wrap blog-image" />
                        </div>
                        <div className="blog-detail-wrap">
                          <div className="category-date-wrap">
                            <div className="blog-category-wrap">
                              <div id="text-xs" className="blog-category">
                                {article.category}
                              </div>
                            </div>
                            <div className="blog-date-wrap">
                              <div id="text-xs" className="blog-date">
                                {article.date}
                              </div>
                            </div>
                          </div>
                          <div className="title-wrap">
                            <div className="text-s">{article.title}</div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
