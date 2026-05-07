import { createElement } from "react";
import styles from "./section-intro.module.css";
import GradientRevealAnimation from "../gradient-reveal-animation/GradientRevealAnimation";
import GradientScrollAnimation from "../gradient-scroll-animation/GradientScrollAnimation";
import {
  AnimationVariants,
  getAnimationColorSet,
} from "../../../utils/global/Colors";

function SectionIntro({
  title,
  description = "",
  titleAs = "h1",
  highlightWord = 3,
  variant = "default",
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  style = {},
  titleStyle = {},
  descriptionStyle = {},
  color,
  highlightColor,
  animateTitle = false,
  animationVariant = AnimationVariants.DARK,
  triggerOnScroll = false,
  scrollStart = "top 85%",
  animateMode = "reveal",
}) {
  const lines = Array.isArray(title) ? title : [title];
  const animationColors = getAnimationColorSet(animationVariant);
  const baseTextColor = color ?? animationColors.final;
  const accentTextColor = highlightColor ?? animationColors.accent;
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
            color: highlightSet.has(oneBasedIndex)
              ? accentTextColor
              : baseTextColor,
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
      style: { color: baseTextColor, ...titleStyle },
    },
    <>{titleNodes}</>,
  );

  const descriptionEl = description ? (
    <p
      className={`${styles.description} ${descriptionClassName}`.trim()}
      style={{ color: baseTextColor, ...descriptionStyle }}
    >
      {description}
    </p>
  ) : null;

  return (
    <div
      className={`${styles.heroText} ${variant === "hero" ? styles.heroVariant : ""} ${variant === "section" ? styles.sectionVariant : ""} ${className}`.trim()}
      style={style}
    >
      {animateTitle && animateMode === "scroll" ? (
        <GradientScrollAnimation
          className={styles.animWrapper}
          variant={animationVariant}
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
          variant={animationVariant}
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
