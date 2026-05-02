import styles from "./testimonials-data.module.css";
import { testimonialsData } from "./testimonials-data";

function StarIcon() {
  return (
    <svg
      className={styles.star}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2.75l2.76 5.59 6.17.9-4.46 4.35 1.05 6.14L12 16.84 6.48 19.73l1.05-6.14-4.46-4.35 6.17-.9L12 2.75z" />
    </svg>
  );
}

function TestimonialsData() {
  return (
    <div className={styles.cardsGrid}>
      {testimonialsData.map((item) => (
        <article key={item.id} className={`bgDarkBlur ${styles.card}`.trim()}>
          <div className={styles.profileRow}>
            <img className={styles.avatar} src={item.avatar} alt={item.name} />

            <div className={styles.identity}>
              <h3 className={styles.name}>{item.name}</h3>
              <p className={styles.role}>{item.role}</p>
            </div>
          </div>

          <div className={styles.ratingRow}>
            <div className={styles.stars} aria-label={`${item.rating} out of 5`}>
              {Array.from({ length: item.rating }, (_, index) => (
                <StarIcon key={`${item.id}-star-${index + 1}`} />
              ))}
            </div>

            <span className={styles.ratingValue}>{item.rating.toFixed(1)}</span>
          </div>

          <p className={styles.quote}>"{item.quote}"</p>
        </article>
      ))}
    </div>
  );
}

export default TestimonialsData;
