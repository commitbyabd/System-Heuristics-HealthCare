import styles from "./principles-data.module.css";
import GradientRevealAnimation from "../../../../components/ui/gradient-reveal-animation/GradientRevealAnimation";
import { principlesData } from "./principles-data";

const PrinciplesData = () => {
  return (
    <div className={styles.principlesSection}>
      <div className={styles.cardsWrapper}>
        {principlesData.map((item) => (
          <article
            key={item.id}
            className={styles.card}
            data-principle-card
            data-direction={item.animationFrom}
          >
            <GradientRevealAnimation
              triggerOnScroll
              scrollStart="top 88%"
              charDuration={0.12}
              charStagger={0.005}
              finalDuration={0.08}
              colorInitial="var(--color-initial)"
              colorAccent="var(--color-teal)"
              colorFinal="var(--color-text-strong)"
            >
              <h3 className={styles.title}>{item.title}</h3>
            </GradientRevealAnimation>

            <GradientRevealAnimation
              className={styles.copyReveal}
              triggerOnScroll
              scrollStart="top 88%"
              charDuration={0.12}
              charStagger={0.005}
              finalDuration={0.08}
              colorInitial="var(--color-initial)"
              colorAccent="var(--color-teal)"
              colorFinal="var(--color-text)"
            >
              <p className={styles.description}>{item.description}</p>
            </GradientRevealAnimation>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PrinciplesData;
