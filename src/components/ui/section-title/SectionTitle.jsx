import styles from "./section-title.module.css";
import GradientScrollAnimation from "../gradient-scroll-animation/GradientScrollAnimation";

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
    <GradientScrollAnimation
      colorInitial={animateInitialColor}
      colorAccent={animateAccentColor}
      colorFinal={animateFinalColor}
      highlightFinalColor={highlightColor}
      highlightWords={
        highlightWord ? [{ elementIndex: 0, wordIndex: highlightWord - 1 }] : []
      }
    >
      {titleEl}
    </GradientScrollAnimation>
  ) : (
    titleEl
  );
}

export default SectionTitle;
