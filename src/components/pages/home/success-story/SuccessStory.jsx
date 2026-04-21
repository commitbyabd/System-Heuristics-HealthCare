import styles from "./success-story.module.css";
import SectionTitle from "../../../ui/section-title/SectionTitle";
import BackgroundFilledButton from "../../../ui/buttons/background-filled/BackgroundFilledButton";

function SuccessStory() {
  return (
    <section className={styles.section}>
      <SectionTitle
        title="Ready to create your success story?"
        highlightWord={0}
        className={styles.title}
        color="#ffffff"
      />
      <p className={styles.subtitle}>
        We turn proven healthcare strategies into practical digital solutions
        built for your goals, workflows, and patients.
      </p>
      <div className={styles.cta}>
        <BackgroundFilledButton
          text="Book a Free Strategy Call"
          width="240px"
        />
      </div>
    </section>
  );
}

export default SuccessStory;
