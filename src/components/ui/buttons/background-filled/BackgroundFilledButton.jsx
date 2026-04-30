import ArrowRight from "../../icons/ArrowRight";
import styles from "./background-filled-button.module.css";

function BackgroundFilledButton({
  text = "Book a Consultation",
  width,
  height = "40px",
  Icon = ArrowRight,
  type = "button",
  className = "",
  textClassName = "",
  iconClassName = "",
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`.trim()}
      style={{ width, height }}
    >
      <span className={`${styles.text} ${textClassName}`.trim()}>{text}</span>
      {Icon && <Icon className={`${styles.icon} ${iconClassName}`.trim()} />}
    </button>
  );
}

export default BackgroundFilledButton;
