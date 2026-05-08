import { ChevronUp, Plus } from "lucide-react";
import styles from "./FaqCard.module.css";

function FaqCard({ question, answer, isOpen, onToggle }) {
  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.header}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={styles.question}>{question}</span>
        <span className={styles.iconWrap} aria-hidden="true">
          {isOpen ? (
            <ChevronUp className={styles.icon} />
          ) : (
            <Plus className={styles.icon} />
          )}
        </span>
      </button>

      <div className={`${styles.answer} ${isOpen ? styles.answerOpen : ""}`.trim()}>
        <p className={styles.answerText}>{answer}</p>
      </div>
    </article>
  );
}

export default FaqCard;
