import { useEffect, useId, useRef } from "react";
import styles from "./faq-item.module.css";

export default function FaqItem({ question, answer, isOpen, onToggle }) {
  const itemRef = useRef(null);
  const answerId = useId();

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    let rafId = null;

    const update = () => {
      rafId = null;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const start = vh * 0.95;
      const end = vh * 0.3;
      const span = start - end;
      const lineY = el.getBoundingClientRect().bottom;
      let p = (start - lineY) / span;
      if (p < 0) p = 0;
      else if (p > 1) p = 1;
      el.style.setProperty("--line-progress", p.toFixed(4));
    };

    const onScroll = () => {
      if (rafId == null) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`.trim()}
    >
      <button
        type="button"
        className={styles.header}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
      >
        <span className={styles.question}>{question}</span>
        <span className={styles.icon} aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        id={answerId}
        className={`${styles.answer} ${isOpen ? styles.answerOpen : ""}`.trim()}
        role="region"
      >
        <p className={styles.answerText}>{answer}</p>
      </div>

      <span className={styles.line} aria-hidden="true">
        <span className={styles.lineFill} />
      </span>
    </div>
  );
}
