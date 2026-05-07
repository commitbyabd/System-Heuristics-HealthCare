import GradientRevealAnimation from "../../../../ui/gradient-reveal-animation/GradientRevealAnimation";
import styles from "./PrincipleCard.module.css";

function PrincipleCard({ title, description, animationFrom }) {
  return (
    <article
      className={styles.card}
      data-principle-card
      data-direction={animationFrom}
    >
      <GradientRevealAnimation
        variant="dark"
        triggerOnScroll
        scrollStart="top 88%"
        charDuration={0.12}
        charStagger={0.005}
        finalDuration={0.08}
      >
        <h3 className={styles.title}>{title}</h3>
      </GradientRevealAnimation>

      <GradientRevealAnimation
        className={styles.copyReveal}
        variant="dark"
        triggerOnScroll
        scrollStart="top 88%"
        charDuration={0.12}
        charStagger={0.005}
        finalDuration={0.08}
      >
        <p className={styles.description}>{description}</p>
      </GradientRevealAnimation>
    </article>
  );
}

export default PrincipleCard;
