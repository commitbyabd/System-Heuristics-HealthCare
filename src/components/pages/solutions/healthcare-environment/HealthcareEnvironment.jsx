import styles from "./healthcare-environment.module.css";
import Container from "../../../ui/container/Container";
import Chip from "../../../ui/chip/Chip";
import SectionTitle from "../../../ui/section-title/SectionTitle";
import GradientScrollAnimation from "../../../ui/gradient-scroll-animation/GradientScrollAnimation";
import Button from "../../../ui/button/Button";
import { HealthcareEnvironmentData } from "../../../../data/pages/solutions/environment/HealthcareEnvironment";
import useAutoplaySlider from "../../../../hooks/useAutoplaySlider";

function HealthcareEnvironment() {
  const { section, steps } = HealthcareEnvironmentData;
  const total = steps.length;
  const { sectionRef, activeIndex, goToSlide } = useAutoplaySlider({
    totalSlides: total,
    delay: 4000,
    threshold: 0.4,
  });

  return (
    <section ref={sectionRef} className={`${styles.section} bgGrid`}>
      <Container className={styles.container}>
        <div className={styles.header}>
          <Chip text={section.chip} className={styles.chip} />
          <SectionTitle
            title={section.title}
            highlightWord={section.highlightWord}
            className={styles.title}
            color="#ffffff"
            highlightColor="#2FD1AB"
            animateTitle
            animateInitialColor="#5b6b78"
            animateAccentColor="#2FD1AB"
            animateFinalColor="#ffffff"
          />
          <GradientScrollAnimation
            colorInitial="#5b6b78"
            colorAccent="#2FD1AB"
            colorFinal="#c5cdd4"
          >
            <p className={styles.subtitle}>{section.subtitle}</p>
          </GradientScrollAnimation>
        </div>

        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Healthcare environments"
        >
          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            return (
              <Button
                key={step.id}
                text={step.label}
                variant={isActive ? "filled" : "transparent"}
                width="auto"
                role="tab"
                aria-selected={isActive}
                onClick={() => goToSlide(index, { stop: true })}
              />
            );
          })}
        </div>

        <div className={styles.stage}>
          <div
            className={styles.viewport}
            style={{
              "--total": total,
              "--active-index": activeIndex,
            }}
          >
            <div className={styles.track}>
              {steps.map((step, index) => {
                const isActive = index === activeIndex;
                return (
                  <article
                    key={step.id}
                    className={`${styles.slide} ${isActive ? styles.slideActive : ""}`.trim()}
                    aria-hidden={!isActive}
                  >
                    <div className={styles.imageWrap}>
                      <img
                        src={step.image}
                        alt={step.label}
                        className={styles.image}
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.copyBlock}>
                      <div className={styles.copyRow}>
                        <h3 className={styles.copyHeading}>Pain Point:</h3>
                        <p className={styles.copyText}>{step.painPoint}</p>
                      </div>
                      <div className={styles.copyRow}>
                        <h3 className={styles.copyHeading}>Solution:</h3>
                        <p className={styles.copyText}>{step.solution}</p>
                      </div>
                      <div className={styles.copyRow}>
                        <h3 className={styles.copyHeading}>Result:</h3>
                        <p className={styles.copyText}>{step.result}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HealthcareEnvironment;
