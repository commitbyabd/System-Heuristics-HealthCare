import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import React, { useRef, useEffect } from "react";
import { Colors } from "../../../utils/global/Colors";

gsap.registerPlugin(SplitText);

export default function GradientRevealAnimation({
  children,
  colorInitial = Colors.secondaryLight(),
  colorAccent = Colors.primary(),
  colorFinal = Colors.text(),
  className = "",
}) {
  const containerRef = useRef(null);
  const splitRefs = useRef([]);
  const colorTransitionTimers = useRef(new Map());
  const completedChars = useRef(new Set());

  useEffect(() => {
    if (!containerRef.current) return;

    splitRefs.current = [];
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

    const allChars = splitRefs.current.flatMap(
      ({ charSplit }) => charSplit.chars,
    );

    gsap.set(allChars, { color: colorInitial });

    allChars.forEach((char, index) => {
      gsap.to(char, {
        duration: 0.1,
        ease: "none",
        color: colorAccent,
        delay: index * 0.005,
        onComplete: () => {
          gsap.to(char, {
            duration: 0.05,
            ease: "none",
            color: colorFinal,
          });
        },
      });
    });

    return () => {
      splitRefs.current.forEach(({ wordSplit, charSplit }) => {
        wordSplit.revert?.();
        charSplit.revert?.();
      });
      gsap.killTweensOf(allChars);
    };
  }, [colorInitial, colorAccent, colorFinal]);

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
