import styles from "./EnvironmentSlide.module.css";

function EnvironmentSlide({ image, label, painPoint, solution, result, isActive }) {
  return (
    <article
      className={`${styles.slide} ${isActive ? styles.slideActive : ""}`.trim()}
      aria-hidden={!isActive}
    >
      <div className={styles.imageWrap}>
        <img src={image} alt={label} className={styles.image} loading="lazy" />
      </div>
      <div className={styles.copyBlock}>
        <div className={styles.copyRow}>
          <h3 className={styles.copyHeading}>Pain Point:</h3>
          <p className={styles.copyText}>{painPoint}</p>
        </div>
        <div className={styles.copyRow}>
          <h3 className={styles.copyHeading}>Solution:</h3>
          <p className={styles.copyText}>{solution}</p>
        </div>
        <div className={styles.copyRow}>
          <h3 className={styles.copyHeading}>Result:</h3>
          <p className={styles.copyText}>{result}</p>
        </div>
      </div>
    </article>
  );
}

export default EnvironmentSlide;
