import { useCallback, useEffect, useRef, useState } from "react";

function useAutoplaySlider({
  totalSlides,
  delay = 2400,
  threshold = 0.45,
  initialIndex = 0,
}) {
  const sectionRef = useRef(null);
  const timeoutRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isInView, setIsInView] = useState(false);
  const [hasUserPaused, setHasUserPaused] = useState(false);

  const clearAutoplay = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const stopAutoplay = useCallback(() => {
    setHasUserPaused(true);
    clearAutoplay();
  }, [clearAutoplay]);

  const goToSlide = useCallback(
    (index, options = {}) => {
      const { stop = false } = options;

      if (stop) {
        stopAutoplay();
      }

      setActiveIndex(((index % totalSlides) + totalSlides) % totalSlides);
    },
    [stopAutoplay, totalSlides],
  );

  const goToNext = useCallback(
    (options = {}) => {
      const { stop = false } = options;

      if (stop) {
        stopAutoplay();
      }

      setActiveIndex((current) => (current + 1) % totalSlides);
    },
    [stopAutoplay, totalSlides],
  );

  const goToPrevious = useCallback(
    (options = {}) => {
      const { stop = false } = options;

      if (stop) {
        stopAutoplay();
      }

      setActiveIndex((current) => (current - 1 + totalSlides) % totalSlides);
    },
    [stopAutoplay, totalSlides],
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [threshold]);

  useEffect(() => {
    clearAutoplay();

    if (!isInView || hasUserPaused || totalSlides <= 1) {
      return undefined;
    }

    timeoutRef.current = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % totalSlides);
    }, delay);

    return clearAutoplay;
  }, [activeIndex, clearAutoplay, delay, hasUserPaused, isInView, totalSlides]);

  useEffect(() => clearAutoplay, [clearAutoplay]);

  return {
    sectionRef,
    activeIndex,
    isInView,
    hasUserPaused,
    goToNext,
    goToPrevious,
    goToSlide,
    stopAutoplay,
  };
}

export default useAutoplaySlider;
