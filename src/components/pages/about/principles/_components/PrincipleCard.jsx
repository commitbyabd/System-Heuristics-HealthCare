import GradientRevealAnimation from "../../../../ui/gradient-reveal-animation/GradientRevealAnimation";
import styles from "./PrincipleCard.module.css";

function PrincipleCard({ title, description }) {
  return (
    <article
      className={styles.card}
      data-principle-card
      data-direction="bottom"
    >
      <GradientRevealAnimation
        variant="dark"
        triggerOnScroll
        triggerOnce
        scrollStart="top 88%"
        charDuration={0.14}
        charStagger={0.005}
        finalDuration={0.16}
      >
        <h3 className={styles.title}>{title}</h3>
      </GradientRevealAnimation>

      <GradientRevealAnimation
        className={styles.copyReveal}
        variant="dark"
        triggerOnScroll
        triggerOnce
        scrollStart="top 88%"
        charDuration={0.14}
        charStagger={0.005}
        finalDuration={0.16}
      >
        <p className={styles.description}>{description}</p>
      </GradientRevealAnimation>
    </article>
  );
}

export default PrincipleCard;
