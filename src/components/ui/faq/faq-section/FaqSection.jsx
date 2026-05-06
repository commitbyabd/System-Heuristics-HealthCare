import { ChevronDown } from "lucide-react";
import styles from "./faq-section.module.css";

export default function FaqSection({ title, isOpen, onToggle, children }) {
  return (
    <article
      className={`${styles.section} ${isOpen ? styles.sectionOpen : ""}`.trim()}
    >
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <h3 className={styles.title}>{title}</h3>
        <ChevronDown
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`.trim()}
          style={{ "--icon-size": "20px" }}
          color="#18233b"
        />
      </button>

      <div
        className={`${styles.contentWrap} ${isOpen ? styles.contentWrapOpen : ""}`.trim()}
      >
        <div className={styles.content}>
          <div className={styles.titleColumn}>
            <h3 className={styles.titleLarge}>{title}</h3>
          </div>

          <div className={styles.itemList}>{children}</div>
        </div>
      </div>
    </article>
  );
}
