import { useEffect, useId, useRef, useState } from "react";
import styles from "./faq-section-card.module.css";

export default function FaqSectionCard({ faq }) {
  const boxRef = useRef(null);
  const [open, setOpen] = useState(false);
  const answerId = useId();

  useEffect(() => {
    const el = boxRef.current;
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

      <span className={styles.line} aria-hidden="true">
        <span className={styles.lineFill} />
      </span>
    </div>
  );
}
