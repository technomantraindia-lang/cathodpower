import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a scoped GSAP context for a component.
 * Call ctx.revert() in useEffect cleanup to safely kill only that component's animations.
 */
export function createGsapContext(scope) {
  return gsap.context(() => {}, scope);
}

/**
 * Refresh ScrollTrigger after route changes (call sparingly).
 */
export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}