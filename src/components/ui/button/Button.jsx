import styles from "./button.module.css";

function Button({ text, variant, Icon, width }) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      style={{ width }}
    >
      <span className={styles.text}>{text}</span>
      {Icon && <Icon className={styles.icon} />}
    </button>
  );
}

export default Button;
