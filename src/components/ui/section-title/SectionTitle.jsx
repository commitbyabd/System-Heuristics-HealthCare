import styles from "./section-title.module.css";
import GradientRevealAnimation from "../gradient-reveal-animation/GradientRevealAnimation";

function SectionTitle({
  title = "Built for Healthcare Compliance & Security",
  highlightWord = 3,
  className = "",
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
    <h2 className={`${styles.sectionTitle} ${className}`.trim()}>
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
    </h2>
  );

  return animateTitle ? (
    <GradientRevealAnimation
      colorInitial={animateInitialColor}
      colorAccent={animateAccentColor}
      colorFinal={animateFinalColor}
      charDuration={0.5}
      charStagger={0.035}
      finalDuration={0.3}
      triggerOnScroll={triggerOnScroll}
      scrollStart={scrollStart}
    >
      {titleEl}
    </GradientRevealAnimation>
  ) : (
    titleEl
  );
}

export default SectionTitle;
