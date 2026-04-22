import { Link } from "react-router-dom";
import styles from "./compliance-data.module.css";

const cardsData = [
  {
    id: 1,
    tag: "Infrastructure Security",
    title: "Enterprise Security Infrastructure",
    highlightWord: 3,
    description:
      "Protect sensitive healthcare data with end-to-end encryption, secure API, and hardened infrastructure built for enterprise-grade reliability.",
    buttonText: "Learn More",
    icon: "/images/home/icons/security-logo.svg",
    alt: "Enterprise security icon",
  },
  {
    id: 2,
    tag: "Clinical Intelligence",
    title: "AI-Powered Clinical Intelligence",
    highlightWord: 3,
    description:
      "Leverage intelligent automation and machine learning to streamline diagnostics, optimize workflows, and enhance clinical decision-making.",
    buttonText: "Explore AI Solutions",
    icon: "/images/home/icons/AiPowered-logo.svg",
    alt: "AI clinical intelligence icon",
  },
  {
    id: 3,
    tag: "Regulatory Compliance",
    title: "HIPAA-Ready Architecture",
    highlightWord: 1,
    description:
      "Built with healthcare compliance standards in mind, ensuring patient data is handled securely and responsibly at every touchpoint.",
    buttonText: "View Compliance Details",
    icon: "/images/home/icons/compliant-logo.svg",
    alt: "HIPAA ready architecture icon",
  },
  {
    id: 4,
    tag: "Enterprise Partnerships",
    title: "BAA & Compliance Support",
    highlightWord: 3,
    description:
      "We support Business Associate Agreements and enterprise compliance workflows for organizations requiring regulated vendor partnerships.",
    buttonText: "Discuss Compliance Needs",
    icon: "/images/home/icons/Compliance-logo.svg",
    alt: "Compliance support icon",
  },
];

const defaultHighlightColor = "#2FD1AB";

function ComplianceData() {
  return (
    <section className={styles.complianceSection}>
      <div className={styles.cardsGrid}>
        {cardsData.map((card) => {
          const words = card.title.split(" ");

          return (
            <article key={card.id} className={styles.card}>
              <p className={styles.tag}>{card.tag}</p>

              <div className={styles.titleRow}>
                <img className={styles.icon} src={card.icon} alt={card.alt} />

                <h3 className={styles.title}>
                  {words.map((word, index) => (
                    <span
                      key={index}
                      style={{
                        color:
                          index + 1 === card.highlightWord
                            ? defaultHighlightColor
                            : "#1F2937",
                      }}
                    >
                      {word}
                      {index !== words.length - 1 && " "}
                    </span>
                  ))}
                </h3>
              </div>

              <p className={styles.description}>{card.description}</p>

              <Link to="/" className={styles.cardButton}>
                <span>{card.buttonText}</span>
                <span className={styles.arrow}>→</span>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ComplianceData;
