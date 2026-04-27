import { useRef, useEffect, useState, useId } from "react";
import { animateLineOnScroll } from "./FaqSectionCardUtils";
import styles from "./faq-section-card.module.css";

export default function FaqSectionCard({ faq }) {
  const boxRef = useRef(null);
  const lineRef = useRef(null);
  const [open, setOpen] = useState(false);
  const answerId = useId();

  useEffect(() => {
    const cleanup = animateLineOnScroll(boxRef, lineRef);
    return cleanup;
  }, []);

  return (
    <div
      ref={boxRef}
      className={`${styles.cardBox} bgGlassWGlow ${open ? styles.open : ""}`}
    >
      <button
        className={styles.cardHeader}
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-controls={answerId}
        aria-label={faq.question}
      >
        <span className={styles.question}>{faq.question}</span>
        <span className={styles.icon} aria-hidden>
          {open ? "−" : "+"}
        </span>
      </button>

      <div
        id={answerId}
        className={`${styles.answer} ${open ? styles.open : ""}`}
        role="region"
      >
        <p>{faq.answer}</p>
      </div>

      <div ref={lineRef} className={styles.line}></div>
    </div>
  );
}
