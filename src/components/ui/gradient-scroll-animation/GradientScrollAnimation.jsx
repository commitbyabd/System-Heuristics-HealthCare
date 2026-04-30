import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useLayoutEffect, useRef } from "react";
import "./gradient-scroll-animation.css";
import { Colors } from "../../../utils/global/Colors";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function GradientScrollAnimation({
  children,
  colorInitial = Colors.secondaryLight(),
  colorAccent = Colors.primary(),
  colorFinal = Colors.text(),
  highlightWords = [],
  highlightFinalColor = colorAccent,
  className = "",
}) {
  const containerRef = useRef(null);
  const splitRefs = useRef([]);
  const lastScrollProgress = useRef(0);
  const colorTransitionTimers = useRef(new Map());
  const completedChars = useRef(new Set());

  useLayoutEffect(() => {
    if (!containerRef.current) return undefined;

    const ctx = gsap.context(() => {
      splitRefs.current = [];
      lastScrollProgress.current = 0;
      colorTransitionTimers.current.forEach((timer) => clearTimeout(timer));
      colorTransitionTimers.current.clear();
      completedChars.current.clear();

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

      const highlightedChars = new Set();

      splitRefs.current.forEach(({ wordSplit, charSplit }, elementIndex) => {
        highlightWords.forEach((target) => {
          if (target.elementIndex !== elementIndex) return;
          const wordEl = wordSplit.words[target.wordIndex];
          if (!wordEl) return;

          charSplit.chars.forEach((char) => {
            if (wordEl.contains(char)) highlightedChars.add(char);
          });
        });
      });

      const allChars = splitRefs.current.flatMap(
        ({ charSplit }) => charSplit.chars,
      );

      gsap.set(allChars, { color: colorInitial });

      const scheduleFinalTransition = (char, index) => {
        if (colorTransitionTimers.current.has(index)) {
          clearTimeout(colorTransitionTimers.current.get(index));
        }

        const timer = setTimeout(() => {
          if (!completedChars.current.has(index)) {
            gsap.to(char, {
              duration: 0.1,
              ease: "none",
              color: highlightedChars.has(char)
                ? highlightFinalColor
                : colorFinal,
              onComplete: () => {
                completedChars.current.add(index);
              },
            });
          }
          colorTransitionTimers.current.delete(index);
        }, 100);

        colorTransitionTimers.current.set(index, timer);
      };

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 90%",
        end: "top 40%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalChars = allChars.length;
          const isScrollingDown = progress >= lastScrollProgress.current;
          const currentCharIndex = Math.floor(progress * totalChars);

          allChars.forEach((char, index) => {
            if (!isScrollingDown && index >= currentCharIndex) {
              if (colorTransitionTimers.current.has(index)) {
                clearTimeout(colorTransitionTimers.current.get(index));
                colorTransitionTimers.current.delete(index);
              }
              completedChars.current.delete(index);
              gsap.set(char, { color: colorInitial });
              return;
            }

            if (completedChars.current.has(index)) return;

            if (index <= currentCharIndex) {
              gsap.set(char, { color: colorAccent });

              if (!colorTransitionTimers.current.has(index)) {
                scheduleFinalTransition(char, index);
              }
            } else {
              gsap.set(char, { color: colorInitial });
            }
          });

          lastScrollProgress.current = progress;
        },
      });
    }, containerRef);

    return () => {
      colorTransitionTimers.current.forEach((timer) => clearTimeout(timer));
      colorTransitionTimers.current.clear();
      completedChars.current.clear();
      splitRefs.current.forEach(({ wordSplit, charSplit }) => {
        charSplit.revert();
        wordSplit.revert();
      });
      splitRefs.current = [];
      ctx.revert();
    };
  }, [
    colorInitial,
    colorAccent,
    colorFinal,
    highlightFinalColor,
    JSON.stringify(highlightWords),
  ]);

  return (
    <div ref={containerRef} data-copy-wrapper="true" className={className}>
      {children}
    </div>
  );
}
