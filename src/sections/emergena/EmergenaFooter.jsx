import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/CATHODE-POWER-REGISTER-LOGO.png";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/cathodepower/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/cathode-power-pvt-ltd/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/Cathode-Power-Private-Limited/61566137214231/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

export default function EmergenaFooter() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState("idle"); // "idle" | "success" | "error"

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (trimmed && trimmed.includes("@") && trimmed.includes(".")) {
      setFormState("success");
      setEmail("");
    } else {
      setFormState("error");
    }
  };

  const scrollToTop = useCallback((e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <footer className="main-section footer section" style={{ backgroundColor: "#f6f7f5", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div className="w-layout-blockcontainer main-container w-container">
        <div className="footer-content-wrapper">
          {/* Left Column: Cathode Power Logo, Tagline Description, and Newsletter Subscribe */}
          <div className="left-content-wrap footer" style={{ maxWidth: "420px" }}>
            <div className="logo-wrapper">
              <Link
                to="/"
                onClick={scrollToTop}
                aria-label="Cathode Power"
                className="logo-link w-inline-block w--current"
                style={{ display: "inline-block" }}
              >
                <div className="logo-brand footer" style={{ height: "auto", display: "flex", alignItems: "center" }}>
                  <img
                    loading="lazy"
                    src={logo}
                    alt="Cathode Power"
                    className="image"
                    style={{ height: "74px", width: "auto", maxWidth: "320px", objectFit: "contain", display: "block" }}
                  />
                </div>
              </Link>
              <div className="description-wrap center-mobile" style={{ marginTop: "16px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#ff6a00", marginBottom: "6px" }}>
                  Powering A Sustainable Future
                </div>
                <div className="text-xs" style={{ color: "#3a4a44", lineHeight: "1.6" }}>
                  India&apos;s trusted solar inverter manufacturer, delivering reliable, high-efficiency energy systems for residential, commercial &amp; industrial scale.
                </div>
              </div>
            </div>

            {/* Newsletter Subscription Form */}
            <div className="form-block-footer w-form" style={{ marginTop: "20px" }}>
              {formState !== "success" ? (
                <form
                  id="email-form"
                  name="email-form"
                  data-name="Email Form"
                  className="form-footer-wrapper"
                  onSubmit={handleSubmit}
                  style={{ display: "flex", gap: "8px" }}
                >
                  <input
                    className="field-subscribe w-input"
                    maxLength={256}
                    name="email"
                    data-name="Email"
                    aria-label="subscribe"
                    placeholder="Enter your email address"
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (formState === "error") setFormState("idle");
                    }}
                    style={{
                      borderRadius: "999px",
                      border: "1px solid rgba(0,0,0,0.12)",
                      padding: "10px 18px",
                      fontSize: "13.5px",
                    }}
                  />
                  <button
                    type="submit"
                    aria-label="submit"
                    className="cta-subsribe w-button"
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#ff6a00",
                      borderColor: "#ff6a00",
                      color: "#fff",
                      fontWeight: 600,
                      borderRadius: "999px",
                      padding: "10px 22px",
                      fontSize: "13.5px",
                      transition: "all 0.2s ease",
                      border: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#ff7a18";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ff6a00";
                    }}
                  >
                    Subscribe
                  </button>
                </form>
              ) : null}

              {/* Success Notification */}
              {formState === "success" && (
                <div
                  className="success-message w-form-done"
                  style={{ display: "block", backgroundColor: "rgba(255, 106, 0, 0.08)", color: "#d65800", padding: "12px 16px", borderRadius: "10px", fontWeight: 500, fontSize: "13px" }}
                >
                  <div>Thank you! You are now subscribed to Cathode Power updates.</div>
                </div>
              )}

              {/* Error Notification */}
              {formState === "error" && (
                <div
                  className="error-message w-form-fail"
                  style={{ display: "block", backgroundColor: "rgba(220, 38, 38, 0.08)", color: "#dc2626", padding: "10px 14px", borderRadius: "10px", marginTop: "8px", fontSize: "12.5px" }}
                >
                  <div className="error-item-block">
                    <div className="text-error-wrap">
                      <div className="error-text">
                        Please enter a valid email address.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: 4 Cathode Power Navigation Columns */}
          <div className="right-content-wrap">
            <div className="footer-menu">
              <div className="features-footer">
                {/* Column 1: Products */}
                <div className="footer-link">
                  <div className="footer-link-title">
                    <div className="text-tag footer" style={{ fontWeight: 700, letterSpacing: "1px", color: "#111816" }}>Products</div>
                  </div>
                  <div className="wrapper-link-footer">
                    <Link
                      to="/products"
                      className="link-quick-links w-inline-block"
                      style={{ transition: "color 0.2s ease, transform 0.2s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#ff6a00"; e.currentTarget.style.transform = "translateX(2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = ""; e.currentTarget.style.transform = "translateX(0)"; }}
                    >
                      <div className="quick-links">
                        <div className="text-xxs">On-Grid Inverters</div>
                      </div>
                    </Link>
                    <Link
                      to="/products"
                      className="link-quick-links w-inline-block"
                      style={{ transition: "color 0.2s ease, transform 0.2s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#ff6a00"; e.currentTarget.style.transform = "translateX(2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = ""; e.currentTarget.style.transform = "translateX(0)"; }}
                    >
                      <div className="quick-links">
                        <div className="text-xxs">Hybrid Inverters</div>
                      </div>
                    </Link>
                    <Link
                      to="/products"
                      className="link-quick-links w-inline-block"
                      style={{ transition: "color 0.2s ease, transform 0.2s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#ff6a00"; e.currentTarget.style.transform = "translateX(2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = ""; e.currentTarget.style.transform = "translateX(0)"; }}
                    >
                      <div className="quick-links">
                        <div className="text-xxs">Micro Inverters</div>
                      </div>
                    </Link>
                    <Link
                      to="/products"
                      className="link-quick-links w-inline-block"
                      style={{ transition: "color 0.2s ease, transform 0.2s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#ff6a00"; e.currentTarget.style.transform = "translateX(2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = ""; e.currentTarget.style.transform = "translateX(0)"; }}
                    >
                      <div className="quick-links">
                        <div className="text-xxs">All Inverters</div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Column 2: Solutions */}
                <div className="footer-link">
                  <div className="footer-link-title">
                    <div className="text-tag footer" style={{ fontWeight: 700, letterSpacing: "1px", color: "#111816" }}>Solutions</div>
                  </div>
                  <div className="wrapper-link-footer">
                    <Link
                      to="/ci"
                      className="link-utilities w-inline-block"
                      style={{ transition: "color 0.2s ease, transform 0.2s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#ff6a00"; e.currentTarget.style.transform = "translateX(2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = ""; e.currentTarget.style.transform = "translateX(0)"; }}
                    >
                      <div className="quick-links">
                        <div className="text-xxs">Commercial &amp; Industrial</div>
                      </div>
                    </Link>
                    <Link
                      to="/monitoring"
                      className="link-utilities w-inline-block"
                      style={{ transition: "color 0.2s ease, transform 0.2s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#ff6a00"; e.currentTarget.style.transform = "translateX(2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = ""; e.currentTarget.style.transform = "translateX(0)"; }}
                    >
                      <div className="quick-links">
                        <div className="text-xxs">Solar View Monitoring</div>
                      </div>
                    </Link>
                    <Link
                      to="/downloads"
                      className="link-utilities w-inline-block"
                      style={{ transition: "color 0.2s ease, transform 0.2s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#ff6a00"; e.currentTarget.style.transform = "translateX(2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = ""; e.currentTarget.style.transform = "translateX(0)"; }}
                    >
                      <div className="quick-links">
                        <div className="text-xxs">Downloads &amp; Datasheets</div>
                      </div>
                    </Link>
                    <a
                      href="https://service.cathodepower.com/cathode/epc-dealer-login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-utilities w-inline-block"
                      style={{ transition: "color 0.2s ease, transform 0.2s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#ff6a00"; e.currentTarget.style.transform = "translateX(2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = ""; e.currentTarget.style.transform = "translateX(0)"; }}
                    >
                      <div className="quick-links">
                        <div className="text-xxs">EPC Dealer Portal ↗</div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Column 3: Company & Support */}
                <div className="footer-link">
                  <div className="footer-link-title">
                    <div className="text-tag footer" style={{ fontWeight: 700, letterSpacing: "1px", color: "#111816" }}>Company &amp; Support</div>
                  </div>
                  <div className="wrapper-link-footer">
                    <Link
                      to="/about"
                      className="link-utilities w-inline-block"
                      style={{ transition: "color 0.2s ease, transform 0.2s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#ff6a00"; e.currentTarget.style.transform = "translateX(2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = ""; e.currentTarget.style.transform = "translateX(0)"; }}
                    >
                      <div className="quick-links">
                        <div className="text-xxs">About Cathode Power</div>
                      </div>
                    </Link>
                    <a
                      href="https://service.cathodepower.com/cathode/warranty-registration"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-utilities w-inline-block"
                      style={{ transition: "color 0.2s ease, transform 0.2s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#ff6a00"; e.currentTarget.style.transform = "translateX(2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = ""; e.currentTarget.style.transform = "translateX(0)"; }}
                    >
                      <div className="quick-links">
                        <div className="text-xxs">Warranty Registration ↗</div>
                      </div>
                    </a>
                    <a
                      href="https://service.cathodepower.com/cathode/service-registration"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-utilities w-inline-block"
                      style={{ transition: "color 0.2s ease, transform 0.2s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#ff6a00"; e.currentTarget.style.transform = "translateX(2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = ""; e.currentTarget.style.transform = "translateX(0)"; }}
                    >
                      <div className="quick-links">
                        <div className="text-xxs">Service Request ↗</div>
                      </div>
                    </a>
                    <Link
                      to="/contact"
                      className="link-utilities w-inline-block"
                      style={{ transition: "color 0.2s ease, transform 0.2s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#ff6a00"; e.currentTarget.style.transform = "translateX(2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = ""; e.currentTarget.style.transform = "translateX(0)"; }}
                    >
                      <div className="quick-links">
                        <div className="text-xxs">Contact Us</div>
                      </div>
                    </Link>
                    <Link
                      to="/contact#regional-contacts"
                      className="link-utilities w-inline-block"
                      style={{ transition: "color 0.2s ease, transform 0.2s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#ff6a00"; e.currentTarget.style.transform = "translateX(2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = ""; e.currentTarget.style.transform = "translateX(0)"; }}
                    >
                      <div className="quick-links">
                        <div className="text-xxs">Regional Offices (Zonal)</div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Column 4: Follow Us */}
                <div className="footer-link">
                  <div className="footer-link-title">
                    <div className="text-tag footer" style={{ fontWeight: 700, letterSpacing: "1px", color: "#111816" }}>Follow Us</div>
                  </div>
                  <div className="wrapper-link-footer social-media" style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap", marginTop: "4px" }}>
                    {SOCIAL_LINKS.map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          backgroundColor: "#ffffff",
                          border: "1px solid rgba(0,0,0,0.08)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#1a1a18",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                          transition: "all 0.25s ease",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#ff6a00";
                          e.currentTarget.style.borderColor = "#ff6a00";
                          e.currentTarget.style.color = "#ffffff";
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "0 6px 14px rgba(255,106,0,0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#ffffff";
                          e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                          e.currentTarget.style.color = "#1a1a18";
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)";
                        }}
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="credit-footer" style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div className="text-credit-navbar">
            <div className="text-xxs" style={{ color: "#55645e" }}>
              &copy; {new Date().getFullYear()} Cathode Power Private Limited. All rights reserved.
            </div>
          </div>
          <div className="text-credit-navbar">
            <div className="text-xxs" style={{ color: "#55645e", fontWeight: 500 }}>
              Spreading Goodness with Trust • ISO 9001:2015 Certified
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
