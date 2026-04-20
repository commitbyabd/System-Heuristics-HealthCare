import styles from "./background-filled-button.module.css";
import ArrowRight from "../../icons/ArrowRight";

function BackgroundFilledButton({
  text = "Book a Consultation",
  width = "222px",
  height = "40px",
  Icon = ArrowRight,
}) {
  return (
    <button className={styles.button} style={{ width, height }}>
      <span className={styles.text}>{text}</span>
      {Icon && <Icon className={styles.icon} />}
    </button>
  );
}

export default BackgroundFilledButton;
