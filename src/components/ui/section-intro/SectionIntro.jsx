import styles from "./section-intro.module.css";
import GradientRevealAnimation from "../gradient-reveal-animation/GradientRevealAnimation";

function SectionIntro({
  title = "Software That Heals How Healthcare Works",
  description = "We engineer intelligent, HIPAA-compliant healthcare platforms from AI diagnostics to enterprise hospital systems - built for the future of medicine.",
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
}) {
  const words = title.split(" ");

  const titleEl = (
    <h1 className={`${styles.title} ${titleClassName}`.trim()}>
      {words.map((word, index) => (
        <span
          key={index}
          style={{
            color: index + 1 === highlightWord ? highlightColor : color,
          }}
        >
          {word}
          {index !== words.length - 1 && " "}
        </span>
      ))}
    </h1>
  );

  const descriptionEl = (
    <p className={`${styles.description} ${descriptionClassName}`.trim()}>
      {description}
    </p>
  );

  return (
    <div className={`${styles.heroText} ${className}`.trim()}>
      {animateTitle ? (
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
          highlightWords={
            highlightWord
              ? [{ elementIndex: 0, wordIndex: highlightWord - 1 }]
              : []
          }
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
