import styles from "./feature-card.module.css";
import FileText from "../../icons/FileText";

function FeatureCard({
  Icon = FileText,
  title = "Medical Documentation",
  description = "AI scribes, structured notes, and record systems",
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  iconClassName = "",
}) {
  return (
    <div className={`${styles.card} ${className}`.trim()}>
      <div className={styles.iconWrapper}>
        <Icon className={`${styles.icon} ${iconClassName}`.trim()} />
      </div>

      <h1 className={`${styles.title} ${titleClassName}`.trim()}>{title}</h1>
      <p className={`${styles.description} ${descriptionClassName}`.trim()}>
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;
