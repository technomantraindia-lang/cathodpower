import { useEffect, useRef } from "react";
import gsap from "gsap";

const FILM_SRC = "/video/cathode-power-film.mp4";
const FILM_POSTER = "/images/cta/cp-film-poster.jpg";

export default function EmergenaVideoModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const wrapperRef = useRef(null);
  const backdropRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const modal = modalRef.current;
    const wrapper = wrapperRef.current;
    const backdrop = backdropRef.current;
    const video = videoRef.current;

    if (!modal || !wrapper || !backdrop) return undefined;

    const tl = gsap.timeline();
    tl.set(modal, { display: "flex" });
    tl.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    tl.fromTo(
      wrapper,
      { opacity: 0, scale: 0.85, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" },
      "-=0.15"
    );

    const tryPlay = () => {
      if (!video) return;
      video.muted = false;
      const playPromise = video.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {
          // Autoplay with sound may be blocked; leave controls for the user.
        });
      }
    };

    if (video) {
      video.load();
      if (video.readyState >= 2) {
        tryPlay();
      } else {
        video.addEventListener("loadeddata", tryPlay, { once: true });
        video.addEventListener("canplay", tryPlay, { once: true });
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    };
  }, [isOpen]);

  const handleClose = () => {
    const modal = modalRef.current;
    const wrapper = wrapperRef.current;
    const backdrop = backdropRef.current;
    const video = videoRef.current;

    if (video) {
      video.pause();
    }

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

        <div
          ref={wrapperRef}
          className="popup-video-wrapper"
          style={{
            position: "relative",
            width: "92%",
            maxWidth: "960px",
            zIndex: 10,
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 30px 90px rgba(0,0,0,0.6)",
            backgroundColor: "#000",
          }}
        >
          <button
            onClick={handleClose}
            aria-label="Close video"
            type="button"
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

          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
              backgroundColor: "#000",
            }}
          >
            <video
              ref={videoRef}
              key={FILM_SRC}
              src={FILM_SRC}
              controls
              autoPlay
              playsInline
              preload="auto"
              poster={FILM_POSTER}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                backgroundColor: "#000",
              }}
            >
              <source src={FILM_SRC} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
