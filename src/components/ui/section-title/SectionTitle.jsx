import styles from "./section-title.module.css";
function SectionTitle({
  title = "Built for Healthcare Compliance & Security",
  highlightWord = 3,
  className = "",
  color = "#FFFFFF",
  highlightColor = "#2FD1AB",
}) {
  const words = title.split(" ");
  return (
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
}

export default SectionTitle;
