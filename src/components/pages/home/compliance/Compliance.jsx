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
    const ctx = gsap.context(() => {
      mm.add("(min-width: 769px)", () => {
        const cards = gsap.utils.toArray("[data-compliance-card]");
        if (!cards.length) return undefined;
        const scrollDistance = Math.max(
          window.innerHeight * cards.length,
          cards.length * 320,
        );

        gsap.set(cards, {
          x: (index) => window.innerWidth * 0.5 + index * 36,
          opacity: 0,
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card) => {
          timeline.to(card, {
            x: 0,
            opacity: 1,
            ease: "none",
            duration: 1,
          });
        });

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
          gsap.set(cards, { clearProps: "transform,opacity" });
        };
      });

      mm.add("(max-width: 768px)", () => {
        const cards = gsap.utils.toArray("[data-compliance-card]");
        gsap.set(cards, { clearProps: "transform,opacity" });
      });
    }, section);

    return () => {
      ctx.revert();
      mm.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.compliance}>
      <Container>
        <div className={styles.header}>
          <Chip />

          <SectionTitle className={styles.title} />
        </div>

        <ComplianceData />
      </Container>
    </section>
  );
}

export default Compliance;
