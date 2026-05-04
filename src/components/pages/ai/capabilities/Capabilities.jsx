import { useEffect, useRef, useState } from "react";
import styles from "./capabilities.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import Chip from "../../../ui/chip/Chip";
import Shield from "../../../ui/icons/patient-engagement/Shield";
import ChatBubble from "../../../ui/icons/patient-engagement/ChatBubble";
import Gear from "../../../ui/icons/patient-engagement/Gear";
import Stats from "../../../ui/icons/patient-engagement/Stats";
import Brain from "../../../ui/icons/patient-engagement/Brain";
import Clip from "../../../ui/icons/patient-engagement/Clip";
import { capabilitiesData } from "../../../../data/pages/ai/capabilities/CapabilitiesData";

const ICONS = {
  1: Shield,
  2: ChatBubble,
  3: Gear,
  4: Stats,
  5: Brain,
  6: Clip,
};

function Capabilities() {
  const gridRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

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
            triggerOnScroll
          />
        </div>

        <div
          ref={gridRef}
          className={`${styles.grid} ${visible ? styles.visible : ""}`}
        >
          {capabilitiesData.map((item, index) => {
            const Icon = ICONS[item.id] ?? Shield;
            return (
              <article
                key={item.id}
                className={styles.card}
                style={{ "--delay": `${index * 120}ms` }}
              >
                <Icon size={22} className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Capabilities;
