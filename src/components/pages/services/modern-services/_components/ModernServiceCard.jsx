import { Link } from "react-router-dom";
import styles from "./ModernServiceCard.module.css";
import Button from "../../../../ui/button/Button";
import { ArrowRight } from "lucide-react";

function ModernServiceCard({ number, title, description, link }) {
  return (
    <article className={styles.card}>
      <span className={styles.number} aria-hidden="true">
        {number}
      </span>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <Link
          to={link}
          className={styles.cta}
          aria-label={`View service: ${title}`}
        >
          <Button
            text="View Service"
            variant="transparent"
            Icon={ArrowRight}
            className={styles.viewButton}
            tabIndex={-1}
          />
        </Link>
      </div>
    </article>
  );
}

export default ModernServiceCard;
