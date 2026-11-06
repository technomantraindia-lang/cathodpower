import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import logoDark from "../../assets/Cathode-Power-Logo-White-New.png";
import ProductMegaMenu from "../../components/layout/ProductMegaMenu";

const SERVICE_SUPPORT_LINKS = [
  {
    label: "Warranty Registration",
    href: "https://service.cathodepower.com/cathode/warranty-registration",
  },
  {
    label: "EPC Login",
    href: "https://service.cathodepower.com/cathode/epc-dealer-login",
  },
  {
    label: "Service Registration",
    href: "https://service.cathodepower.com/cathode/service-registration",
  },
];

const MONITORING_LINKS = [
  {
    label: "Solar Cloud",
    href: "https://uat.thesolarcloud.com",
  },
  {
    label: "Solar View",
    href: "https://thesolarview.com",
  },
];

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" aria-hidden="true" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d="M4.5 10h9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10.5 5.5 15 10l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EmergenaHero({ onLearnMore, onGetStarted }) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [monitoringDropdownOpen, setMonitoringDropdownOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const megaCloseTimerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const navbarRef = useRef(null);
  const navLineRef = useRef(null);
  const bgImageRef = useRef(null);
  const bgGradientRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaWrapRef = useRef(null);
  const videoRef = useRef(null);

  const cancelMegaClose = useCallback(() => {
    if (megaCloseTimerRef.current) {
      clearTimeout(megaCloseTimerRef.current);
      megaCloseTimerRef.current = null;
    }
  }, []);

  const openMegaMenu = useCallback(() => {
    cancelMegaClose();
    setMonitoringDropdownOpen(false);
    setServiceDropdownOpen(false);
    setMegaOpen(true);
  }, [cancelMegaClose]);

  const queueMegaClose = useCallback(() => {
    cancelMegaClose();
    megaCloseTimerRef.current = setTimeout(() => {
      setMegaOpen(false);
    }, 220);
  }, [cancelMegaClose]);

  // Close mega menu on scroll or Escape
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setMegaOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      cancelMegaClose();
    };
  }, [cancelMegaClose]);

  // Auto-play video on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay handled by browser policy
      });
    }
  }, []);

  // 1. Hero Load Entrance Animation (Clean, immediate, elegant)
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const heroSection = heroSectionRef.current;
    if (!heroSection) return;

    const ctx = gsap.context(() => {
      if (isDesktop) {
        // Initial setup
        gsap.set(navLineRef.current, { scaleX: 0, transformOrigin: "0% 50%" });
        gsap.set(navbarRef.current, { y: -20, opacity: 0 });
        gsap.set(bgImageRef.current, { opacity: 0, scale: 1.04 });
        gsap.set(bgGradientRef.current, { opacity: 0 });
        gsap.set(headlineRef.current, { y: 35, opacity: 0 });
        gsap.set(subtitleRef.current, { y: 22, opacity: 0 });
        gsap.set(ctaWrapRef.current, { y: 15, opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        // 1. Background image & gradient fade in
        tl.to(bgImageRef.current, { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" }, 0);
        tl.to(bgGradientRef.current, { opacity: 1, duration: 0.9 }, 0.1);

        // 2. Navbar drops down and fades in
        tl.to(navbarRef.current, { y: 0, opacity: 1, duration: 0.75 }, 0.2);

        // 3. Navbar line draws horizontally across
        tl.to(navLineRef.current, { scaleX: 1, duration: 0.85, ease: "power2.inOut" }, 0.45);

        // 4. Headline & subtitle slide up smoothly
        tl.to(headlineRef.current, { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" }, 0.35);
        tl.to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" }, 0.55);

        // 5. CTA button reveal
        tl.to(ctaWrapRef.current, { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" }, 0.7);
      } else {
        // Mobile fallback
        gsap.set(
          [
            navbarRef.current,
            navLineRef.current,
            bgImageRef.current,
            bgGradientRef.current,
            headlineRef.current,
            subtitleRef.current,
            ctaWrapRef.current,
          ],
          { opacity: 1, y: 0, scale: 1, scaleX: 1 }
        );
      }
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollClick = (e) => {
    e.preventDefault();
    if (onLearnMore) {
      onLearnMore();
    } else {
      const el = document.getElementById("solutions");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroSectionRef}
      className="main-section hero-homepage"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "100vh",
        overflow: "visible",
        padding: 0,
        margin: 0,
        backgroundColor: "#0b1919",
      }}
    >
      {/* ── 1. Authenticated Hero Top Navigation Bar (Cathode Power) ── */}
      <div
        ref={navbarRef}
        className={`cp-hero-nav-bar ${megaOpen ? "cp-hero-nav-bar--mega-open" : ""}`}
      >
        <div className="cp-hero-nav-container">
          {/* Horizontal separator line */}
          <div
            ref={navLineRef}
            className="cp-hero-nav-line"
          />

          {/* Left menus */}
          <div className="cp-hero-nav-left">
            <Link to="/about" className="cp-hero-nav-link">
              <span>About Us</span>
            </Link>

            <div
              className="cp-hero-nav-mega-wrap"
              onMouseEnter={openMegaMenu}
              onMouseLeave={queueMegaClose}
            >
              <Link
                to="/products"
                className={`cp-hero-nav-link ${megaOpen ? "active" : ""}`}
                onClick={() => setMegaOpen(false)}
                aria-haspopup="true"
                aria-expanded={megaOpen}
              >
                <span>Our Products</span>
                <span
                  className="cp-hero-nav-chevron"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.22s ease",
                    transform: megaOpen ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                  aria-hidden="true"
                >
                  <ArrowIcon />
                </span>
              </Link>
            </div>

            <div
              className="cp-hero-dropdown-wrapper"
              onMouseEnter={() => {
                setMegaOpen(false);
                setServiceDropdownOpen(true);
              }}
              onMouseLeave={() => setServiceDropdownOpen(false)}
            >
              <button type="button" className="cp-hero-nav-link">
                <span>Service</span>
                <ArrowIcon />
              </button>
              {serviceDropdownOpen && (
                <div className="cp-hero-dropdown-menu" style={{ minWidth: "210px" }}>
                  {SERVICE_SUPPORT_LINKS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cp-hero-dropdown-item"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Centered Brand Logo */}
          <Link
            to="/"
            aria-label="Cathode Power"
            className="cp-hero-nav-logo-wrap"
          >
            <img
              loading="eager"
              src={logoDark}
              alt="Cathode Power"
              className="cp-hero-nav-logo-img"
            />
          </Link>

          {/* Right menus + CTA */}
          <div className="cp-hero-nav-right">
            <div
              className="cp-hero-dropdown-wrapper"
              onMouseEnter={() => {
                setMegaOpen(false);
                setMonitoringDropdownOpen(true);
              }}
              onMouseLeave={() => setMonitoringDropdownOpen(false)}
            >
              <Link to="/monitoring" className="cp-hero-nav-link">
                <span>Monitoring</span>
                <ArrowIcon />
              </Link>
              {monitoringDropdownOpen && (
                <div className="cp-hero-dropdown-menu">
                  {MONITORING_LINKS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cp-hero-dropdown-item"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <Link to="/downloads" className="cp-hero-nav-link">
              <span>Downloads</span>
            </Link>

            <Link to="/contact" className="cp-hero-nav-link">
              <span>Contact Us</span>
            </Link>

            <div className="cp-hero-btn-container">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  if (onGetStarted) onGetStarted();
                  else {
                    const el = document.getElementById("cta");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="cp-hero-get-quote-btn"
              >
                GET QUOTE
              </button>
            </div>
          </div>
        </div>

        {/* Cathode Power Products Full Mega Menu */}
        <ProductMegaMenu
          isOpen={megaOpen}
          onMouseEnter={openMegaMenu}
          onMouseLeave={queueMegaClose}
          onLinkClick={() => setMegaOpen(false)}
        />
      </div>

      {/* ── 2. Full-Width Main Container ── */}
      <div
        className="w-layout-blockcontainer main-container full w-container"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          maxWidth: "none",
          padding: 0,
          margin: 0,
        }}
      >
        <div
          className="hero-content-wrapper"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            minHeight: "100vh",
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            overflow: "hidden",
          }}
        >
          {/* Background Video (INSIDE hero-content-wrapper) */}
          <div
            ref={bgImageRef}
            className="wrapper-image-background"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
              overflow: "hidden",
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/video/homepage-banner-poster.jpg"
              className="image top hero-video-bg"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                filter: "none",
              }}
            >
              <source src="/video/homepage-banner.mp4" type="video/mp4" />
              <img
                src="/video/homepage-banner-poster.jpg"
                loading="eager"
                alt="Cathode Power manufacturing and solar energy operations."
                className="image top"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </video>
          </div>

          {/* Gradient Overlay (Clean, transparent middle for HD video clarity) */}
          <div
            ref={bgGradientRef}
            className="hero-background"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            <div
              className="gradient-wrap hero"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.1) 18%, rgba(0, 0, 0, 0) 32%, rgba(0, 0, 0, 0) 62%, rgba(0, 0, 0, 0.35) 82%, rgba(0, 0, 0, 0.6) 100%)",
              }}
            />
          </div>

          {/* ── 3. Bottom Content Overlay (INSIDE hero-content-wrapper) ── */}
          <section
            className="bottom-content-wrap vertical hero"
            style={{
              position: "absolute",
              bottom: "4.5vw",
              left: 0,
              right: 0,
              width: "100%",
              zIndex: 10,
              padding: "0 4vw",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              boxSizing: "border-box",
            }}
          >
            {/* Headline, Subtitle, CTA */}
            <div
              className="left-content-wrap hero"
              style={{
                width: "100%",
                maxWidth: "780px",
                display: "flex",
                flexDirection: "column",
                gap: "22px",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <div ref={headlineRef} className="title-wrap white">
                  <h1
                    className="text-xxl cp-hero-title-responsive"
                    style={{
                      fontSize: "clamp(28px, 5.2vw, 68px)",
                      fontWeight: 500,
                      color: "#ffffff",
                      lineHeight: "1.08",
                      letterSpacing: "-0.02em",
                      margin: 0,
                      textShadow: "0 2px 20px rgba(0, 0, 0, 0.7), 0 1px 4px rgba(0, 0, 0, 0.9)",
                    }}
                  >
                    Built to reduce. Designed to grow stronger.
                  </h1>
                </div>
              </div>

              <div style={{ overflow: "hidden" }}>
                <div ref={subtitleRef} className="description-wrap hero">
                  <div
                    className="text-sm cp-hero-desc-responsive"
                    style={{
                      fontSize: "clamp(14px, 1.4vw, 18px)",
                      color: "rgba(255, 255, 255, 0.95)",
                      lineHeight: "1.5",
                      fontWeight: 400,
                      maxWidth: "560px",
                      textShadow: "0 1px 12px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    Engineering smarter energy for lasting performance.
                  </div>
                </div>
              </div>

              <div ref={ctaWrapRef} className="cta-hero-wrap" style={{ marginTop: "6px" }}>
                <a
                  href="#solutions"
                  onClick={handleScrollClick}
                  className="button-wrap hero-cta w-variant-3c4ebf71-bf7d-51e4-aaf8-51d9d17171fd w-inline-block"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "14px 34px",
                    borderRadius: "100px",
                    backgroundColor: "#ffffff",
                    color: "#142922",
                    fontWeight: 600,
                    fontSize: "14px",
                    textDecoration: "none",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
                    transition: "transform 0.3s ease, background-color 0.3s ease, color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ff6a00";
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                    e.currentTarget.style.color = "#142922";
                    e.currentTarget.style.transform = "translateY(0px)";
                  }}
                >
                  <div className="primary-text-wrap">
                    <div className="text-xs">Learn More</div>
                  </div>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

