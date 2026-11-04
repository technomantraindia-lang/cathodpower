import { createPortal } from "react-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import "./ProductInquiryModal.css";

const WHATSAPP_NUMBER = "919800268002";
const INQUIRY_EMAIL = "hello@cathodepower.com";

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="piEmailGrad" x1="2" y1="4" x2="22" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff6a00" />
          <stop offset="1" stopColor="#ffb36b" />
        </linearGradient>
      </defs>
      <path
        d="M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        fill="none"
        stroke="url(#piEmailGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m22 8-8.97 5.7a2 2 0 0 1-2.06 0L2 8"
        fill="none"
        stroke="url(#piEmailGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#25D366" />
      <path
        d="M15.55 13.8c-.16-.08-.94-.46-1.09-.51-.15-.06-.26-.08-.37.08-.11.16-.43.51-.52.62-.1.11-.19.12-.35.04-.16-.08-.66-.24-1.26-.77-.47-.42-.78-.93-.87-1.09-.09-.16-.01-.25.07-.33l.24-.28c.08-.1.11-.16.16-.27.05-.11.03-.2 0-.28-.03-.08-.37-.9-.51-1.23-.14-.33-.28-.28-.37-.28h-.31c-.11 0-.28.04-.43.2-.15.16-.57.56-.57 1.37s.59 1.59.67 1.7c.08.11 1.16 1.76 2.8 2.47.39.17.69.27.92.35.39.12.74.1 1.02.06.31-.05.94-.38 1.08-.75.13-.37.13-.69.09-.75-.04-.06-.15-.1-.31-.18Zm-3.43 3.2a7 7 0 0 1-3.57-.98l-.26-.15-2.5.8.83-2.44-.17-.25A7 7 0 1 1 12.12 17Zm0-12.58a5.56 5.56 0 0 0-4.73 8.45l.27.43-.48 1.4 1.44-.46.4.24a5.56 5.56 0 1 0 3.1-10.06Z"
        fill="#ffffff"
      />
    </svg>
  );
}

function buildInquiryText({ productName, productSlug, firstName, lastName, email, phone, company, message }) {
  const lines = [
    "New Product Enquiry (Website)",
    "",
    productName ? `Product: ${productName}` : null,
    productSlug ? `Product URL: /products/${productSlug}` : null,
    "",
    `Name: ${firstName} ${lastName}`.trim(),
    `Email: ${email}`.trim(),
    phone ? `Phone: ${phone}` : null,
    company ? `Company: ${company}` : null,
    "",
    "Message:",
    message,
  ].filter(Boolean);

  return lines.join("\n");
}

export default function ProductInquiryModal({ onClose, productName, productSlug }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const inquiryText = useMemo(
    () =>
      buildInquiryText({
        productName,
        productSlug,
        ...formData,
      }),
    [formData, productName, productSlug]
  );

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const updateField = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = useCallback(() => {
    if (!formData.firstName.trim()) return false;
    if (!formData.lastName.trim()) return false;
    if (!formData.email.trim()) return false;
    if (!formData.message.trim()) return false;
    return true;
  }, [formData.email, formData.firstName, formData.lastName, formData.message]);

  const handleWhatsApp = useCallback(
    (e) => {
      e.preventDefault();
      if (!validate()) return;
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(inquiryText)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      onClose();
    },
    [inquiryText, onClose, validate]
  );

  const handleEmail = useCallback(
    (e) => {
      e.preventDefault();
      if (!validate()) return;
      const subject = productName ? `Product enquiry: ${productName}` : "Product enquiry";
      const href = `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(inquiryText)}`;
      window.location.href = href;
      onClose();
    },
    [inquiryText, onClose, productName, validate]
  );

  const modal = (
    <div className="pi-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="pi-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pi-modal-close" onClick={onClose} aria-label="Close product enquiry form">
          ✕
        </button>

        <h2 className="pi-modal-title">Product Enquiry</h2>
        <p className="pi-modal-subtitle">
          {productName ? (
            <>
              Enquiring about <strong>{productName}</strong>
            </>
          ) : (
            "Share your requirements and we’ll get back quickly."
          )}
        </p>

        <form className="pi-modal-form" noValidate>
          <div className="pi-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={updateField}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={updateField}
              required
            />
          </div>

          <div className="pi-row">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={updateField}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (optional)"
              value={formData.phone}
              onChange={updateField}
            />
          </div>

          <input
            type="text"
            name="company"
            className="pi-full"
            placeholder="Company Name (optional)"
            value={formData.company}
            onChange={updateField}
          />

          <textarea
            name="message"
            className="pi-full"
            placeholder="Your requirements / message"
            rows="4"
            value={formData.message}
            onChange={updateField}
            required
          />

          <div className="pi-actions">
            <button type="button" className="pi-btn pi-btn--ghost" onClick={handleEmail}>
              <span className="pi-btn__icon" aria-hidden="true">
                <EmailIcon />
              </span>
              <span className="pi-btn__label">Send via Email</span>
            </button>
            <button type="button" className="pi-btn pi-btn--solid" onClick={handleWhatsApp}>
              <span className="pi-btn__icon" aria-hidden="true">
                <WhatsAppIcon />
              </span>
              <span className="pi-btn__label">Send via WhatsApp</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

