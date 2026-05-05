import styles from "./Impact.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import ImpactCard from "./_components/ImpactCard";
import { impactItems } from "../../../../data/pages/ai/impact/ImpactData";

const ARC_RADII = [180, 260, 340, 420, 500];

function Impact() {
  return (
    <section className={styles.section}>
      <svg
        className={styles.arcs}
        viewBox="0 0 600 1000"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMinYMid meet"
      >
        {ARC_RADII.map((r) => (
          <circle key={r} cx="0" cy="500" r={r} className={styles.arc} />
        ))}
      </svg>

      <Container className={styles.inner}>
        <div className={styles.header}>
          <SectionIntro
            variant="section"
            title="Where AI Creates Impact"
            description="We help healthcare teams apply AI across patient care, administration, and decision support."
            titleAs="h2"
            highlightWord={3}
            color="#001830"
            className={styles.intro}
            animateTitle
            animateMode="scroll"
            animateFinalColor="#001830"
          />
        </div>

        <div className={styles.items}>
          {impactItems.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.itemSlot} ${
                index % 2 === 0 ? styles.left : styles.right
              }`}
            >
              <ImpactCard
                index={item.index}
                title={item.title}
                description={item.description}
                position={index}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Impact;
