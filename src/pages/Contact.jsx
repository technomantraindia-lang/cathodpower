import { useState } from "react";
import "./Contact.css";

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l1.12-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const WebIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.42C8.94 7.42 8.67 7.48 8.44 7.74C8.21 7.99 7.56 8.6 7.56 9.84C7.56 11.08 8.46 12.28 8.59 12.45C8.72 12.62 10.33 15.24 12.87 16.23C14.98 17.06 15.42 16.89 15.87 16.85C16.32 16.81 17.33 16.25 17.54 15.67C17.75 15.09 17.75 14.59 17.69 14.49C17.63 14.38 17.46 14.32 17.21 14.2C16.96 14.07 15.74 13.47 15.51 13.39C15.28 13.3 15.12 13.26 14.95 13.51C14.78 13.75 14.31 14.32 14.16 14.49C14.02 14.65 13.87 14.67 13.62 14.55C13.37 14.42 12.57 14.16 11.62 13.31C10.87 12.65 10.37 11.83 10.22 11.58C10.08 11.33 10.2 11.2 10.33 11.07C10.44 10.96 10.58 10.78 10.71 10.63C10.83 10.48 10.87 10.37 10.96 10.2C11.04 10.04 11 9.89 10.94 9.77C10.87 9.65 10.37 8.42 10.17 7.91C9.97 7.42 9.76 7.49 9.6 7.48C9.45 7.47 9.29 7.42 9.11 7.42Z"/>
  </svg>
);

const ZONAL_CONTACTS = [
  {
    id: "north",
    zone: "North Zone",
    badge: "North India",
    coverage: "Delhi NCR, Punjab, Haryana, Uttar Pradesh, Rajasthan, Himachal Pradesh, J&K, Uttarakhand",
    accent: "#ff6a00",
    icon: "🧭",
    phones: [
      { display: "+91 91840 15956", tel: "+919184015956", wa: "919184015956" }
    ]
  },
  {
    id: "south",
    zone: "South Zone",
    badge: "South India",
    coverage: "Karnataka, Tamil Nadu, Telangana, Andhra Pradesh, Kerala",
    accent: "#10b981",
    icon: "📍",
    phones: [
      { display: "+91 87996 73588", tel: "+918799673588", wa: "918799673588" }
    ]
  },
  {
    id: "east",
    zone: "East Zone",
    badge: "East & North East",
    coverage: "West Bengal, Bihar, Odisha, Jharkhand, Assam & North Eastern States",
    accent: "#0284c7",
    icon: "⚡",
    phones: [
      { display: "+91 75748 17779", tel: "+917574817779", wa: "917574817779" }
    ]
  },
  {
    id: "west",
    zone: "West Zone",
    badge: "West & Central India",
    coverage: "Gujarat, Maharashtra, Goa, Madhya Pradesh, Chhattisgarh",
    accent: "#d97706",
    icon: "🏭",
    phones: [
      { display: "+91 92130 13462", tel: "+919213013462", wa: "919213013462" },
      { display: "+91 91840 15960", tel: "+919184015960", wa: "919184015960" }
    ]
  }
];

