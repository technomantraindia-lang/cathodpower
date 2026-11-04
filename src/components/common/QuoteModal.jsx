import { createPortal } from "react-dom";
import { useEffect } from "react";
import "./QuoteModal.css";

function QuoteModal({ onClose }) {

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const modal = (
    <div className="cp-modal-overlay" onClick={onClose}>
      <div className="cp-modal" onClick={(e) => e.stopPropagation()}>

        <button className="cp-modal-close" onClick={onClose}>
          ✕
        </button>

        <h2 className="cp-modal-title">Request a Quote</h2>

        <form className="cp-modal-form">

          <div className="cp-row">
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
          </div>

          <div className="cp-row">
            <input type="email" placeholder="Email Address" required />
            <input type="tel" placeholder="Phone Number" required />
          </div>

          <textarea placeholder="Project Notes" rows="4" required />

          <button type="submit" className="cp-modal-submit">
            Submit Request
          </button>

        </form>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

export default QuoteModal;