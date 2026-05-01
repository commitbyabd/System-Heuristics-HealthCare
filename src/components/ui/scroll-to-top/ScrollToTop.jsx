import { useInsertionEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const resetScrollerToTop = (lenis) => {
  const scrollElement =
    document.scrollingElement || document.documentElement || document.body;

  scrollElement.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  document.body.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  if (lenis) {
    lenis.scrollTo(0, { immediate: true, force: true });
  }
};

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useInsertionEffect(() => {
    resetScrollerToTop(lenis);
    ScrollTrigger.clearScrollMemory();
  }, [pathname, lenis]);

  useLayoutEffect(() => {
    let secondFrameId = 0;
    const refreshAndReset = () => {
      resetScrollerToTop(lenis);
      ScrollTrigger.refresh();
      ScrollTrigger.update();
    };

    const firstFrameId = window.requestAnimationFrame(() => {
      secondFrameId = window.requestAnimationFrame(refreshAndReset);
    });

    return () => {
      window.cancelAnimationFrame(firstFrameId);
      window.cancelAnimationFrame(secondFrameId);
    };
  }, [pathname, lenis]);

  return null;
}

export default ScrollToTop;
