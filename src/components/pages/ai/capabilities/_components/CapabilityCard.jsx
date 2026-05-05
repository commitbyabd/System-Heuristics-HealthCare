import { useEffect, useRef, useState } from "react";
import styles from "./CapabilityCard.module.css";

function CapabilityCard({ icon: Icon, title, description, index = 0 }) {
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
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`${styles.card} ${visible ? styles.visible : ""}`}
      style={{ "--delay": `${index * 100}ms` }}
    >
      <Icon size={22} className={styles.cardIcon} />
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </article>
  );
}

export default CapabilityCard;
