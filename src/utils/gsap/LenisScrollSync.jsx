// Sync Lenis smooth scroll with GSAP ScrollTrigger
import { useLayoutEffect } from "react";
import { useLenis } from "lenis/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LenisScrollSync() {
  const lenis = useLenis();

  useLayoutEffect(() => {
    if (!lenis) return;

    const scroller =
      document.querySelector("[data-lenis-root]") ||
      document.scrollingElement ||
      document.documentElement;

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length) return lenis.scrollTo(value);
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return (
          scroller.getBoundingClientRect?.() || {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          }
        );
      },
      pinType: scroller.style?.transform ? "transform" : "fixed",
    });

    try {
      ScrollTrigger.defaults({ scroller });
    } catch {}

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    ScrollTrigger.refresh();

    return () => lenis.off("scroll", onScroll);
  }, [lenis]);

  return null;
}
