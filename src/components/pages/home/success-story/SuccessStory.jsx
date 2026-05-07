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
          titleStyle={{ fontSize: "var(--heading-xl)" }}
          animationVariant="dark"
          animateTitle
          animateMode="scroll"
        />
        <GradientScrollAnimation variant="dark">
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
