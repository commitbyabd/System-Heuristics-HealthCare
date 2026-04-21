import styles from "./section-intro.module.css";

function SectionIntro({
  title = "Software That Heals How Healthcare Works",
  description = "We engineer intelligent, HIPAA-compliant healthcare platforms from AI diagnostics to enterprise hospital systems - built for the future of medicine.",
  highlightWord = 3,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  color = "#FFFFFF",
  highlightColor = "#2FD1AB",
}) {
  const words = title.split(" ");

  return (
    <div className={`${styles.heroText} ${className}`.trim()}>
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

      <p className={`${styles.description} ${descriptionClassName}`.trim()}>
        {description}
      </p>
    </div>
  );
}

export default SectionIntro;
