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
  const lines = Array.isArray(title) ? title : [title];

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
            color: oneBasedIndex === highlightWord ? highlightColor : color,
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

  const titleEl = (
    <h2 className={`${styles.sectionTitle} ${className}`.trim()}>
      {titleNodes}
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
