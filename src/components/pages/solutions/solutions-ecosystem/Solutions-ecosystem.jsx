import Container from "../../../ui/container/Container";
import Chip from "../../../ui/chip/Chip";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import Accordion from "./accordion/Accordion";
import PatientEngagement from "./patient-engagement/PatientEngagement";
import styles from "./solutions-ecosystem.module.css";
import { ChartPie } from "lucide-react";
function SolutionsEcosystem() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <Chip
            text="Compliance & Data Security"
            className={styles.chip}
            Icon={ChartPie}
          />
          <SectionIntro
            variant="section"
            title={["Built for Healthcare", "Compliance & Security"]}
            titleAs="h2"
            highlightWord={3}
            titleClassName={styles.title}
            color="#1f2940"
            highlightColor="#2FD1AB"
            animateTitle
            animateMode="scroll"
            animateInitialColor="#737e8a"
            animateAccentColor="#2FD1AB"
            animateFinalColor="#1f2940"
          />
        </div>

        <div className={styles.grid}>
          <div className={styles.left}>
            <Accordion />
          </div>
          <div className={styles.right}>
            <PatientEngagement />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SolutionsEcosystem;
