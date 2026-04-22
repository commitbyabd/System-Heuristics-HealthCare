import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./compliance-data.module.css";

gsap.registerPlugin(ScrollTrigger);

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
  const gridRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!grid || cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0, x: -80 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          start: "top 90%",
          end: "top 25%",
          scrub: 1.2,
        },
      });

      tl.to(cards, {
        opacity: 1,
        x: 0,
        ease: "power3.out",
        duration: 1,
        stagger: 0.6,
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.complianceSection}>
      <div ref={gridRef} className={styles.cardsGrid}>
        {cardsData.map((card, index) => {
          const words = card.title.split(" ");

          return (
            <article
              key={card.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={styles.card}
            >
              <p className={styles.tag}>{card.tag}</p>

              <div className={styles.titleRow}>
                <img className={styles.icon} src={card.icon} alt={card.alt} />

                <h3 className={styles.title}>
                  {words.map((word, wordIndex) => (
                    <span
                      key={wordIndex}
                      style={{
                        color:
                          wordIndex + 1 === card.highlightWord
                            ? defaultHighlightColor
                            : "#1F2937",
                      }}
                    >
                      {word}
                      {wordIndex !== words.length - 1 && " "}
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