const Contact = () => {
  const DEFAULT_WHATSAPP = "919800268002";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    regionZone: "",
    enquiryType: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const lines = [
      "New Contact Enquiry (Website)",
      "",
      `Name: ${formData.firstName} ${formData.lastName}`.trim(),
      `Email: ${formData.email}`.trim(),
      formData.phone ? `Phone: ${formData.phone}` : null,
      formData.company ? `Company: ${formData.company}` : null,
      formData.regionZone ? `Region / Zone: ${formData.regionZone}` : null,
      formData.enquiryType ? `Enquiry Type: ${formData.enquiryType}` : null,
      "",
      "Message:",
      formData.message,
    ].filter(Boolean);

    // Target the specific regional WhatsApp if zone is selected
    const zoneWaMap = {
      "North Zone": "919184015956",
      "South Zone": "918799673588",
      "East Zone": "917574817779",
      "West Zone": "919184015960",
    };
    const targetWa = zoneWaMap[formData.regionZone] || DEFAULT_WHATSAPP;

    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${targetWa}?text=${text}`;

    window.open(url, "_blank", "noopener,noreferrer");

    // Clear form after opening WhatsApp
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      regionZone: "",
      enquiryType: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">

      {/* ── HERO BANNER ── */}
      <section className="contact-hero">
        <div className="contact-hero-bg" />
        <div className="contact-hero-inner">
          <p className="contact-eyebrow">
            <span className="contact-eyebrow-dot" />
            Get In Touch
          </p>
          <h1>Let's Start a<br />Conversation</h1>
          <p className="contact-sub">
            Reach out to our team for sales, technical consultation,
            partnerships, or connect directly with our regional zone offices across India.
          </p>
          <div className="contact-hero-btns">
            <a
              href="#regional-contacts"
              className="contact-hero-btn solid"
            >
              Regional Contacts ↓
            </a>
            <a
              href="https://wa.me/919800268002"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-hero-btn outline"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </section>

      {/* ── REGIONAL ZONAL CONTACTS NETWORK ── */}
      <section className="contact-zonal-section" id="regional-contacts">
        <div className="contact-zonal-inner">
          <div className="contact-zonal-heading">
            <p className="contact-eyebrow">
              <span className="contact-eyebrow-dot" />
              Pan-India Regional Sales Network
            </p>
            <h2>Connect With Your <span>Regional Zone Office</span></h2>
            <p className="section-desc">
              Direct access to our authorized territory sales &amp; technical managers for rapid quotes,
              site sizing, and commercial solar project support.
            </p>
          </div>

          <div className="contact-zonal-grid">
            {ZONAL_CONTACTS.map((z) => (
              <div key={z.id} className="zonal-card" style={{ "--zone-accent": z.accent }}>
                <div className="zonal-card-top">
                  <span className="zonal-badge">{z.badge}</span>
                  <span className="zonal-icon">{z.icon}</span>
                </div>
                <h3 className="zonal-title">{z.zone}</h3>
                <p className="zonal-coverage">{z.coverage}</p>

                <div className="zonal-phones-wrap">
                  {z.phones.map((p, idx) => (
                    <div key={idx} className="zonal-phone-row">
                      <div className="zonal-phone-num">
                        <PhoneIcon />
                        <span>{p.display}</span>
                      </div>
                      <div className="zonal-actions">
                        <a
                          href={`tel:${p.tel}`}
                          className="zonal-btn call"
                          title={`Call ${z.zone}`}
                        >
                          Call
                        </a>
                        <a
                          href={`https://wa.me/${p.wa}?text=${encodeURIComponent(`Hello Cathode Power ${z.zone} Team, I would like to inquire about your solar inverters.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="zonal-btn whatsapp"
                          title={`WhatsApp ${z.zone}`}
                        >
                          <WhatsAppIcon />
                          <span>Chat</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT BODY (FORM + SIDEBAR) ── */}
      <section className="contact-body" id="contact-form">

        <div className="contact-body-heading">
          <p className="section-eyebrow">
            <span className="contact-eyebrow-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#f97316", display: "inline-block", marginRight: 8 }} />
            Send a Message
          </p>
          <h2>We'd Love to <span>Hear From You</span></h2>
          <p className="section-desc">Reach out to our team for sales, support, partnerships or general inquiries.</p>
        </div>

        <div className="contact-body-grid">

          {/* LEFT SIDEBAR */}
          <aside className="contact-sidebar">
            <div className="info-card">
              <p className="info-card-label">Corporate Office</p>
              <p>
                SF 201-203, Fortune Platinum,<br />
                Nr. Tulsidham Circle, Manjalpur,<br />
                Vadodara, Gujarat — 390011
              </p>
            </div>
            <div className="info-card">
              <p className="info-card-label">Factory Office</p>
              <p>
                R.S. No. 229, Sugar Factory,<br />
                Ta. Karjan, Opp. Gandhara,<br />
                Gandhara, Gujarat — 391210
              </p>
            </div>

            {/* QUICK ZONAL DIRECT LINES WIDGET */}
            <div className="sidebar-zonal-box">
              <div className="sidebar-zonal-title">
                <span className="sidebar-zonal-badge">⚡ Regional Lines</span>
              </div>
              <ul className="sidebar-zonal-list">
                <li>
                  <span className="sz-zone">North Zone:</span>
                  <a href="tel:+919184015956" className="sz-num">+91 91840 15956</a>
                </li>
                <li>
                  <span className="sz-zone">South Zone:</span>
                  <a href="tel:+918799673588" className="sz-num">+91 87996 73588</a>
                </li>
                <li>
                  <span className="sz-zone">East Zone:</span>
                  <a href="tel:+917574817779" className="sz-num">+91 75748 17779</a>
                </li>
                <li>
                  <span className="sz-zone">West Zone:</span>
                  <div className="sz-multiline">
                    <a href="tel:+919213013462" className="sz-num">+91 92130 13462</a>
                    <a href="tel:+919184015960" className="sz-num">+91 91840 15960</a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="info-details">
              <div className="info-detail-row">
                <div className="info-detail-icon"><PhoneIcon /></div>
                <div className="info-detail-content">
                  <strong>Corporate Phone</strong>
                  <span>+91 98002 68002</span>
                </div>
              </div>
              <div className="info-detail-row">
                <div className="info-detail-icon"><EmailIcon /></div>
                <div className="info-detail-content">
                  <strong>Email</strong>
                  <span>hello@cathodepower.com</span>
                </div>
              </div>
              <div className="info-detail-row">
                <div className="info-detail-icon"><WebIcon /></div>
                <div className="info-detail-content">
                  <strong>Website</strong>
                  <span>www.cathodepower.com</span>
                </div>
              </div>
            </div>
            <div className="support-card">
              <div className="support-card-tag">⚡ After-Sales</div>
              <h3>Need Support?</h3>
              <p>Warranty claims, service enquiries, or technical support — our team is ready.</p>
              <a
                href="tel:+919800268002"
                className="support-cta"
                aria-label="Call support, +91 98002 68002"
              >
                Contact Support →
              </a>
            </div>
          </aside>

          {/* RIGHT FORM */}
          <div className="form-card">
            <div className="form-card-header">
              <h2>Send Us a Message</h2>
              <p>We typically respond within 24 hours.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <div className="form-grid">
                  <div>
                    <label className="field-label">First Name *</label>
                    <input type="text" name="firstName" placeholder="John" required value={formData.firstName} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="field-label">Last Name *</label>
                    <input type="text" name="lastName" placeholder="Doe" required value={formData.lastName} onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div className="field-group">
                <div className="form-grid">
                  <div>
                    <label className="field-label">Email *</label>
                    <input type="email" name="email" placeholder="john@company.com" required value={formData.email} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="field-label">Phone</label>
                    <input type="tel" name="phone" placeholder="+91 98000 00000" value={formData.phone} onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div className="field-group">
                <label className="field-label">Company Name</label>
                <input type="text" name="company" placeholder="Your Company Pvt. Ltd." value={formData.company} onChange={handleChange} />
              </div>
              <div className="field-group">
                <div className="form-grid">
                  <div>
                    <label className="field-label">Your Region / Zone</label>
                    <select name="regionZone" value={formData.regionZone} onChange={handleChange}>
                      <option value="">Select your region</option>
                      <option value="North Zone">North Zone (Delhi NCR, Punjab, Haryana, UP, Rajasthan, HP, UK)</option>
                      <option value="South Zone">South Zone (Karnataka, Tamil Nadu, Telangana, AP, Kerala)</option>
                      <option value="East Zone">East Zone (WB, Bihar, Odisha, Jharkhand, Assam & NE)</option>
                      <option value="West Zone">West Zone (Gujarat, Maharashtra, Goa, MP, CG)</option>
                      <option value="Pan-India / Other">Pan-India / Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="field-label">Enquiry Type</label>
                    <select name="enquiryType" value={formData.enquiryType} onChange={handleChange}>
                      <option value="">Select an option</option>
                      <option value="sales">Sales &amp; Quotation</option>
                      <option value="support">Technical Support</option>
                      <option value="dealership">Dealership / Distributorship</option>
                      <option value="partnership">EPC / Project Partnership</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-divider" />
              <div className="field-group">
                <label className="field-label">Your Message *</label>
                <textarea name="message" placeholder="Tell us how we can help you..." rows="5" required value={formData.message} onChange={handleChange} />
              </div>
              <button type="submit" className="form-submit">
                <span>Send Message on WhatsApp →</span>
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;