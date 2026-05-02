import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./pipeline.module.css";
import Container from "../../../ui/container/Container";
import GradientRevealAnimation from "../../../ui/gradient-reveal-animation/GradientRevealAnimation";

gsap.registerPlugin(ScrollTrigger);

const PIPELINE_LOGOS = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  src: `/images/about/logos/logo-${index + 1}.png`,
  alt: `Technology logo ${index + 1}`,
}));

function distributeLogos(logos, columnCount) {
  const columns = Array.from({ length: columnCount }, () => []);

  logos.forEach((logo, index) => {
    columns[index % columnCount].push(logo);
  });

  return columns;
}

function Pipeline() {
  const sectionRef = useRef(null);
  const logoColumns = useMemo(() => distributeLogos(PIPELINE_LOGOS, 5), []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      const setSectionAnimationState = (isActive) => {
        section.setAttribute(
          "data-animations-active",
          isActive ? "true" : "false",
        );
      };

      setSectionAnimationState(false);

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => setSectionAnimationState(true),
        onEnterBack: () => setSectionAnimationState(true),
        onLeave: () => setSectionAnimationState(false),
        onLeaveBack: () => setSectionAnimationState(false),
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <Container className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.content}>
            <GradientRevealAnimation
              className={styles.intro}
              triggerOnScroll
              scrollStart="top 82%"
              charDuration={0.18}
              charStagger={0.01}
              finalDuration={0.1}
              colorInitial="#98a3af"
              colorAccent="#2FD1AB"
              colorFinal="#123629"
              highlightWords={[{ elementIndex: 0, wordIndex: 1 }]}
            >
              <h2 className={styles.title}>Technologies Powering the Pipeline</h2>
              <p className={styles.description}>
                A specialized scoring and automation stack combining mobile
                automation, browser automation, and data processing tools to
                deliver scalable product and ingredient intelligence.
              </p>
            </GradientRevealAnimation>
          </div>

          <div className={styles.logoWall} aria-label="Technology logos">
            {logoColumns.map((column, columnIndex) => {
              const duplicatedColumn = [...column, ...column];
              const directionClass =
                columnIndex % 2 === 0 ? styles.columnDown : styles.columnUp;

              return (
                <div
                  key={`column-${columnIndex + 1}`}
                  className={styles.columnViewport}
                >
                  <div
                    className={`${styles.columnTrack} ${directionClass}`.trim()}
                  >
                    {duplicatedColumn.map((logo, logoIndex) => (
                      <div
                        key={`${logo.id}-${logoIndex}`}
                        className={`logobg ${styles.logoCard}`.trim()}
                      >
                        <img
                          className={styles.logoImage}
                          src={logo.src}
                          alt={logo.alt}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Pipeline;
