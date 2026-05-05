import styles from "./capabilities.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import Chip from "../../../ui/chip/Chip";
import CapabilityCard from "./_components/CapabilityCard";
import { capabilitiesData } from "../../../../data/pages/ai/capabilities/CapabilitiesData";

function Capabilities() {
  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <div className={styles.header}>
          <Chip text="Secure & Encrypted" />
          <SectionIntro
            title="Our AI Capabilities"
            description="From automation to predictive intelligence, we help healthcare organizations apply AI where it creates measurable value."
            titleAs="h2"
            highlightWord={2}
            color="#001830"
            className={styles.intro}
            titleClassName={styles.title}
            descriptionClassName={styles.description}
            animateTitle
            animateMode="scroll"
            animateFinalColor="#001830"
          />
        </div>

        <div className={styles.grid}>
          {capabilitiesData.map((item, index) => (
            <CapabilityCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              description={item.description}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Capabilities;
