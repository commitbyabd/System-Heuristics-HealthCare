import { createElement } from "react";
import styles from "./ChooseCard.module.css";

function ChooseCard({ title, description, Icon, index }) {
  return (
    <article
      className={`bgDarkBlur ${styles.card}`.trim()}
      data-choose-card
      data-card-index={index}
    >
      <div className={styles.cardHeader}>
        <span className={styles.iconWrap} aria-hidden="true">
          {createElement(Icon, { strokeWidth: 1.85 })}
        </span>

        <h3 className={styles.title}>{title}</h3>
      </div>

      <p className={styles.description}>{description}</p>
    </article>
  );
}

export default ChooseCard;
