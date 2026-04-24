import styles from "./background-filled-button.module.css";
import ArrowRight from "../../icons/ArrowRight";

function BackgroundFilledButton({
  text = "Book a Consultation",
  width = "222px",
  height = "40px",
  Icon = ArrowRight,
  className = "",
  textClassName = "",
  iconClassName = "",
}) {
  return (
    <button
      className={`${styles.button} ${className}`.trim()}
      style={{ width, height }}
    >
      <span className={`${styles.text} ${textClassName}`.trim()}>{text}</span>
      {Icon && <Icon className={`${styles.icon} ${iconClassName}`.trim()} />}
    </button>
  );
}

export default BackgroundFilledButton;
