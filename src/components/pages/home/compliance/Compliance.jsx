import styles from "./compliance.module.css";
import Container from "../../../ui/container/Container";
import Chip from "../../../ui/chip/Chip";
import SectionTitle from "../../../ui/section-title/SectionTitle";
import ComplianceData from "../../../../data/compliance/ComplianceData";

function Compliance() {
  return (
    <section className={styles.compliance}>
      <Container>
        <div className={styles.header}>
          <Chip />

          <SectionTitle className={styles.title} />
        </div>

        <ComplianceData />
      </Container>
    </section>
  );
}

export default Compliance;
