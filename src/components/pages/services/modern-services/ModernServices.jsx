import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./modern-services.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import {
  modernServicesData,
  ModernServiceCard,
} from "../../../../data/pages/services/modern-services/ModernServicesCards";

gsap.registerPlugin(ScrollTrigger);

function ModernServices() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray("[data-modern-row]", section);

      if (rows.length) {
        gsap.from(rows, {
          autoAlpha: 0,
          y: 26,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: rows[0],
            start: "top 88%",
            toggleActions: "play none none reset",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <Container className={styles.container}>
        <div className={styles.intro}>
          <SectionIntro
            title={["Services Designed for", "Modern Healthcare"]}
            description=""
            titleAs="h2"
            highlightWord={4}
            color="#0d1b2e"
            highlightColor="#2FD1AB"
            className={styles.introWrap}
            titleClassName={styles.introTitle}
            descriptionClassName={styles.introDescription}
            animateTitle
            animateMode="scroll"
            animateInitialColor="#c5cdd6"
            animateAccentColor="#2FD1AB"
            animateFinalColor="#0d1b2e"
          />
        </div>

        <ul className={styles.list}>
          {modernServicesData.map((service) => (
            <li key={service.id} data-modern-row className={styles.rowWrap}>
              <ModernServiceCard service={service} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default ModernServices;
