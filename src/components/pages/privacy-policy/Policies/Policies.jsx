import styles from "./policies.module.css";
import Container from "../../../ui/container/Container";
import PolicyCard from "./_components/PolicyCard";
import { PrivacyPolicyData } from "../../../../data/pages/privacy-policy/PrivacyPolicyData";

function Policies() {
  return (
    <section className={styles.section}>
      <Container className={styles.container} maxWidth={1100}>
        <h1 className={styles.pageTitle}>{PrivacyPolicyData.pageTitle}</h1>

        <div className={styles.cardList}>
          {PrivacyPolicyData.sections.map((section) => (
            <PolicyCard
              key={section.id}
              Icon={section.Icon}
              heading={section.heading}
              blocks={section.blocks}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Policies;
