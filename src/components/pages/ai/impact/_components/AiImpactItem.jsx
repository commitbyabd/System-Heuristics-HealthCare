import styles from "./AiImpactItem.module.css";

function AiImpactItem({ id, title, description, side, visible, delay }) {
  return (
    <article
      className={`${styles.item} ${
        side === "left" ? styles.itemLeft : styles.itemRight
      } ${visible ? styles.visible : ""}`.trim()}
      style={{ "--delay": `${delay}ms` }}
    >
      <span className={styles.itemNumber}>
        [{String(id).padStart(1, "0")}]
      </span>
      <h3 className={styles.itemTitle}>
        {Array.isArray(title)
          ? title.map((line, i) => (
              <span key={i} className={styles.itemTitleLine}>
                {line}
              </span>
            ))
          : title}
      </h3>
      <p className={styles.itemDescription}>{description}</p>
    </article>
  );
}

export default AiImpactItem;
