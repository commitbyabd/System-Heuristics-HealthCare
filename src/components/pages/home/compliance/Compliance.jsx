import styles from "./compliance.module.css";
import Chip from "../../../ui/chip/Chip";
import SectionTitle from "../../../ui/section-title/SectionTitle";
import ComplianceData from "../../../../data/compliance/ComplianceData";

function Compliance() {
  return (
    <section className={styles.compliance}>
      <div className={styles.header}>
        <Chip />
        <SectionTitle className={styles.title} />
      </div>
      <ComplianceData />
    </section>
  );
}

export default Compliance;
