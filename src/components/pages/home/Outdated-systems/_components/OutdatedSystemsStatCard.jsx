import styles from "./OutdatedSystemsStatCard.module.css";

function formatStat({ low, high, prefix = "", suffix = "" }, animatedValue) {
  if (high == null) {
    return { main: `${prefix}${animatedValue}`, accent: suffix };
  }

  const animatedLow = Math.max(
    0,
    Math.round((animatedValue / Math.max(low, high)) * low),
  );

  return {
    main: `${prefix}${animatedLow}`,
    accent: `-${animatedValue}${suffix}`,
  };
}

function OutdatedSystemsStatCard({ stat, animatedValue, isVisible, index }) {
  const parts = formatStat(stat, animatedValue);

  return (
    <article
      className={`${styles.statCard} ${isVisible ? styles.statCardVisible : ""}`.trim()}
      style={{ animationDelay: `${0.2 + index * 0.18}s` }}
    >
      <span className={styles.divider} aria-hidden="true" />

      <p className={styles.value}>
        <span className={styles.valueMain}>{parts.main}</span>
        <span className={styles.valueAccent}>{parts.accent}</span>
      </p>

      <p
        className={`${styles.description} ${isVisible ? styles.descriptionVisible : ""}`.trim()}
        style={{ animationDelay: `${0.5 + index * 0.2}s` }}
      >
        {stat.description}
      </p>
    </article>
  );
}

export default OutdatedSystemsStatCard;
