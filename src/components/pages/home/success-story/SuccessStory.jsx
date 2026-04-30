import styles from "./success-story.module.css";
import SectionTitle from "../../../ui/section-title/SectionTitle";
import GradientScrollAnimation from "../../../ui/gradient-scroll-animation/GradientScrollAnimation";
import Button from "../../../ui/button/Button";

function SuccessStory() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionTitle
          title="Ready to create your success story?"
          highlightWord={0}
          className={styles.title}
          color="#1f2940"
          animateTitle
          animateInitialColor="#737e8a"
          animateAccentColor="#2FD1AB"
          animateFinalColor="#1f2940"
        />
        <GradientScrollAnimation
          colorInitial="#737e8a"
          colorAccent="#2FD1AB"
          colorFinal="#6f7b8f"
        >
          <p className={styles.subtitle}>
            We turn proven healthcare strategies into practical digital
            solutions built for your goals, workflows, and patients.
          </p>
        </GradientScrollAnimation>
        <div className={styles.cta}>
          <Button
            text="Book a Free Strategy Call"
            variant="filled"
            width="222px"
          />
        </div>
      </div>
    </section>
  );
}

export default SuccessStory;
