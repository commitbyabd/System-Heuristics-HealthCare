import styles from "./policy-card.module.css";

function PolicyCard({ Icon, heading, blocks = [] }) {
  return (
    <article className={`bgDarkBlur ${styles.card}`.trim()}>
      <header className={styles.header}>
        {Icon && <Icon className={styles.headerIcon} />}
        <h2 className={styles.heading}>{heading}</h2>
      </header>

      <div className={styles.body}>
        {blocks.map((block, index) => (
          <div key={index} className={styles.block}>
            {block.subHeading && (
              <h3 className={styles.subHeading}>{block.subHeading}</h3>
            )}
            <p className={styles.text}>{block.body}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

export default PolicyCard;
