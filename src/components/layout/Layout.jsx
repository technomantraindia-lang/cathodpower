import { Outlet, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./Header";
import Footer from "./Footer";
import EmergenaNavFloating from "../../sections/emergena/EmergenaNavFloating";

export default function Layout() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // stop browser restoring scroll
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = window.__lenis;

    // stop lenis during route switch
    if (lenis?.stop) lenis.stop();

    // always go to top
    window.scrollTo(0, 0);
    if (lenis?.scrollTo) lenis.scrollTo(0, { immediate: true });

    // after DOM paints, resize + restart + refresh animations
    requestAnimationFrame(() => {
      if (lenis?.resize) lenis.resize();
      if (lenis?.start) lenis.start();
      try {
        ScrollTrigger.refresh();
      } catch (_) {}
    });
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      {!isHome && <Header />}
      {!isHome && <EmergenaNavFloating />}
      {isHome ? (
        <Outlet />
      ) : (
        <main className="emergena-subpage-wrap">
          <Outlet />
        </main>
      )}
      {!isHome && <Footer />}
    </>
  );
}