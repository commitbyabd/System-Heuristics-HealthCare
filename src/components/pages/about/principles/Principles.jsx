import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./principles.module.css";
import Container from "../../../ui/container/Container";
import GradientScrollAnimation from "../../../ui/gradient-scroll-animation/GradientScrollAnimation";
import PrincipleCard from "./_components/PrincipleCard";
import { principlesData } from "../../../../data/pages/about/principles-data/principles-data";

gsap.registerPlugin(ScrollTrigger);

function Principles() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray("[data-principle-card]", section);
      if (!cards.length) return;

      cards.forEach((card) => {
        const direction = card.dataset.direction;

        const startState =
          direction === "left"
            ? { x: -120, y: 0 }
            : direction === "bottom"
              ? { x: 0, y: 120 }
              : { x: 120, y: 0 };

        gsap.set(card, {
          ...startState,
          opacity: 0,
        });

        gsap.to(card, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 86%",
            once: true,
          },
        });
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <Container>
        <div className={styles.intro}>
          <GradientScrollAnimation
            className={styles.introCopy}
            colorInitial="#c5c8cf"
            colorAccent="#2FD1AB"
            colorFinal="#07142b"
            highlightFinalColor="#2FD1AB"
            highlightWords={[{ elementIndex: 0, wordIndex: 1 }]}
          >
            <h2 className={styles.title}>Our Principles</h2>
            <p className={styles.description}>
              The foundation of everything we do, our mission, vision, and
              values guide how we build technology, empower people, and shape
              the future.
            </p>
          </GradientScrollAnimation>
        </div>
      </Container>

      <div className={styles.cardsBand}>
        <div className={styles.principlesSection}>
          <div className={styles.cardsWrapper}>
            {principlesData.map((item) => (
              <PrincipleCard
                key={item.id}
                title={item.title}
                description={item.description}
                animationFrom={item.animationFrom}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Principles;
