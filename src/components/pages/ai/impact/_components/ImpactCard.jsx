import { useEffect, useRef, useState } from "react";
import styles from "./ImpactCard.module.css";

function ImpactCard({ index, title, description, position = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`${styles.card} ${visible ? styles.visible : ""}`}
      style={{ "--delay": `${position * 150}ms` }}
    >
      <span className={styles.index}>[{index}]</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  );
}

export default ImpactCard;
