import { forwardRef } from "react";
import styles from "./ProcessNodeCard.module.css";

const ProcessNodeCard = forwardRef(function ProcessNodeCard(
  { step, label, desc, index, isActive = false, onMouseEnter, onMouseLeave },
  ref,
) {
  const displayStep =
    step ||
    (typeof index === "number" ? String(index + 1).padStart(2, "0") : "");

  return (
    <article
      ref={ref}
      tabIndex={0}
      data-process-card
      data-active={isActive}
      className={`${styles.card} ${isActive ? styles.cardActive : ""}`.trim()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className={styles.stepBadge} aria-hidden="true">
        <span className={styles.stepBadgeInner}>{displayStep}</span>
      </span>
      <h3 className={styles.label}>{label}</h3>
      <p className={styles.desc}>{desc}</p>
    </article>
  );
});

export default ProcessNodeCard;
