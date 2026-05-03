import styles from "./button.module.css";

function Button({ text, variant, Icon, width, className = "", ...rest }) {
  return (
    <button
      type="button"
      className={`${styles.button} ${styles[variant]} ${className}`.trim()}
      style={{ width }}
      {...rest}
    >
      <span className={styles.text}>{text}</span>
      {Icon && <Icon className={styles.icon} />}
    </button>
  );
}

export default Button;
