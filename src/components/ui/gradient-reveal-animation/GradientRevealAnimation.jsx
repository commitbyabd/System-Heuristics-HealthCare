import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useRef, useEffect } from "react";
import { Colors } from "../../../utils/global/Colors";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function GradientRevealAnimation({
  children,
  colorInitial = Colors.secondaryLight(),
  colorAccent = Colors.primary(),
  colorFinal = Colors.text(),
  charDuration = 0.1,
  charStagger = 0.005,
  finalDuration = 0.05,
  className = "",
  triggerOnScroll = false,
  scrollStart = "top 85%",
  scrollEnd = "top 45%",
}) {
  const containerRef = useRef(null);
  const splitRefs = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    splitRefs.current = [];

    const elements = containerRef.current.hasAttribute("data-copy-wrapper")
      ? Array.from(containerRef.current.children)
      : [containerRef.current];

    elements.forEach((element) => {
      const wordSplit = SplitText.create(element, {
        type: "words",
        wordsClass: "word",
      });

      const charSplit = SplitText.create(wordSplit.words, {
        type: "chars",
        charsClass: "char",
      });

      splitRefs.current.push({ wordSplit, charSplit });
    });

    const allChars = splitRefs.current.flatMap(
      ({ charSplit }) => charSplit.chars,
    );

    gsap.set(allChars, { color: colorInitial });

    const animateChars = () => {
      allChars.forEach((char, index) => {
        gsap.to(char, {
          duration: charDuration,
          ease: "none",
          color: colorAccent,
          delay: index * charStagger,
          onComplete: () => {
            gsap.to(char, {
              duration: finalDuration,
              ease: "none",
              color: colorFinal,
            });
          },
        });
      });
    };

    let timeline;
    let scrollTrigger;

    if (triggerOnScroll) {
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: scrollStart,
          end: scrollEnd,
          scrub: true,
        },
      });

      timeline
        .to(allChars, {
          duration: charDuration,
          ease: "none",
          color: colorAccent,
          stagger: charStagger,
        })
        .to(allChars, {
          duration: finalDuration,
          ease: "none",
          color: colorFinal,
          stagger: charStagger,
        });

      scrollTrigger = timeline.scrollTrigger;
    } else {
      animateChars();
    }

    return () => {
      timeline?.kill();
      scrollTrigger?.kill();
      splitRefs.current.forEach(({ wordSplit, charSplit }) => {
        wordSplit.revert?.();
        charSplit.revert?.();
      });
      gsap.killTweensOf(allChars);
    };
  }, [
    colorInitial,
    colorAccent,
    colorFinal,
    charDuration,
    charStagger,
    finalDuration,
    triggerOnScroll,
    scrollStart,
    scrollEnd,
  ]);

  // Always wrap children in a container div
  return (
    <div
      ref={containerRef}
      aria-label=""
      data-copy-wrapper="true"
      className={className}
    >
      {children}
    </div>
  );
}
