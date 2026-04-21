import styles from "./background-transparent.module.css";

function BackgroundTransparentButton({
  text = "View Our Work",
  width = "147px",
  height = "40px",
  className = "",
}) {
  return (
    <button className={styles.button} style={{ width, height }}>
      <span className={styles.text}>{text}</span>
    </button>
  );
}

export default BackgroundTransparentButton;
