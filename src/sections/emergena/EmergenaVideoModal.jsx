import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function EmergenaVideoModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const wrapperRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    const wrapper = wrapperRef.current;
    const backdrop = backdropRef.current;

    if (!modal || !wrapper || !backdrop) return;

    // Timeline t-84704455
    const tl = gsap.timeline();
    tl.set(modal, { display: "block" });
    tl.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    tl.fromTo(
      wrapper,
      { opacity: 0, scale: 0.85, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" },
      "-=0.15"
    );

    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    const modal = modalRef.current;
    const wrapper = wrapperRef.current;
    const backdrop = backdropRef.current;

    if (!modal || !wrapper || !backdrop) {
      onClose();
      return;
    }

    gsap.to(wrapper, { opacity: 0, scale: 0.9, duration: 0.2, ease: "power2.in" });
    gsap.to(backdrop, {
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(modal, { display: "none" });
        onClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="popup-video"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="wrapper-popup-video"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Backdrop click to close */}
        <div
          ref={backdropRef}
          onClick={handleClose}
          className="bg-overlay-video"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(10, 20, 18, 0.85)",
            backdropFilter: "blur(8px)",
            cursor: "pointer",
          }}
        />

        {/* Video Player Box */}
        <div
          ref={wrapperRef}
          className="popup-video-wrapper"
          style={{
            position: "relative",
            width: "90%",
            maxWidth: "960px",
            zIndex: 10,
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 30px 90px rgba(0,0,0,0.6)",
          }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close video"
            style={{
              position: "absolute",
              top: "-44px",
              right: "0",
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "28px",
              cursor: "pointer",
              lineHeight: 1,
              padding: "4px 8px",
            }}
          >
            &times;
          </button>

          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", backgroundColor: "#000" }}>
            <video
              src="/images/factoryimages/INVERTER.mp4"
              controls
              autoPlay
              playsInline
              poster="/images/factoryimages/5.webp"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
