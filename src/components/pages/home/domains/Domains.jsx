import styles from "./domains.module.css";
import Container from "../../../ui/container/Container";
import FeatureCard from "../../../ui/cards/feature-card/FeatureCard";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import {
  Activity,
  ClipboardPlus,
  ShieldCheck,
  Building2,
  HeartPulse,
  BarChart3,
} from "lucide-react";

const domainCards = [
  {
    id: "clinical",
    title: "Clinical Intelligence Systems",
    description: "AI-driven diagnostics, report analysis, and decision support",
    Icon: Activity,
    className: styles.cardTopLeft,
  },
  {
    id: "documentation",
    title: "Medical Documentation",
    description: "AI scribes, structured notes, and record systems",
    Icon: ClipboardPlus,
    className: styles.cardTopCenter,
  },
  {
    id: "security",
    title: "Compliance & Data Security",
    description: "HIPAA-ready systems and audit-safe infrastructure",
    Icon: ShieldCheck,
    className: styles.cardTopRight,
  },
  {
    id: "operations",
    title: "Hospital & Clinic Operations",
    description: "Workflow automation, scheduling, and patient management",
    Icon: Building2,
    className: styles.cardBottomLeft,
  },
  {
    id: "remote-care",
    title: "Telemedicine & Remote Care",
    description: "Secure consultation platforms and remote monitoring systems",
    Icon: HeartPulse,
    className: styles.cardBottomCenter,
  },
  {
    id: "analytics",
    title: "Healthcare Analytics",
    description: "Operational insights, better clinical and organizational decisions",
    Icon: BarChart3,
    className: styles.cardBottomRight,
  },
];

function Domains() {
  return (
    <section className={styles.section}>
      <Container className={styles.container}>
        <div className={styles.grid}>
          {domainCards.map((card) => (
            <FeatureCard
              key={card.id}
              Icon={card.Icon}
              title={card.title}
              description={card.description}
              className={`${styles.domainCard} ${card.className}`}
              iconClassName={styles.domainCardIcon}
              titleClassName={styles.domainCardTitle}
              descriptionClassName={styles.domainCardDescription}
            />
          ))}

          <div className={styles.centerCard}>
            <SectionIntro
              title="Healthcare Domains We Solve For"
              description="From clinical workflows to compliance, we design solutions across the full spectrum of healthcare operations."
              highlightWord={3}
              className={styles.centerIntro}
              titleClassName={styles.centerTitle}
              descriptionClassName={styles.centerDescription}
              color="#243246"
              highlightColor="#2FD1AB"
            />
          </div>

          <span className={`${styles.connector} ${styles.connectorTopLeft}`} />
          <span className={`${styles.connector} ${styles.connectorTopCenter}`} />
          <span className={`${styles.connector} ${styles.connectorTopRight}`} />
          <span className={`${styles.connector} ${styles.connectorBottomLeft}`} />
          <span className={`${styles.connector} ${styles.connectorBottomCenter}`} />
          <span className={`${styles.connector} ${styles.connectorBottomRight}`} />
        </div>
      </Container>
    </section>
  );
}

export default Domains;
