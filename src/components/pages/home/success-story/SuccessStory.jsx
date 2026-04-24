import styles from "./success-story.module.css";
import SectionTitle from "../../../ui/section-title/SectionTitle";
import BackgroundFilledButton from "../../../ui/buttons/background-filled/BackgroundFilledButton";

function SuccessStory() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionTitle
          title="Ready to create your success story?"
          highlightWord={0}
          className={styles.title}
          color="#1f2940"
        />
        <p className={styles.subtitle}>
          We turn proven healthcare strategies into practical digital solutions
          built for your goals, workflows, and patients.
        </p>
        <div className={styles.cta}>
          <BackgroundFilledButton
            text="Book a Free Strategy Call"
            width="277px"
            height="46px"
            className={styles.ctaButton}
            textClassName={styles.ctaButtonText}
            iconClassName={styles.ctaButtonIcon}
          />
        </div>
      </div>
    </section>
  );
}

export default SuccessStory;
