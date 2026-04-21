import styles from "./compliance.module.css";
import Chip from "../../../ui/chip/Chip";
import SectionTitle from "../../../ui/section-title/SectionTitle";
import ComplianceData from "../../../../data/compliance/ComplianceData";
function Compliance() {
  return (
    <section className={styles.compliance}>
      <Chip />
      <SectionTitle />
      <ComplianceData />
    </section>
  );
}

export default Compliance;
