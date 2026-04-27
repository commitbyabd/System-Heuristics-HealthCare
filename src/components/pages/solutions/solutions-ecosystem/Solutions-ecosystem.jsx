import Container from "../../../ui/container/Container";
import Chip from "../../../ui/chip/Chip";
import SectionTitle from "../../../ui/section-title/SectionTitle";
import Accordion from "./accordion/Accordion";
import PatientEngagement from "./patient-engagement/PatientEngagement";
import styles from "./solutions-ecosystem.module.css";

function SolutionsEcosystem() {
  return (
    <Container>
      <div className={styles.header}>
        <Chip text="Secure & Encrypted" />
        <SectionTitle
          title="Built for Healthcare Compliance & Security"
          highlightWord={3}
          color="#00213a"
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
  );
}

export default SolutionsEcosystem;
