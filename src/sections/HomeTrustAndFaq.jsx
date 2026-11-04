import { useState } from "react";
import "./HomeTrustAndFaq.css";

const CERTS = [
  { label: "BIS Certified", sub: "Bureau of Indian Standards" },
  { label: "MNRE Approved", sub: "National Rooftop Scheme" },
  { label: "IEC 62109-1 / 2", sub: "Global Power Converter Safety" },
  { label: "IP66 Ingress", sub: "All-Weather Enclosure" },
  { label: "ISO 9001:2015", sub: "Quality Management" },
];

const FAQS = [
  {
    q: "Are Cathode Power inverters approved for the PM Surya Ghar: Muft Bijli Yojana subsidy?",
    a: "Yes! Cathode Power single-phase and three-phase on-grid inverters strictly comply with MNRE technical specifications and BIS standards required for the national PM Surya Ghar subsidy portal, ensuring swift vendor approvals and direct DBT subsidy releases for homeowners.",
  },
  {
    q: "What makes Cathode Power's Dual MPPT technology superior for Indian rooftops?",
    a: "Indian residential and commercial roofs often feature split slopes, rooftop water tanks, or partial tree shading. Cathode Power's independent Dual MPPT trackers optimize two separate string voltages independently, so morning or afternoon shading on one string never degrades the power harvest of the other.",
  },
  {
    q: "How does the hybrid inverter coordinate solar, battery, and the utility grid?",
    a: "Cathode Power hybrid inverters act as an intelligent energy routing hub. During the day, solar first powers daytime household loads, and excess electricity is stored into the battery. During evening peak tariff hours or unexpected power outages, the inverter seamlessly transitions into UPS mode in under 10ms with zero device reset.",
  },
  {
    q: "What is the warranty and expected operating lifespan of Cathode Power inverters?",
    a: "Our inverters are engineered with high-grade industrial MOSFETs and patented natural thermal cooling that keeps junction temperatures below 50°C. They come with standard 5-to-10-year manufacturer warranties backed by a nationwide network of 500+ service partners across India.",
  },
  {
    q: "How do I monitor my system remotely?",
    a: "All models integrate seamlessly with our Solar View app and Solar Cloud platform via plug-and-play Wi-Fi or 4G dongles. You can view real-time generation, consumption charts, historical savings, and receive automated diagnostic alerts from your mobile phone 24/7.",
  },
];

export default function HomeTrustAndFaq() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section className="htf-section" id="faq">
      <div className="htf-container">
        {/* Certification badges strip */}
        <div className="htf-certs">
          {CERTS.map((c, i) => (
            <div key={i} className="htf-cert-item">
              <div className="htf-cert-icon">✓</div>
              <div>
                <div>{c.label}</div>
                <small style={{ color: "#64748b", fontSize: "0.72rem" }}>
                  {c.sub}
                </small>
              </div>
            </div>
          ))}
        </div>

        <div className="htf-header">
          <span className="htf-eyebrow">Frequently Asked Questions</span>
          <h2 className="htf-title">Frequently Asked Questions</h2>
          <p className="htf-desc">
            Everything you need to know about Cathode Power technology,
            subsidies, installation, and long-term warranties.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="htf-faq-list">
          {FAQS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`htf-faq-card ${isOpen ? "is-open" : ""}`}
              >
                <button
                  type="button"
                  className="htf-faq-btn"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span>
                    <span className="htf-faq-num">
                      {String(idx + 1).padStart(2, "0")}.
                    </span>
                    {item.q}
                  </span>
                  <span className="htf-faq-toggle">+</span>
                </button>

                {isOpen && (
                  <div className="htf-faq-answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
