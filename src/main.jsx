import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import App from "./App";
import "./styles/global.css";

gsap.registerPlugin(ScrollTrigger);

if (import.meta.env.PROD) {
  gsap.config({ nullTargetWarn: false });
}

// Prevent GSAP from trying to compensate for frame-rate lag —
// keeps animations smooth during heavy scroll/load bursts.
gsap.ticker.lagSmoothing(0);

// Reduce unnecessary ScrollTrigger recalculations on every scroll tick.
ScrollTrigger.config({
  limitCallbacks: true,   // fire callbacks only when truly needed
  ignoreMobileResize: true, // skip resize recalcs from mobile address-bar show/hide
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load", // fewer triggers
});

// Lenis SINGLETON (important for Vite HMR / route changes)
if (window.__lenis) {
  try { window.__lenis.destroy(); } catch (_) {}
  window.__lenis = null;
}

const lenis = new Lenis({ duration: 1.2, smooth: true });
window.__lenis = lenis;

// Drive Lenis through GSAP's ticker so they stay perfectly in sync —
// eliminates the separate requestAnimationFrame loop.
gsap.ticker.add((time) => lenis.raf(time * 1000));

// Keep ScrollTrigger in sync with Lenis scroll position
lenis.on("scroll", ScrollTrigger.update);

// So pins / start-end math use Lenis’s virtual scroll (not native), matching ScrollTrigger
ScrollTrigger.scrollerProxy(document.documentElement, {
  scrollTop(value) {
    if (arguments.length) {
      lenis.scrollTo(value, { immediate: true });
    }
    return lenis.scroll;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);