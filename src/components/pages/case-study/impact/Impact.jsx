import { useEffect, useRef, useState } from "react";
import styles from "./impact.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";

const items = [
  "Improved operational efficiency across healthcare systems",
  "Enhanced patient engagement and experience",
  "Reduced administrative workload through workflow automation",
  "Stronger data security and HIPAA compliance posture",
];

function Impact() {
  const cardsRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = cardsRef.current;
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
    <section className={`${styles.section} bgGrid`}>
      <Container className={styles.inner}>
        <SectionIntro
          variant="section"
          title="Delivering Measurable Impact"
          description="Real outcomes from healthcare technology that solves real problems."
          titleAs="h2"
          highlightWord={[2, 3]}
          color="#FFFFFF"
          className={styles.intro}
          animateTitle
          animateMode="scroll"
          animateFinalColor="#FFFFFF"
        />

        <div
          ref={cardsRef}
          className={`${styles.cards} ${visible ? styles.visible : ""}`}
        >
          <span className={styles.timeline} aria-hidden="true">
            <span className={`${styles.comet} ${styles.comet1}`} />
            <span className={`${styles.comet} ${styles.comet2}`} />
            <span className={`${styles.comet} ${styles.comet3}`} />
          </span>

          {items.map((text, index) => (
            <div
              key={index}
              className={`${styles.card} bgDarkBlur`}
              style={{ "--delay": `${index * 200}ms` }}
            >
              <span className={styles.dot} aria-hidden="true" />
              <p className={styles.cardText}>
                <span className={styles.cardIndex}>{index + 1}.</span>
                {text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Impact;
