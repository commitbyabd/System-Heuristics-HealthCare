import styles from "./healthcare-environment.module.css";
import Container from "../../../ui/container/Container";
import Chip from "../../../ui/chip/Chip";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import GradientScrollAnimation from "../../../ui/gradient-scroll-animation/GradientScrollAnimation";
import Button from "../../../ui/button/Button";
import EnvironmentSlide from "./_components/EnvironmentSlide";
import { HealthcareEnvironmentData } from "../../../../data/pages/solutions/environment/HealthcareEnvironment";
import useAutoplaySlider from "../../../../hooks/useAutoplaySlider";
import { Hospital } from "lucide-react";
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
          <Chip
            text="Platform Versatility"
            className={styles.chip}
            Icon={Hospital}
          />
          <SectionIntro
            variant="section"
            title={section.title}
            titleAs="h2"
            highlightWord={section.highlightWord}
            titleClassName={styles.title}
            animationVariant="light"
            animateTitle
            animateMode="scroll"
          />
          <GradientScrollAnimation variant="light">
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
              {steps.map((step, index) => (
                <EnvironmentSlide
                  key={step.id}
                  image={step.image}
                  label={step.label}
                  painPoint={step.painPoint}
                  solution={step.solution}
                  result={step.result}
                  isActive={index === activeIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HealthcareEnvironment;
