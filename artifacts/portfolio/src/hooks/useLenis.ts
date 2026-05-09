import { useEffect } from "react";
import Lenis from "lenis";

/**
 * useLenis — Initialises the Lenis smooth-scroll engine globally.
 * 
 * Lenis intercepts the browser's native scroll, applies physics-based easing,
 * and produces the "buttery" feel used by elite Silicon Valley and Awwwards sites.
 * 
 * Configuration:
 *  - duration: 1.2s — slightly longer than default for a premium, weighty feel.
 *  - easing: Custom ease-out curve for natural deceleration.
 *  - smooth:  true — enables the interpolation engine.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
