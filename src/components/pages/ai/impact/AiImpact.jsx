import { useEffect, useRef, useState } from "react";
import styles from "./ai-impact.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import {
  aiImpactIntro,
  aiImpactItems,
} from "../../../../data/pages/ai/impact/AiImpactData";

function AiImpact() {
  const itemsRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = itemsRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <svg
        className={styles.arcs}
        viewBox="0 0 500 700"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMinYMax meet"
      >
        <path
          d="M 0 520 A 180 180 0 0 1 180 700"
          className={`${styles.arc} ${styles.arcBase}`}
        />
        <path
          d="M 0 520 A 180 180 0 0 1 180 700"
          className={`${styles.arc} ${styles.arcPulse} ${styles.pulseDown}`}
          style={{ "--len": "283" }}
        />

        <path
          d="M 0 400 A 300 300 0 0 1 300 700"
          className={`${styles.arc} ${styles.arcBase}`}
        />
        <path
          d="M 0 400 A 300 300 0 0 1 300 700"
          className={`${styles.arc} ${styles.arcPulse} ${styles.pulseUp}`}
          style={{ "--len": "471" }}
        />

        <path
          d="M 0 280 A 420 420 0 0 1 420 700"
          className={`${styles.arc} ${styles.arcBase}`}
        />
        <path
          d="M 0 280 A 420 420 0 0 1 420 700"
          className={`${styles.arc} ${styles.arcPulse} ${styles.pulseDown}`}
          style={{ "--len": "660" }}
        />
      </svg>

      <Container className={styles.inner}>
        <div className={styles.header}>
          <SectionIntro
            title={aiImpactIntro.title}
            description={aiImpactIntro.description}
            titleAs="h2"
            highlightWord={aiImpactIntro.highlightWord}
            color="#001830"
            className={styles.intro}
            animateTitle
            animateMode="scroll"
            animateFinalColor="#001830"
          />
        </div>

        <div
          ref={itemsRef}
          className={`${styles.items} ${visible ? styles.visible : ""}`}
        >
          {aiImpactItems.map((item, index) => (
            <article
              key={item.id}
              className={`${styles.item} ${
                index % 2 === 0 ? styles.itemLeft : styles.itemRight
              }`}
              style={{ "--delay": `${index * 200}ms` }}
            >
              <span className={styles.itemNumber}>
                [{String(item.id).padStart(1, "0")}]
              </span>
              <h3 className={styles.itemTitle}>
                {Array.isArray(item.title)
                  ? item.title.map((line, i) => (
                      <span key={i} className={styles.itemTitleLine}>
                        {line}
                      </span>
                    ))
                  : item.title}
              </h3>
              <p className={styles.itemDescription}>{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default AiImpact;
