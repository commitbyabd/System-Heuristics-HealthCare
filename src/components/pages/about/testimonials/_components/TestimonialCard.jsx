import Star from "../../../../ui/icons/Star";
import styles from "./TestimonialCard.module.css";

function TestimonialCard({
  id,
  name,
  role,
  rating,
  quote,
  avatar,
  slot,
  active,
}) {
  const slotClasses = [styles.cardLeft, styles.cardCenter, styles.cardRight];

  return (
    <article
      className={`bgDarkBlur ${styles.card} ${
        active ? styles.cardActive : styles.cardSide
      } ${slotClasses[slot] || ""}`.trim()}
    >
      <div className={styles.profileRow}>
        <img className={styles.avatar} src={avatar} alt={name} />

        <div className={styles.identity}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.role}>{role}</p>
        </div>
      </div>

      <div className={styles.ratingRow}>
        <div className={styles.stars} aria-label={`${rating} out of 5`}>
          {Array.from({ length: rating }, (_, index) => (
            <Star
              key={`${id}-star-${index + 1}`}
              className={styles.star}
              size={15}
              color="#ffae00"
            />
          ))}
        </div>

        <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
      </div>

      <p className={styles.quote}>"{quote}"</p>
    </article>
  );
}

export default TestimonialCard;
