import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";

import logoDark from "../../assets/Cathode-Power-Logo-White-New.png";
import logoLight from "../../assets/CATHODE-POWER-REGISTER-LOGO.png";
import QuoteModal from "../common/QuoteModal";
import ProductMegaMenu from "./ProductMegaMenu";

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
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4.5 10h9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10.5 5.5 15 10l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [serviceMobileOpen, setServiceMobileOpen] = useState(false);
  const [monitoringOpen, setMonitoringOpen] = useState(false);

  const closeTimerRef = useRef(null);
  const serviceCloseTimerRef = useRef(null);
  const monitoringCloseTimerRef = useRef(null);
  const megaWrapRef = useRef(null);
  const navMegaRef = useRef(null);
  const headerRef = useRef(null);
  const isMegaOpenRef = useRef(false);

  const cancelMegaMenuClose = useRef(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }).current;

  const closeMegaMenu = useRef(() => {
    isMegaOpenRef.current = false;
    megaWrapRef.current?.classList.remove("open");
    navMegaRef.current?.removeAttribute("data-open");
    headerRef.current?.removeAttribute("data-mega-open");
  }).current;

  const openMegaMenu = useRef(() => {
    cancelMegaMenuClose();
    isMegaOpenRef.current = true;
    megaWrapRef.current?.classList.add("open");
    navMegaRef.current?.setAttribute("data-open", "true");
    headerRef.current?.setAttribute("data-mega-open", "true");
  }).current;

  const resetMegaMenu = useRef(() => {
    cancelMegaMenuClose();
    closeMegaMenu();
  }).current;

  const queueMegaMenuClose = useRef(() => {
    cancelMegaMenuClose();
    closeTimerRef.current = window.setTimeout(closeMegaMenu, 220);
  }).current;

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        if (window.scrollY > 40) {
          resetMegaMenu();
          setServiceOpen(false);
          setMonitoringOpen(false);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    resetMegaMenu();
    setMenuOpen(false);
    setServiceOpen(false);
    setServiceMobileOpen(false);
    setMonitoringOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        resetMegaMenu();
        setMenuOpen(false);
        setServiceOpen(false);
        setServiceMobileOpen(false);
        setMonitoringOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => () => {
    cancelMegaMenuClose();
    if (serviceCloseTimerRef.current) {
      window.clearTimeout(serviceCloseTimerRef.current);
    }
    if (monitoringCloseTimerRef.current) {
      window.clearTimeout(monitoringCloseTimerRef.current);
    }
  }, []);

  useEffect(() => {
    const isLocked = isModalOpen || menuOpen;
    document.body.style.overflow = isLocked ? "hidden" : "";
    document.body.style.overflowX = "hidden";
  }, [isModalOpen, menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const linkClass = ({ isActive }) =>
    `cp-header__link ${isActive ? "active" : ""}`;

  const productLinkClass = ({ isActive }) =>
    `cp-header__link cp-header__link--trigger ${isActive ? "active" : ""}`;

  const monitoringLinkClass = ({ isActive }) =>
    `cp-header__link cp-header__link--trigger ${
      isActive || monitoringOpen ? "active" : ""
    }`;

  const forceSolidHeader =
    pathname.startsWith("/products/") ||
    pathname === "/monitoring";
  const showSolidHeader = menuOpen || forceSolidHeader;
  const isLightHero =
    pathname === "/products" || pathname === "/products/";

  const handleNavClick = () => {
    resetMegaMenu();
    setMenuOpen(false);
    cancelServiceClose();
    setServiceOpen(false);
    setServiceMobileOpen(false);
    cancelMonitoringClose();
    setMonitoringOpen(false);
  };

  const handleServiceBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      queueServiceClose();
    }
  };

  const cancelServiceClose = () => {
    if (serviceCloseTimerRef.current) {
      window.clearTimeout(serviceCloseTimerRef.current);
      serviceCloseTimerRef.current = null;
    }
  };

  const openServiceMenu = () => {
    cancelServiceClose();
    setServiceOpen(true);
  };

  const queueServiceClose = () => {
    cancelServiceClose();
    serviceCloseTimerRef.current = window.setTimeout(() => {
      setServiceOpen(false);
    }, 150);
  };

  const handleMonitoringBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      queueMonitoringClose();
    }
  };

  const cancelMonitoringClose = () => {
    if (monitoringCloseTimerRef.current) {
      window.clearTimeout(monitoringCloseTimerRef.current);
      monitoringCloseTimerRef.current = null;
    }
  };

  const openMonitoringMenu = () => {
    cancelMonitoringClose();
    setMonitoringOpen(true);
  };

  const queueMonitoringClose = () => {
    cancelMonitoringClose();
    monitoringCloseTimerRef.current = window.setTimeout(() => {
      setMonitoringOpen(false);
    }, 150);
  };

  const handleMegaBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      queueMegaMenuClose();
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`cp-header ${showSolidHeader ? "scrolled" : ""} ${
          isLightHero && !showSolidHeader ? "cp-header--light" : ""
        }`}
      >
        <div className="cp-header__container">
          <nav className="cp-header__nav cp-header__nav--left" aria-label="Primary left">
            <NavLink to="/about" className={linkClass} onClick={handleNavClick}>
              About Us
            </NavLink>

            <div
              ref={navMegaRef}
              className="cp-header__navMega"
              onMouseEnter={openMegaMenu}
              onMouseLeave={queueMegaMenuClose}
              onFocusCapture={openMegaMenu}
              onBlurCapture={handleMegaBlur}
            >
              <NavLink
                to="/products"
                className={productLinkClass}
                onClick={handleNavClick}
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>Our Products</span>
                <span className="cp-header__chevron" aria-hidden="true">
                  <ArrowIcon />
                </span>
              </NavLink>
            </div>

            <div
              className="cp-header__navDropdown"
              data-open={serviceOpen ? "true" : undefined}
              onMouseEnter={openServiceMenu}
              onMouseLeave={queueServiceClose}
              onFocusCapture={openServiceMenu}
              onBlurCapture={handleServiceBlur}
            >
              <button
                type="button"
                className={`cp-header__link cp-header__link--trigger ${
                  serviceOpen ? "active" : ""
                }`}
                aria-haspopup="true"
                aria-expanded={serviceOpen}
              >
                <span>Service</span>
                <span className="cp-header__chevron" aria-hidden="true">
                  <ArrowIcon />
                </span>
              </button>

              <div className="cp-header__dropdownPanel">
                <div className="cp-header__dropdown">
                  {SERVICE_SUPPORT_LINKS.map((item) => (
                    <a
                      key={item.href}
                      className="cp-header__dropdownLink"
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <NavLink to="/" className="cp-header__logo" onClick={handleNavClick}>
            <img
              src={logoDark}
              alt="Cathode Power"
              className="cp-header__logo-img cp-header__logo-img--dark"
              decoding="async"
              fetchPriority="high"
            />
            <img
              src={logoLight}
              alt="Cathode Power"
              className="cp-header__logo-img cp-header__logo-img--light"
              decoding="async"
              fetchPriority="low"
            />
          </NavLink>

          <div className="cp-header__right">
            <nav className="cp-header__nav cp-header__nav--right" aria-label="Primary right">
              <div
                className="cp-header__navDropdown"
                data-open={monitoringOpen ? "true" : undefined}
                onMouseEnter={openMonitoringMenu}
                onMouseLeave={queueMonitoringClose}
                onFocusCapture={openMonitoringMenu}
                onBlurCapture={handleMonitoringBlur}
              >
                <NavLink
                  to="/monitoring"
                  className={monitoringLinkClass}
                  onClick={handleNavClick}
                  aria-haspopup="true"
                  aria-expanded={monitoringOpen}
                >
                  <span>Monitoring</span>
                  <span className="cp-header__chevron" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </NavLink>

                <div className="cp-header__dropdownPanel">
                  <div className="cp-header__dropdown">
                    {MONITORING_LINKS.map((item) => (
                      <a
                        key={item.href}
                        className="cp-header__dropdownLink"
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <NavLink to="/downloads" className={linkClass} onClick={handleNavClick}>
                Downloads
              </NavLink>

              <NavLink to="/contact" className={linkClass} onClick={handleNavClick}>
                Contact Us
              </NavLink>
            </nav>

            <div className="cp-header__actions">
              <button
                className="cp-header__btn"
                onClick={() => setIsModalOpen(true)}
              >
                GET QUOTE
              </button>
            </div>
          </div>

          <button
            className={`cp-header__hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Redesigned World-Class Cathode Power Mega Menu */}
        <ProductMegaMenu
          ref={megaWrapRef}
          onMouseEnter={() => {
            cancelMegaMenuClose();
            openMegaMenu();
          }}
          onMouseLeave={queueMegaMenuClose}
          onFocusCapture={openMegaMenu}
          onBlurCapture={handleMegaBlur}
          onLinkClick={handleNavClick}
        />
      </header>

      <div
        className={`cp-mobile-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <nav className={`cp-mobile-drawer ${menuOpen ? "open" : ""}`}>
        <div className="cp-mobile-drawer__inner">
          <div className="cp-mobile-drawer__links">
            <NavLink to="/about" className={linkClass} onClick={handleNavClick}>
              About Us
            </NavLink>

            <NavLink
              to="/products"
              className={linkClass}
              onClick={handleNavClick}
            >
              Our Products
            </NavLink>

            <div className="cp-mobile-drawer__group">
              <button
                type="button"
                className={`cp-mobile-drawer__groupToggle ${
                  serviceMobileOpen ? "is-open" : ""
                }`}
                onClick={() => setServiceMobileOpen((prev) => !prev)}
                aria-expanded={serviceMobileOpen}
              >
                <span>Service</span>
                <span className="cp-header__chevron" aria-hidden="true">
                  <ArrowIcon />
                </span>
              </button>

              {serviceMobileOpen && (
                <div className="cp-mobile-drawer__subLinks">
                  {SERVICE_SUPPORT_LINKS.map((item) => (
                    <a
                      key={item.href}
                      className="cp-mobile-drawer__subLink"
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleNavClick}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <NavLink
              to="/monitoring"
              className={linkClass}
              onClick={handleNavClick}
            >
              Monitoring
            </NavLink>

            <div className="cp-mobile-drawer__subLinks cp-mobile-drawer__subLinks--nested">
              {MONITORING_LINKS.map((item) => (
                <a
                  key={item.href}
                  className="cp-mobile-drawer__subLink"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavClick}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <NavLink
              to="/downloads"
              className={linkClass}
              onClick={handleNavClick}
            >
              Downloads
            </NavLink>

            <NavLink
              to="/contact"
              className={linkClass}
              onClick={handleNavClick}
            >
              Contact Us
            </NavLink>
          </div>

          <button
            className="cp-mobile-drawer__cta"
            onClick={() => {
              setMenuOpen(false);
              setIsModalOpen(true);
            }}
          >
            GET QUOTE
          </button>
        </div>
      </nav>

      {isModalOpen && <QuoteModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
