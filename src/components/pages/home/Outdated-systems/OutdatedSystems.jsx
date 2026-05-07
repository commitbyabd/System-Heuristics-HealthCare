import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import styles from "./outdated-systems.module.css";
import Chip from "../../../ui/chip/Chip";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import Container from "../../../ui/container/Container";
import OutdatedSystemsStatCard from "./_components/OutdatedSystemsStatCard";
import {
  outdatedSystemsContent,
  outdatedSystemsStats,
} from "../../../../data/pages/home/outdated-systems/OutdatedSystemsData";
import { Microscope } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function OutdatedSystems() {
  const sectionRef = useRef(null);
  const [animatedValues, setAnimatedValues] = useState(
    outdatedSystemsStats.map(() => 0),
  );
  const [hasStarted, setHasStarted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      once: true,
      onEnter: () => setHasStarted(true),
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 1800;
    const targets = outdatedSystemsStats.map((item) => item.high ?? item.low);
    const startTime = performance.now();
    let frameId = 0;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues(
        targets.map((target) => Math.round(target * easedProgress)),
      );

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [hasStarted]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={`${styles.panel} bgGrid`}>
        <Container className={styles.inner}>
          <div className={styles.header}>
            <Chip
              text={outdatedSystemsContent.chipText}
              className={styles.chip}
              Icon={Microscope}
            />
            <SectionIntro
              variant="section"
              title={outdatedSystemsContent.title}
              titleAs="h2"
              highlightWord={outdatedSystemsContent.highlightWord}
              titleClassName={styles.title}
              animationVariant="light"
              animateTitle
              animateMode="scroll"
            />
          </div>

          <div className={styles.statsGrid}>
            {outdatedSystemsStats.map((stat, index) => (
              <OutdatedSystemsStatCard
                key={stat.id}
                stat={stat}
                animatedValue={animatedValues[index]}
                isVisible={hasStarted}
                index={index}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}

export default OutdatedSystems;
