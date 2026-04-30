import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./compliance.module.css";
import Container from "../../../ui/container/Container";
import Chip from "../../../ui/chip/Chip";
import SectionTitle from "../../../ui/section-title/SectionTitle";
import ComplianceData from "../../../../data/compliance/ComplianceData";

gsap.registerPlugin(ScrollTrigger);

function Compliance() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const cards = gsap.utils.toArray(
        section.querySelectorAll("[data-compliance-card]"),
      );
      if (!cards.length) return undefined;

      gsap.set(cards, {
        x: () => window.innerWidth,
        opacity: 0,
      });

      const tween = gsap.to(cards, {
        x: 0,
        opacity: 1,
        ease: "power3.out",
        duration: 0.9,
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(cards, { clearProps: "transform,opacity" });
      };
    });

    mm.add("(max-width: 768px)", () => {
      const cards = gsap.utils.toArray(
        section.querySelectorAll("[data-compliance-card]"),
      );
      gsap.set(cards, { clearProps: "transform,opacity" });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.compliance}>
      <Container>
        <div className={styles.header}>
          <Chip />

          <SectionTitle className={styles.title} animateTitle />
        </div>

        <ComplianceData />
      </Container>
    </section>
  );
}

export default Compliance;
