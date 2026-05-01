import styles from "./principles-data.module.css";
import { principlesData } from "./principles-data";

const PrinciplesData = () => {
  return (
    <section className={styles.principlesSection}>
      <div className={styles.cardsWrapper}>
        {principlesData.map((item) => (
          <article key={item.id} className={styles.card}>
            <h2 className={styles.title}>{item.title}</h2>

            <p className={styles.description}>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PrinciplesData;
