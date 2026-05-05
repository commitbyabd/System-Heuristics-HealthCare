import styles from "./ExpertiseCard.module.css";

function ExpertiseCard({ title, description, Icon }) {
  return (
    <article className={`bgDarkBlur ${styles.card}`} data-expertise-card>
      <div className={styles.iconWrapper}>
        <Icon />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
}

export default ExpertiseCard;
