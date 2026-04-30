import styles from "./background-transparent-button.module.css";

function BackgroundTransparentButton({
  text = "View Our Work",
  width,
  height = "40px",
  Icon = null,
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

export default BackgroundTransparentButton;
