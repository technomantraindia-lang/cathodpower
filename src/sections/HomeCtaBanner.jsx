import "./HomeCtaBanner.css";

export default function HomeCtaBanner({ onOpenQuote }) {
  const WHATSAPP_NUMBER = "919800268002";
  const defaultMsg = encodeURIComponent(
    "Hello Cathode Power! I'm interested in getting a quote and technical consultation for your solar inverters."
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMsg}`;

  return (
    <section className="hcta-section">
      <div className="hcta-container">
        <span className="hcta-eyebrow">Ready for Clean Energy?</span>
        <h2 className="hcta-title">
          Power Your Solar Project with <span>Cathode Power</span>
        </h2>
        <p className="hcta-desc">
          Whether you are a homeowner seeking clean energy independence or an
          EPC installer engineering mega-scale industrial plants, Cathode Power
          provides the high-yield hardware, monitoring, and local support you
          need.
        </p>

        <div className="hcta-actions">
          <button
            type="button"
            onClick={onOpenQuote}
            className="hcta-btn-quote"
          >
            Request Instant Quote
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hcta-btn-whatsapp"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>Chat on WhatsApp</span>
          </a>

          <a href="tel:+919800268002" className="hcta-btn-phone">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l1.12-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>+91 98002 68002</span>
          </a>
        </div>

        <div className="hcta-footer-note">
          <span>✓ Pan-India Service Support</span>
          <span>✓ Direct Manufacturer Pricing</span>
          <span>✓ Free Technical Consultation</span>
        </div>
      </div>
    </section>
  );
}
