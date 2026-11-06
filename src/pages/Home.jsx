import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Emergena Clean Energy Styles
import "../sections/emergena/emergena.css";
import "../sections/emergena/emergena-animations.css";

// Emergena Replicated Home Sections
import EmergenaCursor from "../sections/emergena/EmergenaCursor";
import EmergenaNavFloating from "../sections/emergena/EmergenaNavFloating";
// import EmergenaVideoModal from "../sections/emergena/EmergenaVideoModal"; // temporary: process film removed
import EmergenaHero from "../sections/emergena/EmergenaHero";
import EmergenaWereSection from "../sections/emergena/EmergenaWereSection";
import EmergenaWideRangeBanner from "../sections/emergena/EmergenaWideRangeBanner";
import EmergenaTagPoints from "../sections/emergena/EmergenaTagPoints";
// import EmergenaSolutions from "../sections/emergena/EmergenaSolutions"; // hidden for now
// import EmergenaAboutCounters from "../sections/emergena/EmergenaAboutCounters"; // hidden for now
// import EmergenaPrinciples from "../sections/emergena/EmergenaPrinciples"; // hidden for now
// import EmergenaCaseStudies from "../sections/emergena/EmergenaCaseStudies"; // hidden for now
import EmergenaPerfectFit from "../sections/emergena/EmergenaPerfectFit";
import EmergenaWhyTech from "../sections/emergena/EmergenaWhyTech";
import EmergenaInsideTech from "../sections/emergena/EmergenaInsideTech";
import SolarViewSection from "../sections/SolarViewSection";
// import EmergenaProcess from "../sections/emergena/EmergenaProcess"; // hidden for now
// import EmergenaUsp from "../sections/emergena/EmergenaUsp"; // hidden for now
import SuccessStories from "../sections/SuccessStories";
import EmergenaJournal from "../sections/emergena/EmergenaJournal";
import EmergenaCta from "../sections/emergena/EmergenaCta";
import EmergenaFooter from "../sections/emergena/EmergenaFooter";

// Modals
import QuoteModal from "../components/common/QuoteModal";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const homeRef = useRef(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const openQuote = useCallback(() => setIsQuoteOpen(true), []);
  const closeQuote = useCallback(() => setIsQuoteOpen(false), []);

  const handleScrollToSolutions = useCallback(() => {
    const el = document.getElementById("solutions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Ensure ScrollTrigger refreshes when Home mounts
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
    }, homeRef);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div ref={homeRef} className="emergena-home">
      {/* 0. Smooth Trailing Cursor */}
      <EmergenaCursor />

      {/* 0.1 Video Modal — temporary: Watch Our Process film removed until client replacement */}

      {/* 0.2 Scroll-triggered Floating Pill & Full Navmenu Flyout */}
      <EmergenaNavFloating onGetStarted={openQuote} />

      {/* 1. Hero with Built to reduce headline, Navbar & Partner Logo Marquee */}
      <EmergenaHero onLearnMore={handleScrollToSolutions} onGetStarted={openQuote} />

      {/* 1.5 We're Cathode Power + mascot */}
      <EmergenaWereSection />

      {/* 1.6 Wide range of solar solutions banner */}
      <EmergenaWideRangeBanner />

      {/* 1.7 Tag points foundation cards */}
      <EmergenaTagPoints />

      {/* 2. Solutions: Three connected disciplines, hidden for now
      <EmergenaSolutions />
      */}

      {/* 3. Who we are: Deep green manifesto & 4 animated counters, hidden for now
      <EmergenaAboutCounters />
      */}

      {/* 4. Principles: Guiding standards & 3-column architecture, hidden for now
      <EmergenaPrinciples />
      */}

      {/* 5. Types Of Solar Inverters, hidden for now
      <EmergenaCaseStudies onOpenQuote={openQuote} />
      */}

      {/* 5b. Find Your Perfect Fit, product categories + BESS */}
      <EmergenaPerfectFit />

      {/* 5c. Why Cathode Technology */}
      <EmergenaWhyTech />

      {/* 5d. Designed for India / Inside Technology hotspots */}
      <EmergenaInsideTech />

      {/* 5e. Solar View, Monitor every watt in real time */}
      <SolarViewSection />

      {/* 6. Process: How we deliver, hidden for now
      <EmergenaProcess />
      */}

      {/* 7. Live Data USP, hidden for now
      <EmergenaUsp />
      */}

      {/* 8. FAQ, old website two-column accordion layout */}
      <SuccessStories />

      {/* 9. Field Notes: Editorial Journal Cards */}
      <EmergenaJournal />

      {/* 10. Call to Action: Full-width curved banner & video trigger */}
      <EmergenaCta onTalkToEngineer={openQuote} />

      {/* 11. Complete Emergena Footer */}
      <EmergenaFooter />

      {/* Quote Modal */}
      {isQuoteOpen && <QuoteModal onClose={closeQuote} />}
    </div>
  );
}
