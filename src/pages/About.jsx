import "./About.css";
import NewsletterBandSection from "../sections/NewsletterBandSection";
import AboutMilestones from "../components/about/AboutMilestones";
import AboutPresenceMap from "../components/about/AboutPresenceMap";

export default function About() {
  return (
    <div className="about-page">
      {/* Banner: preferred asset /images/about/about-factory-banner.webp
          Recommended size: 1920 × 800 (min 1600 × 700, ideal 2560 × 1067 @2x)
          Aspect ratio ~ 2.4:1 / 12:5 */}
      <section className="about-hero">
        <div className="about-hero-overlay" />
        <div className="about-hero-inner">
          <p className="about-eyebrow">
            <span className="about-eyebrow-dot" />
            About Cathode Power
          </p>
          <h1>Powering Tomorrow with Intelligent Solar &amp; Hybrid Inverters</h1>
          <p className="about-sub">
            Leading the clean energy revolution with state-of-the-art power conversion,
            precision engineering, and next-generation smart grid intelligence.
          </p>
        </div>
      </section>

      <div className="about-section">
        <div className="about-grid-2col">
          <div className="about-story">
            <h2>Pioneering Advanced Power Conversion in India</h2>
            <p>
              Cathode Power was founded with a singular conviction: to empower businesses and homes
              with robust, world-class renewable power systems built specifically to excel under the
              most demanding real-world grid conditions.
            </p>
            <p>
              From residential single-phase rooftops to large-scale three-phase commercial and industrial
              installations, our on-grid, hybrid, and micro-inverter solutions provide unmatched power
              density, intelligent telemetry, and rock-solid reliability.
            </p>
          </div>
          <div className="about-image-card">
            <img
              src="/images/factoryimages/4.jpeg"
              alt="Cathode Power Manufacturing & Precision Engineering"
              loading="lazy"
            />
          </div>
        </div>

        <div className="about-stats-grid">
          <div className="about-stat-card">
            <div className="about-stat-num">98.8%</div>
            <div className="about-stat-title">Peak European Efficiency</div>
            <div className="about-stat-desc">Industry-leading conversion performance across all our inverter families.</div>
          </div>
          <div className="about-stat-card">
            <div className="about-stat-num">ISO 9001</div>
            <div className="about-stat-title">Certified Quality</div>
            <div className="about-stat-desc">Rigorous international compliance, component vetting, and environmental stress testing.</div>
          </div>
          <div className="about-stat-card">
            <div className="about-stat-num">IP66</div>
            <div className="about-stat-title">Heavy-Duty Protection</div>
            <div className="about-stat-desc">Designed to withstand extreme temperatures, dust, humidity, and tropical rainfall.</div>
          </div>
          <div className="about-stat-card">
            <div className="about-stat-num">24/7</div>
            <div className="about-stat-title">Real-Time Telemetry</div>
            <div className="about-stat-desc">Cloud monitoring with remote diagnostics, fault alerts, and automated firmware updates.</div>
          </div>
        </div>

        <div className="about-pillars">
          <div className="about-pillars-header">
            <h2>Engineered on Uncompromising Standards</h2>
            <p>Our core engineering principles ensure maximum lifetime value and peace of mind for every installation.</p>
          </div>
          <div className="about-pillars-grid">
            <div className="about-pillar-card">
              <span className="about-pillar-tag">Standard 01</span>
              <h3>Precision Engineering</h3>
              <p>Top-tier semiconductors, advanced thermal management, and ultra-wide MPPT tracking algorithms maximize your energy harvest every single minute.</p>
            </div>
            <div className="about-pillar-card">
              <span className="about-pillar-tag">Standard 02</span>
              <h3>Grid Resilience</h3>
              <p>Integrated anti-islanding, dynamic frequency regulation, and rapid fault recovery maintain uninterrupted operation even during severe voltage sags.</p>
            </div>
            <div className="about-pillar-card">
              <span className="about-pillar-tag">Standard 03</span>
              <h3>Intelligent Ecosystem</h3>
              <p>Integrated Wi-Fi / 4G telemetry seamlessly synchronizes with our Cloud platform, providing granular module-level insight and remote EPC management.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones — mountain scroll/slider animation */}
      <AboutMilestones />

      {/* Nationwide presence map */}
      <AboutPresenceMap />

      <div className="about-section about-section--after-milestones">
        <NewsletterBandSection
          imageSrc="/images/factoryimages/5.jpeg"
          imageAlt="Cathode Power clean energy"
          source="about"
        />
      </div>
    </div>
  );
}
