import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./compliance.module.css";
import Chip from "../../../ui/chip/Chip";
import SectionTitle from "../../../ui/section-title/SectionTitle";
import ComplianceData from "../../../../data/compliance/ComplianceData";

gsap.registerPlugin(ScrollTrigger);

function Compliance() {
  const sectionRef = useRef(null);
  const chipRef = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const chip = chipRef.current;
    const title = titleRef.current;
    if (!section || !chip || !title) return;

    const ctx = gsap.context(() => {
      gsap.set([chip, title], { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "top 45%",
          scrub: 1.2,
        },
      });

      tl.to(chip, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 1,
      }).to(
        title,
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 1.2,
        },
        "-=0.4",
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.compliance}>
      <div className={styles.header}>
        <div ref={chipRef}>
          <Chip />
        </div>
        <div ref={titleRef}>
          <SectionTitle className={styles.title} />
        </div>
      </div>
      <ComplianceData />
    </section>
  );
}

export default Compliance;
