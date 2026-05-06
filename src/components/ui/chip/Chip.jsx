import styles from "./chip.module.css";
import { Diamond } from "lucide-react";

function Chip({ text = "Secure & Encrypted", className = "" }) {
  return (
    <div className={`${styles.chip} ${className}`}>
      <Diamond className={styles.icon} />
      <span className={styles.text}>{text}</span>
    </div>
  );
}

export default Chip;
