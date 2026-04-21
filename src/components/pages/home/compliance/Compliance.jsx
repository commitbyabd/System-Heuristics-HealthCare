import styles from "./compliance.module.css";
import Chip from "../../../ui/chip/Chip";
import SectionTitle from "../../../ui/section-title/SectionTitle";
function Compliance() {
  return (
    <section className={styles.compliance}>
      <Chip />
      <SectionTitle />
    </section>
  );
}

export default Compliance;
