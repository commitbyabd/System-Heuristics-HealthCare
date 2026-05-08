import styles from "./button.module.css";

function Button({
  text,
  variant,
  Icon,
  width,
  className = "",
  href,
  ...rest
}) {
  const sharedProps = {
    className: `${styles.button} ${styles[variant]} ${className}`.trim(),
    style: { width },
    ...rest,
  };

  if (href) {
    return (
      <a href={href} {...sharedProps}>
        <span className={styles.text}>{text}</span>
        {Icon && <Icon className={styles.icon} />}
      </a>
    );
  }

  return (
    <button
      type="button"
      {...sharedProps}
    >
      <span className={styles.text}>{text}</span>
      {Icon && <Icon className={styles.icon} />}
    </button>
  );
}

export default Button;
