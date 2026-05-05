import styles from "./success-story.module.css";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import GradientScrollAnimation from "../../../ui/gradient-scroll-animation/GradientScrollAnimation";
import Button from "../../../ui/button/Button";

function SuccessStory() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionIntro
          variant="section"
          title="Ready to create your success story?"
          titleAs="h2"
          highlightWord={0}
          titleClassName={styles.title}
          color="#1f2940"
          animateTitle
          animateMode="scroll"
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
