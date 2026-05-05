import styles from "./purpose-built.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";

function PurposeBuilt() {
  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <img
          className={styles.logo}
          src="/images/logo/sh-logo.svg"
          alt="System Heuristics"
        />
        <SectionIntro
          variant="section"
          title={["Purpose-Built AI for Real", "Healthcare Workflows"]}
          description="AI in healthcare should do more than impress — it should solve meaningful problems. At System Heuristics Health, we design AI systems that fit into real clinical, operational, and patient-facing environments. Our focus is on building intelligent tools that are secure, scalable, and genuinely useful."
          titleAs="h2"
          highlightWord={5}
          className={styles.intro}
          animateTitle
          animateMode="scroll"
        />
      </Container>
    </section>
  );
}

export default PurposeBuilt;
