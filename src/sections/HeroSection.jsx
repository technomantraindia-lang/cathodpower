import { useLayoutEffect, useRef } from "react";
import gsap from "../animations/gsapSetup";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import logo from "../assets/Cathode-Power-Logo-White-New.png";
import invertor from "../assets/invertor.png";

gsap.registerPlugin(ScrollTrigger);

// Hoisted style objects � created once, never re-allocated
const S_SECTION = {
  height: "100vh",
  position: "relative",
  overflow: "hidden",
  background: "#000",
  color: "#fff",
  fontFamily: "Montserrat, sans-serif",
};
const S_LOGO = {
  position: "absolute",
  top: "4.5vh",
  left: "4.5vw",
  width: "clamp(190px, 22vw, 460px)",
  height: "auto",
  objectFit: "contain",
  zIndex: 10,
  pointerEvents: "none",
};
const S_PANEL = {
  position: "absolute",
  background: "linear-gradient(135deg, #2a7a78, #9a8f67)",
  zIndex: 2,
  willChange: "transform,width,height,left,top,opacity",
};
const S_OUTLINE = {
  position: "absolute",
  left: "4.5vw",
  top: "64vh",
  width: "36vw",
  height: "28vh",
  border: "2px solid #f4a261",
  boxSizing: "border-box",
  zIndex: 3,
  willChange: "transform,opacity",
};
const S_WORD1 = {
  position: "absolute",
  left: "4.5vw",
  top: "32vh",
  fontSize: "clamp(3.6rem, 7.6vw, 7.2rem)",
  fontWeight: 500,
  margin: 0,
  zIndex: 5,
  willChange: "clip-path,opacity",
};
const S_SUB1 = {
  position: "absolute",
  left: "4.5vw",
  top: "54vh",
  fontSize: "clamp(1.6rem, 2.4vw, 2.7rem)",
  margin: 0,
  zIndex: 5,
  opacity: 0.95,
};
const S_WORD2 = {
  position: "absolute",
  left: "4.5vw",
  top: "36vh",
  fontSize: "clamp(3.6rem, 7.6vw, 7.2rem)",
  fontWeight: 500,
  margin: 0,
  zIndex: 5,
  willChange: "clip-path,opacity",
};
const S_SUB2 = {
  position: "absolute",
  left: "4.5vw",
  top: "58vh",
  fontSize: "clamp(1.6rem, 2.4vw, 2.7rem)",
  margin: 0,
  zIndex: 5,
  opacity: 0.95,
};
const S_PRODUCT = {
  position: "absolute",
  right: "4vw",
  bottom: "8vh",
  width: "42vw",
  maxWidth: "820px",
  zIndex: 4,
  willChange: "transform,filter,opacity",
  pointerEvents: "none",
};
const S_TEAL = {
  position: "absolute",
  right: "4vw",
  top: "64vh",
  width: "72px",
  height: "72px",
  background: "#2b6f6b",
  zIndex: 6,
  willChange: "transform,opacity",
};
const S_WORD3 = {
  position: "absolute",
  left: "4.5vw",
  top: "42vh",
  fontSize: "clamp(3.6rem, 7.6vw, 7.2rem)",
  fontWeight: 500,
  margin: 0,
  zIndex: 7,
  willChange: "clip-path,opacity",
};
const S_SUB3 = {
  position: "absolute",
  left: "4.5vw",
  top: "64vh",
  fontSize: "clamp(1.6rem, 2.4vw, 2.7rem)",
  margin: 0,
  zIndex: 7,
  opacity: 0.95,
};
const S_CTA = {
  position: "absolute",
  left: "50%",
  top: "72vh",
  transform: "translateX(-50%)",
  padding: "18px 54px",
  border: "2px solid #f4a261",
  background: "transparent",
  color: "#f4a261",
  fontSize: "16px",
  letterSpacing: "1px",
  cursor: "pointer",
  zIndex: 8,
};

