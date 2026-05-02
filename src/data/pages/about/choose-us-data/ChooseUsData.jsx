import { createElement } from "react";
import styles from "./choose-us-data.module.css";
import { chooseUsData } from "./choose-us-data";

function ChooseUsData() {
  return (
    <div className={styles.cardsGrid}>
      {chooseUsData.map(({ id, title, description, Icon }, index) => (
        <article
          key={id}
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
      ))}
    </div>
  );
}

export default ChooseUsData;
