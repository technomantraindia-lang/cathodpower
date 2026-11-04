import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./CI.css";
import "../sections/emergena/emergena-animations.css";

import CIBanner from "../sections/CIBanner";
import VisionCardsSection from "../sections/VisionCardsSection";
import OurSolutions from "../sections/OurSolutions";
import EmergenaCaseStudies from "../sections/emergena/EmergenaCaseStudies";
import NewsletterBandSection from "../sections/NewsletterBandSection";

gsap.registerPlugin(ScrollTrigger);

export default function CI() {
  const pageRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      if (window.__lenis?.resize) {
        window.__lenis.resize();
      }
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
    }, pageRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div ref={pageRef} className="ci-page">

      {/* ================= BANNER ================= */}
      <CIBanner />

      {/* ================= VISION CARDS ================= */}
      <VisionCardsSection />

      {/* ================= OUR SOLUTIONS ================= */}
      <OurSolutions />

      {/* ================= PRODUCT RANGE (HOME PAGE LAYOUT) ================= */}
      <div className="emergena-home">
        <EmergenaCaseStudies />
      </div>

      {/* ================= NEWSLETTER ================= */}
      <NewsletterBandSection
        imageSrc="/images/factoryimages/5.jpeg"
        imageAlt="Cathode Power installation"
      />

    </div>
  );
}