export default function HeroSection() {
  const heroRef = useRef(null);

  const logoRef = useRef(null);
  const panelRef = useRef(null);
  const outlineRef = useRef(null);
  const tealRef = useRef(null);

  const word1Ref = useRef(null);
  const sub1Ref = useRef(null);

  const word2Ref = useRef(null);
  const sub2Ref = useRef(null);

  const word3Ref = useRef(null);
  const sub3Ref = useRef(null);

  const productRef = useRef(null);
  const ctaRef = useRef(null);

  // prevents double-init in React StrictMode (dev)
  const didInit = useRef(false);

  useLayoutEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    let tl;

    const ctx = gsap.context(() => {
      // ---------- INITIAL STATES (match video) ----------
      gsap.set(logoRef.current, { autoAlpha: 0 });

      // Gradient panel starts off-screen right, floating (not full height)
      gsap.set(panelRef.current, {
        autoAlpha: 0,
        left: "46vw",
        top: "6vh",
        width: "50vw",
        height: "66vh",
        x: "10vw",
      });

      // Outline box draws in
      gsap.set(outlineRef.current, {
        autoAlpha: 0,
        scaleX: 0,
        scaleY: 0,
        transformOrigin: "0% 0%",
      });

      // Teal square only appears in final stage
      gsap.set(tealRef.current, { autoAlpha: 0, scale: 0.85 });

      // Words: clip reveal (you can see "Gree" first)
      const clipHidden = "inset(0 100% 0 0)";
      const clipShown = "inset(0 0% 0 0)";

      gsap.set(word1Ref.current, { autoAlpha: 1, clipPath: clipHidden });
      gsap.set(word2Ref.current, { autoAlpha: 0, clipPath: clipHidden });
      gsap.set(word3Ref.current, { autoAlpha: 0, clipPath: clipHidden });

      gsap.set([sub1Ref.current, sub2Ref.current, sub3Ref.current], {
        autoAlpha: 0,
      });

      // Product: hidden first; appears bottom-right; then moves up + bigger + blur
      gsap.set(productRef.current, {
        autoAlpha: 0,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      });

      // CTA appears at the end
      gsap.set(ctaRef.current, { autoAlpha: 0, scale: 0.95 });

      // ---------- TIMELINE ----------
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=900%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Intro: logo + panel slide in + outline draw + "Greener" reveal + sub
      tl.to(logoRef.current, { autoAlpha: 1, duration: 0.25 }, 0)
        .to(panelRef.current, { autoAlpha: 1, duration: 0.01 }, 0)
        .to(panelRef.current, { x: "0vw", duration: 1.1, ease: "power2.out" }, 0)
        .to(
          outlineRef.current,
          { autoAlpha: 1, scaleX: 1, scaleY: 1, duration: 0.9, ease: "power2.out" },
          0.35
        )
        .to(
          word1Ref.current,
          { clipPath: clipShown, duration: 1.0, ease: "power2.out" },
          0.55
        )
        .to(sub1Ref.current, { autoAlpha: 1, duration: 0.45 }, 1.25)

        // Hold
        .to({}, { duration: 0.5 })

        // Transition to Sustainable:
        // panel slides to top-left (bigger), Greener fades away
        .to(word1Ref.current, { autoAlpha: 0.25, duration: 0.25 }, ">")
        .to(sub1Ref.current, { autoAlpha: 0, duration: 0.2 }, "<")
        .to(
          panelRef.current,
          {
            left: "0vw",
            top: "0vh",
            width: "68vw",
            height: "54vh",
            duration: 1.1,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(word1Ref.current, { autoAlpha: 0, duration: 0.25 }, "<0.35")

        // Sustainable appears (clip reveal) + Think Inverters
        .to(word2Ref.current, { autoAlpha: 1, duration: 0.01 }, ">-0.15")
        .to(word2Ref.current, { clipPath: clipShown, duration: 0.95, ease: "power2.out" }, "<")
        .to(sub2Ref.current, { autoAlpha: 1, duration: 0.45 }, "<0.35")

        // Product appears bottom-right (like video)
        .to(productRef.current, { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, "<0.2")

        // Hold
        .to({}, { duration: 0.7 })

        // Transition to Tomorrow:
        // Sustainable fades grey, outline disappears, panel shrinks to center then fades,
        // product moves up + bigger + blur, teal square appears
        .to(word2Ref.current, { autoAlpha: 0.25, duration: 0.25 }, ">")
        .to(sub2Ref.current, { autoAlpha: 0, duration: 0.2 }, "<")
        .to(outlineRef.current, { autoAlpha: 0, duration: 0.25 }, "<")
        .to(
          panelRef.current,
          {
            left: "46vw",
            top: "14vh",
            width: "30vw",
            height: "44vh",
            duration: 0.8,
            ease: "power2.inOut",
          },
          "<0.05"
        )
        .to(panelRef.current, { autoAlpha: 0, duration: 0.35 }, "<0.55")
        .to(
          productRef.current,
          {
            x: "-14vw",
            y: "-42vh",
            scale: 1.45,
            filter: "blur(1.6px)",
            duration: 0.95,
            ease: "power2.inOut",
          },
          "<0.05"
        )
        .to(tealRef.current, { autoAlpha: 1, scale: 1, duration: 0.35 }, "<0.4")
        .to(word2Ref.current, { autoAlpha: 0, duration: 0.2 }, "<0.2")

        // Tomorrow appears (clip reveal) + Think Cathode Power
        .to(word3Ref.current, { autoAlpha: 1, duration: 0.01 }, ">-0.05")
        .to(word3Ref.current, { clipPath: clipShown, duration: 1.0, ease: "power2.out" }, "<")
        .to(sub3Ref.current, { autoAlpha: 1, duration: 0.4 }, "<0.35")

        // CTA appears
        .to(ctaRef.current, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" }, ">-0.1");
    }, heroRef);

    return () => {
      tl?.scrollTrigger?.kill(true);
      tl?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      style={S_SECTION}
    >
      {/* LOGO (top-left) */}
      <img
        ref={logoRef}
        src={logo}
        alt="Cathode Power"
        style={S_LOGO}
      />

      {/* GRADIENT FLOATING PANEL (animates like video) */}
      <div
        ref={panelRef}
        style={S_PANEL}
      />

      {/* ORANGE OUTLINE BOX (bottom-left) */}
      <div
        ref={outlineRef}
        style={S_OUTLINE}
      />

      {/* WORD 1 */}
      <h1
        ref={word1Ref}
        style={S_WORD1}
      >
        Greener.
      </h1>
      <p
        ref={sub1Ref}
        style={S_SUB1}
      >
        Think Solar
      </p>

      {/* WORD 2 */}
      <h1
        ref={word2Ref}
        style={S_WORD2}
      >
        Sustainable.
      </h1>
      <p
        ref={sub2Ref}
        style={S_SUB2}
      >
        Think Inverters
      </p>

      {/* PRODUCT (bottom-right -> top-center) */}
      <img
        ref={productRef}
        src={invertor}
        alt="Inverters"
        style={S_PRODUCT}
      />

      {/* TEAL SQUARE (final stage right side) */}
      <div
        ref={tealRef}
        style={S_TEAL}
      />

      {/* WORD 3 */}
      <h1
        ref={word3Ref}
        style={S_WORD3}
      >
        Tomorrow.
      </h1>
      <p
        ref={sub3Ref}
        style={S_SUB3}
      >
        Think Cathode Power
      </p>

      {/* CTA (final) */}
      <button
        ref={ctaRef}
        style={S_CTA}
      >
        GET QUOTE
      </button>
    </section>
  );
}
