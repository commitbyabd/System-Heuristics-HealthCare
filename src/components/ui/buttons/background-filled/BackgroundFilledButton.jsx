import styles from "./background-filled-button.module.css";
import ArrowRight from "../../icons/ArrowRight";

function BackgroundFilledButton({
  text = "Book a Consultation",
  width = "320px",
  Icon = ArrowRight,
}) {
  return (
    <button className={styles.button} style={{ width }}>
      <span className={styles.text}>{text}</span>
      {Icon && <Icon className={styles.icon} />}
    </button>
  );
}

export default BackgroundFilledButton;
