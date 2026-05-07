import { forwardRef } from "react";
import styles from "./DomainsCenterCard.module.css";

const DomainsCenterCard = forwardRef(function DomainsCenterCard(
  { className = "", title, description, auraRef },
  ref,
) {
  return (
    <div ref={ref} className={`${styles.card} ${className}`.trim()}>
      <span ref={auraRef} className={styles.aura} aria-hidden="true" />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
});

export default DomainsCenterCard;
