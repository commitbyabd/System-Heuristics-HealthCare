import styles from "./feature-card.module.css";
import FileText from "../../icons/FileText";

function FeatureCard({
  Icon = FileText,
  title = "Medical Documentation",
  description = "AI scribes, structured notes, and record systems",
}) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <Icon className={styles.icon} />
      </div>

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default FeatureCard;
