import styles from "./shared-gradient.module.css";

function SharedGradient({ children }) {
  return (
    <section className={styles.sharedGradientSection}>
      <div className={styles.inner}>{children}</div>
    </section>
  );
}

export default SharedGradient;
