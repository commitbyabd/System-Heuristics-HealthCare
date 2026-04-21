import styles from "./section-intro.module.css";

function SectionIntro({
  title = "Software That Heals",
  description = "We engineer intelligent, HIPAA-compliant healthcare platforms from AI diagnostics to enterprise hospital systems built for the future of medicine.",
  highlightWord = 3,
}) {
  const words = title.split(" ");

  return (
    <div className={styles.heroText}>
      <h1 className={styles.title}>
        {words.map((word, index) => (
          <span
            key={index}
            style={{
              color: index + 1 === highlightWord ? "#2FD1AB" : "#FFFFFF",
            }}
          >
            {word}
            {index !== words.length - 1 && " "}
          </span>
        ))}
      </h1>

      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default SectionIntro;
