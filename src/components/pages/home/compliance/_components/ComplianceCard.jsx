import { Link } from "react-router-dom";
import styles from "./ComplianceCard.module.css";

const HIGHLIGHT_COLOR = "#2FD1AB";
const DEFAULT_COLOR = "#1F2937";

function ComplianceCard({
  tag,
  title,
  highlightWord,
  description,
  buttonText,
  link,
  icon,
  alt,
}) {
  const words = title.split(" ");

  return (
    <article className={styles.card} data-compliance-card>
      <p className={styles.tag}>{tag}</p>

      <div className={styles.titleRow}>
        <img className={styles.icon} src={icon} alt={alt} />

        <h3 className={styles.title}>
          {words.map((word, wordIndex) => (
            <span
              key={wordIndex}
              style={{
                color:
                  wordIndex + 1 === highlightWord
                    ? HIGHLIGHT_COLOR
                    : DEFAULT_COLOR,
              }}
            >
              {word}
              {wordIndex !== words.length - 1 && " "}
            </span>
          ))}
        </h3>
      </div>

      <p className={styles.description}>{description}</p>

      <Link to={link} className={styles.cardButton}>
        <span>{buttonText}</span>
        <span className={styles.arrow}>&rarr;</span>
      </Link>
    </article>
  );
}

export default ComplianceCard;
