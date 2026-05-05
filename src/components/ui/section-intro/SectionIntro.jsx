import { createElement } from "react";
import styles from "./section-intro.module.css";
import GradientRevealAnimation from "../gradient-reveal-animation/GradientRevealAnimation";
import GradientScrollAnimation from "../gradient-scroll-animation/GradientScrollAnimation";

function SectionIntro({
  title = "Software That Heals How Healthcare Works",
  description = "We engineer intelligent, HIPAA-compliant healthcare platforms from AI diagnostics to enterprise hospital systems - built for the future of medicine.",
  titleAs = "h1",
  highlightWord = 3,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  color = "#FFFFFF",
  highlightColor = "#2FD1AB",
  animateTitle = false,
  animateInitialColor = "#737e8a",
  animateAccentColor = "#2FD1AB",
  animateFinalColor = "#FFFFFF",
  triggerOnScroll = false,
  scrollStart = "top 85%",
  animateMode = "reveal",
}) {
  const lines = Array.isArray(title) ? title : [title];
  const highlightSet = new Set(
    Array.isArray(highlightWord)
      ? highlightWord
      : highlightWord
        ? [highlightWord]
        : [],
  );

  const titleNodes = [];
  let wordCounter = 0;

  lines.forEach((line, lineIndex) => {
    const wordsInLine = line.split(" ").filter(Boolean);
    wordsInLine.forEach((word, indexInLine) => {
      const isLastInLine = indexInLine === wordsInLine.length - 1;
      const oneBasedIndex = wordCounter + 1;
      titleNodes.push(
        <span
          key={`w-${lineIndex}-${indexInLine}`}
          style={{
            color: highlightSet.has(oneBasedIndex) ? highlightColor : color,
          }}
        >
          {word}
          {!isLastInLine && " "}
        </span>,
      );
      wordCounter += 1;
    });
    if (lineIndex !== lines.length - 1) {
      titleNodes.push(<br key={`br-${lineIndex}`} />);
    }
  });

  const titleEl = createElement(
    titleAs,
    {
      className: `${styles.title} ${titleClassName}`.trim(),
    },
    <>{titleNodes}</>,
  );

  const descriptionEl = (
    <p className={`${styles.description} ${descriptionClassName}`.trim()}>
      {description}
    </p>
  );

  return (
    <div className={`${styles.heroText} ${className}`.trim()}>
      {animateTitle && animateMode === "scroll" ? (
        <GradientScrollAnimation
          className={styles.animWrapper}
          colorInitial={animateInitialColor}
          colorAccent={animateAccentColor}
          colorFinal={animateFinalColor}
          highlightFinalColor={highlightColor}
          highlightWords={Array.from(highlightSet).map((w) => ({
            elementIndex: 0,
            wordIndex: w - 1,
          }))}
        >
          {titleEl}
          {descriptionEl}
        </GradientScrollAnimation>
      ) : animateTitle ? (
        <GradientRevealAnimation
          className={styles.animWrapper}
          colorInitial={animateInitialColor}
          colorAccent={animateAccentColor}
          colorFinal={animateFinalColor}
          charDuration={0.25}
          charStagger={0.018}
          finalDuration={0.15}
          triggerOnScroll={triggerOnScroll}
          scrollStart={scrollStart}
          highlightWords={Array.from(highlightSet).map((w) => ({
            elementIndex: 0,
            wordIndex: w - 1,
          }))}
        >
          {titleEl}
          {descriptionEl}
        </GradientRevealAnimation>
      ) : (
        <>
          {titleEl}
          {descriptionEl}
        </>
      )}
    </div>
  );
}

export default SectionIntro;
