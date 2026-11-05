import { useState, useEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { getProductsByMainAndPhase } from "../../data/productsData";

function ArrowRightIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.5 10h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 5.5l4.5 4.5L11 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

const buildProductMenuHref = (mainTabKey, phaseKey) => {
  const params = new URLSearchParams({ tab: mainTabKey });
  if (phaseKey && mainTabKey !== "micro" && mainTabKey !== "storage") {
    params.set("phase", phaseKey);
  }
  return `/products?${params.toString()}`;
};

const getProductPreviewCards = (mainTabKey, phaseKey) =>
  getProductsByMainAndPhase(mainTabKey, phaseKey).slice(0, 3);

const PRODUCT_MEGA_MENU = [
  {
    key: "ongrid",
    label: "On-Grid Inverters",
    tagline: "Grid-tied inverter range for residential, commercial, and industrial solar projects.",
    allLink: buildProductMenuHref("ongrid", "single"),
    views: [
      {
        key: "ongrid-single",
        title: "Single Phase Range",
        link: buildProductMenuHref("ongrid", "single"),
        cards: getProductPreviewCards("ongrid", "single"),
      },
      {
        key: "ongrid-three",
        title: "Three Phase Range",
        link: buildProductMenuHref("ongrid", "three"),
        cards: getProductPreviewCards("ongrid", "three"),
      },
    ],
  },
  {
    key: "hybrid",
    label: "Hybrid Inverters",
    tagline: "Storage-ready inverter systems for self-consumption and smarter energy control.",
    allLink: buildProductMenuHref("hybrid", "single"),
    views: [
      {
        key: "hybrid-single",
        title: "Single Phase Hybrid",
        link: buildProductMenuHref("hybrid", "single"),
        cards: getProductPreviewCards("hybrid", "single"),
      },
      {
        key: "hybrid-three",
        title: "Three Phase Hybrid",
        link: buildProductMenuHref("hybrid", "three"),
        cards: getProductPreviewCards("hybrid", "three"),
      },
    ],
  },
  {
    key: "micro",
    label: "Micro Inverters",
    tagline: "Module-level power conversion for flexible rooftops and smarter visibility.",
    allLink: buildProductMenuHref("micro"),
    views: [
      {
        key: "micro-single",
        title: "Micro Inverter Products",
        link: buildProductMenuHref("micro"),
        cards: getProductPreviewCards("micro", "single"),
      },
    ],
  },
  {
    key: "storage",
    label: "Energy Storage",
    tagline: "High-density LiFePO4 rack & wall mount battery systems for reliable 24/7 solar backup.",
    allLink: buildProductMenuHref("storage"),
    views: [
      {
        key: "storage-all",
        title: "LiFePO4 Battery Systems",
        link: buildProductMenuHref("storage"),
        cards: getProductPreviewCards("storage"),
      },
    ],
  },
];

const DEFAULT_MEGA_FAMILY = "ongrid";

const ProductMegaMenu = forwardRef(function ProductMegaMenu(
  { isOpen, onMouseEnter, onMouseLeave, onFocusCapture, onBlurCapture, onLinkClick },
  ref
) {
  const [activeFamily, setActiveFamily] = useState(DEFAULT_MEGA_FAMILY);

  // Reset to default on-grid category when closed
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setActiveFamily(DEFAULT_MEGA_FAMILY);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div
      ref={ref}
      className={`cp-header__megaWrap ${isOpen ? "open" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocusCapture={onFocusCapture}
      onBlurCapture={onBlurCapture}
    >
      <div className="cp-header__megaMenu">
        {/* ── Left Column: Intro & Features & Bottom Action ── */}
        <aside className="cp-header__megaIntro">
          <div className="cp-header__megaIntroTop">
            <h2
              className="cp-header__megaIntroHeading"
              style={{
                margin: "0 0 7px 0",
                fontSize: "17px",
                fontWeight: 500,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                color: "#0f172a",
                whiteSpace: "nowrap",
              }}
            >
              Our Products
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "12.5px",
                color: "#64748b",
                lineHeight: 1.5,
              }}
            >
              Full range of Solar &amp; Energy Inverter products
            </p>

            <div className="cp-header__megaIntroFeatures">
              <div className="cp-header__megaIntroFeature">
                <span className="cp-header__megaIntroDot" />
                <span>Grid-Tied &amp; Hybrid Storage</span>
              </div>
              <div className="cp-header__megaIntroFeature">
                <span className="cp-header__megaIntroDot" />
                <span>Up to 98.6% Peak Efficiency</span>
              </div>
              <div className="cp-header__megaIntroFeature">
                <span className="cp-header__megaIntroDot" />
                <span>Dual MPPT &amp; IP66</span>
              </div>
            </div>
          </div>

          <Link
            to="/products"
            className="cp-header__megaIntroLink"
            onClick={onLinkClick}
          >
            <span>Explore All Inverters</span>
            <span aria-hidden="true">
              <ArrowRightIcon size={13} />
            </span>
          </Link>
        </aside>

        {/* ── Middle Column: Categories & Downloads Sidebar ── */}
        <div className="cp-header__megaSidebar">
          <p className="cp-header__megaSidebarHeading">Products</p>
          {PRODUCT_MEGA_MENU.map((family) => (
            <button
              key={family.key}
              type="button"
              className={`cp-header__megaFamily ${
                activeFamily === family.key ? "is-active" : ""
              }`}
              onMouseEnter={() => setActiveFamily(family.key)}
              onFocus={() => setActiveFamily(family.key)}
            >
              <span className="cp-header__megaFamilyCopy">
                <strong>{family.label}</strong>
              </span>
            </button>
          ))}

          <div className="cp-header__megaSidebarSoftware">
            <p className="cp-header__megaSidebarHeading">Software</p>
            <Link
              to="/downloads"
              className={`cp-header__megaSoftLink ${
                activeFamily === "downloads" ? "is-active" : ""
              }`}
              onMouseEnter={() => setActiveFamily("downloads")}
              onFocus={() => setActiveFamily("downloads")}
              onClick={onLinkClick}
            >
              <span>Downloads</span>
              <span aria-hidden="true">
                <ArrowRightIcon size={12} />
              </span>
            </Link>
          </div>
        </div>

        {/* ── Right Column: Interactive Product Showcase Panels ── */}
        <div className="cp-header__megaPanels">
          {PRODUCT_MEGA_MENU.map((family) => (
            <div
              key={family.key}
              className={`cp-header__megaContent ${
                activeFamily === family.key ? "is-active" : ""
              }`}
            >
              <div className="cp-header__megaContentTop">
                <h3
                  className="cp-header__megaPanelHeading"
                  style={{
                    margin: 0,
                    fontSize: "17px",
                    fontWeight: 500,
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                    color: "#0f172a",
                  }}
                >
                  {family.label}
                </h3>
                <Link
                  to={family.allLink}
                  className="cp-header__megaRoundLink"
                  onClick={onLinkClick}
                  aria-label={`View all ${family.label}`}
                >
                  <ArrowRightIcon size={11} />
                </Link>
              </div>

              {family.views.map((view) => (
                <section key={view.key} className="cp-header__megaShowcase">
                  <Link
                    to={view.link}
                    className="cp-header__megaSubHeader"
                    onClick={onLinkClick}
                  >
                    <span>{view.title}</span>
                    <span className="cp-header__megaSubArrow" aria-hidden="true">
                      <ArrowRightIcon size={10} />
                    </span>
                  </Link>

                  <div className="cp-header__megaCards">
                    {view.cards.map((product) => (
                      <Link
                        key={product.id}
                        to={`/products/${product.slug}`}
                        className="cp-header__megaCard"
                        onClick={onLinkClick}
                      >
                        <div className="cp-header__megaCardMedia">
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="eager"
                            decoding="async"
                            draggable="false"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (!target.dataset.fallbackTried) {
                                target.dataset.fallbackTried = "1";
                                target.src = `/images/products/${encodeURIComponent(product.name)}.png`;
                              } else if (target.dataset.fallbackTried === "1") {
                                target.dataset.fallbackTried = "2";
                                target.src = "/favicon.png";
                              }
                            }}
                          />
                        </div>
                        <strong className="cp-header__megaCardName">
                          {product.name}
                        </strong>
                        <span className="cp-header__megaCardMeta">
                          {product.meta.split("|")[0]?.trim()}
                        </span>
                      </Link>
                    ))}

                    <Link
                      to={view.link}
                      className="cp-header__megaCardCta"
                      onClick={onLinkClick}
                    >
                      <span className="cp-header__megaCardCtaIcon" aria-hidden="true">
                        <ArrowRightIcon size={13} />
                      </span>
                      <span>All Products</span>
                    </Link>
                  </div>
                </section>
              ))}
            </div>
          ))}

          {/* ── Interactive Downloads Showcase Panel ── */}
          <div
            className={`cp-header__megaContent ${
              activeFamily === "downloads" ? "is-active" : ""
            }`}
          >
            <div className="cp-header__megaContentTop">
              <h3
                className="cp-header__megaPanelHeading"
                style={{
                  margin: 0,
                  fontSize: "17px",
                  fontWeight: 500,
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                  color: "#0f172a",
                }}
              >
                Downloads &amp; Documentation
              </h3>
              <Link
                to="/downloads"
                className="cp-header__megaRoundLink"
                onClick={onLinkClick}
                aria-label="View all Downloads"
              >
                <ArrowRightIcon size={11} />
              </Link>
            </div>

            <section className="cp-header__megaShowcase">
              <Link
                to="/downloads"
                className="cp-header__megaSubHeader"
                onClick={onLinkClick}
              >
                <span>Datasheets &amp; Technical Manuals</span>
                <span className="cp-header__megaSubArrow" aria-hidden="true">
                  <ArrowRightIcon size={10} />
                </span>
              </Link>

              <div className="cp-header__megaDownloadGrid">
                <Link to="/downloads" className="cp-header__megaDownloadCard" onClick={onLinkClick}>
                  <div className="cp-header__megaDownloadIcon">
                    <DocumentIcon />
                  </div>
                  <div className="cp-header__megaDownloadInfo">
                    <strong>User Installation Manuals</strong>
                    <span>Wiring, safety &amp; mounting guides</span>
                  </div>
                </Link>

                <Link to="/downloads" className="cp-header__megaDownloadCard" onClick={onLinkClick}>
                  <div className="cp-header__megaDownloadIcon">
                    <DocumentIcon />
                  </div>
                  <div className="cp-header__megaDownloadInfo">
                    <strong>Technical Datasheets</strong>
                    <span>Electrical &amp; MPPT specifications</span>
                  </div>
                </Link>

                <Link to="/downloads" className="cp-header__megaDownloadCard" onClick={onLinkClick}>
                  <div className="cp-header__megaDownloadIcon">
                    <DocumentIcon />
                  </div>
                  <div className="cp-header__megaDownloadInfo">
                    <strong>Compliance &amp; BIS</strong>
                    <span>Certificates &amp; grid standards</span>
                  </div>
                </Link>
              </div>
            </section>

            <section className="cp-header__megaShowcase">
              <Link
                to="/monitoring"
                className="cp-header__megaSubHeader"
                onClick={onLinkClick}
              >
                <span>Solar Cloud Monitoring &amp; Tools</span>
                <span className="cp-header__megaSubArrow" aria-hidden="true">
                  <ArrowRightIcon size={10} />
                </span>
              </Link>

              <div className="cp-header__megaDownloadGrid">
                <a
                  href="https://uat.thesolarcloud.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cp-header__megaDownloadCard"
                  onClick={onLinkClick}
                >
                  <div className="cp-header__megaDownloadIcon">
                    <CloudIcon />
                  </div>
                  <div className="cp-header__megaDownloadInfo">
                    <strong>Cathode Solar Cloud</strong>
                    <span>Fleet telemetry &amp; yield analysis</span>
                  </div>
                </a>

                <a
                  href="https://thesolarview.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cp-header__megaDownloadCard"
                  onClick={onLinkClick}
                >
                  <div className="cp-header__megaDownloadIcon">
                    <CloudIcon />
                  </div>
                  <div className="cp-header__megaDownloadInfo">
                    <strong>Solar View Mobile</strong>
                    <span>Inverter tracking on iOS &amp; Android</span>
                  </div>
                </a>

                <a
                  href="https://service.cathodepower.com/cathode/warranty-registration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cp-header__megaDownloadCard"
                  onClick={onLinkClick}
                >
                  <div className="cp-header__megaDownloadIcon">
                    <ShieldIcon />
                  </div>
                  <div className="cp-header__megaDownloadInfo">
                    <strong>Warranty Portal</strong>
                    <span>Equipment registration &amp; claims</span>
                  </div>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductMegaMenu;
