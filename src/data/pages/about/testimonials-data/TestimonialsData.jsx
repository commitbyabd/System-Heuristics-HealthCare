import Star from "../../../../components/ui/icons/Star";
import styles from "./testimonials-data.module.css";
import { testimonialsData } from "./testimonials-data";

function TestimonialsData({
  items = testimonialsData,
  activeId = null,
  className = "",
}) {
  const slotClasses = [styles.cardLeft, styles.cardCenter, styles.cardRight];

  return (
    <div className={`${styles.cardsGrid} ${className}`.trim()}>
      {items.map((item, index) => (
        <article
          key={item.id}
          className={`bgDarkBlur ${styles.card} ${
            activeId === item.id ? styles.cardActive : styles.cardSide
          } ${slotClasses[index] || ""}`.trim()}
        >
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
                <Star
                  key={`${item.id}-star-${index + 1}`}
                  className={styles.star}
                  size={15}
                  color="#ffae00"
                />
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
