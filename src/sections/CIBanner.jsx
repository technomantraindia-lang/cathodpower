import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./CIBanner.css";

/* Same asset as C&I Large banner.jpeg, copied to an ASCII name — "&" in URLs often 404s on static servers. */
const CI_BANNER = "/images/newimages/ci-large-banner.jpeg";

export default function CIBanner() {
  const eyebrowRef = useRef(null);
  const headRef    = useRef(null);
  const subRef     = useRef(null);
  const btnRef     = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.2 });

    tl.fromTo(eyebrowRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      )
      .fromTo(headRef.current,
        { y: 44, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85 },
        "-=0.45"
      )
      .fromTo(subRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75 },
        "-=0.5"
      )
      .fromTo(btnRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.45"
      );
  }, []);

  return (
    <section
      className="ci-banner"
      style={{ backgroundImage: `url(${CI_BANNER})` }}
    >
      {/* layered overlays */}
      <div className="ci-banner-overlay" />
      <div className="ci-banner-noise" />

      <div className="ci-banner-inner">
        <div className="ci-banner-content">

          <p ref={eyebrowRef} className="ci-banner-eyebrow">
            <span className="ci-banner-eyebrow-dot" />
            Commercial &amp; Industrial Solutions
          </p>

          <h1 ref={headRef} className="ci-banner-heading">
            Unlock Smarter<br />Energy for Your Business
          </h1>

          <p ref={subRef} className="ci-banner-sub">
            Cathode Power delivers advanced solar storage systems that manage
            dynamic electricity pricing and ensure seamless parallel power —
            helping enterprises cut energy costs and boost efficiency.
          </p>

          <div ref={btnRef} className="ci-banner-actions">
            <a
              href="#our-solutions"
              className="ci-banner-btn"
              aria-label="C and I solutions — jump to Our Solutions section"
            >
              <span>C&amp;I Solutions</span>
              <span className="ci-banner-btn-icon">→</span>
            </a>
            <a
              href="tel:+919800268002"
              className="ci-banner-btn-ghost"
              aria-label="Call to get a quote, +91 98002 68002"
            >
              Get a Quote
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}