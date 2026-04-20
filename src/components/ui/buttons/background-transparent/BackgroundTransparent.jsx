import styles from "./background-transparent.module.css";

function BackgroundTransparent({
  text = "View Our Work",
  width = "147px",
  height = "40px",
}) {
  return (
    <button className={styles.button} style={{ width, height }}>
      <span className={styles.text}>{text}</span>
    </button>
  );
}

export default BackgroundTransparent;
