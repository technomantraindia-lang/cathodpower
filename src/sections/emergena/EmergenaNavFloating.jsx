import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoDark from "../../assets/Cathode-Power-Logo-White-New.png";
import QuoteModal from "../../components/common/QuoteModal";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Our Products", to: "/products" },
  { label: "Monitoring", to: "/monitoring" },
  { label: "Downloads", to: "/downloads" },
  { label: "Contact Us", to: "/contact" },
];

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

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/cathodepower/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/cathodepower/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@CathodePower",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

export default function EmergenaNavFloating({ onGetStarted }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const location = useLocation();
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const hamburgerRef = useRef(null);
  const closeIconRef = useRef(null);
  const menuWrapRef = useRef(null);
  const backdropRef = useRef(null);

  // Auto-close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // 1. Scroll-trigger reveal of the floating circle button (responsive)
  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    let trigger = null;

    const setupButtonState = () => {
      const isMobile = window.innerWidth <= 1024;
      if (trigger) {
        trigger.kill();
        trigger = null;
      }

      if (isMobile) {
        // Mobile/Tablet: visible immediately at the top so menu is accessible at all times
        gsap.set(circle, { scale: 1, opacity: 1, pointerEvents: "auto" });
      } else {
        // Desktop: reveal on scroll past top
        const isPastThreshold = window.scrollY > window.innerHeight * 0.05;
        if (isPastThreshold) {
          gsap.set(circle, { scale: 1, opacity: 1, pointerEvents: "auto" });
        } else {
          gsap.set(circle, { scale: 0, opacity: 0, pointerEvents: "none" });
        }

        trigger = ScrollTrigger.create({
          start: "top -5%",
          onEnter: () => {
            gsap.to(circle, {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "back.out(1.7)",
              pointerEvents: "auto",
            });
          },
          onLeaveBack: () => {
            gsap.to(circle, {
              scale: 0,
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
              pointerEvents: "none",
            });
            setIsOpen(false);
          },
        });
      }
    };

    setupButtonState();
    window.addEventListener("resize", setupButtonState);

    return () => {
      if (trigger) trigger.kill();
      window.removeEventListener("resize", setupButtonState);
    };
  }, []);

  // 2. Open / Close animations
  useEffect(() => {
    const hamburger = hamburgerRef.current;
    const closeIcon = closeIconRef.current;
    const menuWrap = menuWrapRef.current;
    const backdrop = backdropRef.current;

    if (!hamburger || !closeIcon || !menuWrap) return;

    if (isOpen) {
      // Animate to OPEN state
      gsap.to(hamburger, { scale: 0, duration: 0.25, ease: "power2.in" });
      gsap.to(closeIcon, { scale: 1, duration: 0.3, ease: "back.out(2)", delay: 0.1 });

      gsap.set(menuWrap, { display: "flex", transformOrigin: "100% 0%" });
      gsap.fromTo(
        menuWrap,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: "power3.out" }
      );

      if (backdrop) {
        gsap.to(backdrop, { opacity: 1, pointerEvents: "auto", duration: 0.3 });
      }

      // Animate links staggering in
      const navLinks = menuWrap.querySelectorAll(".navbar-link-in");
      if (navLinks.length) {
        gsap.fromTo(
          navLinks,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out", delay: 0.15 }
        );
      }
    } else {
      // Animate to CLOSED state
      gsap.to(closeIcon, { scale: 0, duration: 0.2, ease: "power2.in" });
      gsap.to(hamburger, { scale: 1, duration: 0.3, ease: "power2.out", delay: 0.1 });

      gsap.to(menuWrap, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(menuWrap, { display: "none" });
        },
      });

      if (backdrop) {
        gsap.to(backdrop, { opacity: 0, pointerEvents: "none", duration: 0.25 });
      }
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleLinkClick = (hash) => {
    setIsOpen(false);
    if (hash && hash.startsWith("#")) {
      const el = document.getElementById(hash.substring(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="cp-nav-floating-container"
      style={{
        position: "fixed",
        zIndex: 9999,
        pointerEvents: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      {/* Background click overlay */}
      <div
        ref={backdropRef}
        onClick={() => setIsOpen(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 9990,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Floating circular toggle button */}
      <button
        ref={circleRef}
        type="button"
        className="cp-nav-floating-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        style={{
          cursor: "pointer",
          position: "relative",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          backgroundColor: "#111816",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
          padding: 0,
          outline: "none",
          transition: "box-shadow 0.25s ease, border-color 0.25s ease, transform 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(255, 106, 0, 0.6)";
          e.currentTarget.style.boxShadow = "0 8px 28px rgba(255, 106, 0, 0.35)";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.45)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <div
          ref={hamburgerRef}
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <div style={{ width: "22px", height: "2px", backgroundColor: "#ff6a00", borderRadius: "1px" }} />
          <div style={{ width: "22px", height: "2px", backgroundColor: "#ff6a00", borderRadius: "1px" }} />
          <div style={{ width: "22px", height: "2px", backgroundColor: "#ff6a00", borderRadius: "1px" }} />
        </div>

        <div
          ref={closeIconRef}
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "24px",
            height: "24px",
            transform: "scale(0)",
          }}
        >
          <div style={{ position: "absolute", width: "20px", height: "2px", backgroundColor: "#ff6a00", transform: "rotate(45deg)", borderRadius: "1px" }} />
          <div style={{ position: "absolute", width: "20px", height: "2px", backgroundColor: "#ff6a00", transform: "rotate(-45deg)", borderRadius: "1px" }} />
        </div>
      </button>

      {/* Flyout Navigation Panel */}
      <div
        ref={menuWrapRef}
        className="cp-nav-floating-panel"
        style={{
          display: "none",
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 9995,
          backgroundColor: "#111816",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "26px",
          padding: "24px 24px 24px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.65), 0 0 1px 1px rgba(255,255,255,0.06)",
          color: "#fff",
          maxWidth: "calc(100vw - 32px)",
          maxHeight: "calc(100vh - 32px)",
          overflowY: "auto",
          overscrollBehavior: "contain",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        {/* Header with Logo and space for close button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "54px", paddingRight: "56px" }}>
          <Link to="/" onClick={() => setIsOpen(false)} style={{ display: "inline-flex", alignItems: "center" }}>
            <img
              src={logoDark}
              loading="eager"
              alt="Cathode Power"
              style={{ height: "40px", width: "auto" }}
            />
          </Link>
        </div>

        {/* Navigation Menu Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "4px" }}>
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => handleLinkClick()}
                className="navbar-link-in"
                style={{
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#ff6a00" : "#ffffff",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 0",
                  transition: "color 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = "#ff6a00";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA Get Quote Button */}
        <div style={{ marginTop: "4px" }}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              if (onGetStarted) {
                onGetStarted();
              } else {
                setIsQuoteOpen(true);
              }
            }}
            style={{
              cursor: "pointer",
              border: "none",
              outline: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: "40px",
              padding: "0 28px",
              borderRadius: "999px",
              background: "linear-gradient(135deg, #22727f, #2f8f9d)",
              backgroundColor: "#22727f",
              color: "#ffffff",
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "13px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              boxShadow: "0 4px 14px rgba(34, 114, 127, 0.35)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #1a5f6a, #22727f)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(34, 114, 127, 0.5)";
              e.currentTarget.style.transform = "translateY(-1.5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, #22727f, #2f8f9d)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(34, 114, 127, 0.35)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            GET QUOTE
          </button>
        </div>

        {/* Service & Support Quick Links */}
        <div
          style={{
            marginTop: "12px",
            borderRadius: "14px",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            padding: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "rgba(255, 255, 255, 0.5)",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Service
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {SERVICE_SUPPORT_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ff6a00";
                  e.currentTarget.style.transform = "translateX(3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <span style={{ color: "#ff6a00", fontSize: "14px", fontWeight: 700, lineHeight: 1 }}>→</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          {/* Follow Us inline row with clean vector SVGs */}
          <div
            style={{
              marginTop: "8px",
              paddingTop: "12px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
              }}
            >
              Follow Us
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "rgba(255, 255, 255, 0.85)",
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ff6a00";
                    e.currentTarget.style.borderColor = "#ff6a00";
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 106, 0, 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quote Modal fallback when onGetStarted prop is not provided */}
      {isQuoteOpen && <QuoteModal onClose={() => setIsQuoteOpen(false)} />}
    </div>
  );
}
