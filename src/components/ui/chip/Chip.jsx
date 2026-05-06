import styles from "./chip.module.css";
import { Gem } from "lucide-react";

function Chip({ text = "Secure & Encrypted", className = "", Icon = Gem }) {
  return (
    <div className={`${styles.chip} ${className}`}>
      {Icon && <Icon className={styles.icon} />}
      <span className={styles.text}>{text}</span>
    </div>
  );
}

export default Chip;
