import { forwardRef } from "react";
import styles from "./DomainCard.module.css";

const DomainCard = forwardRef(function DomainCard(
  { className = "", title, description, Icon },
  ref,
) {
  return (
    <div ref={ref} className={`${styles.card} ${className}`.trim()}>
      <span className={styles.iconWrap}>
        <Icon className={styles.icon} />
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
});

export default DomainCard;
