import { useMemo } from "react";
import styles from "./our-solutions.module.css";
import Chip from "../../../ui/chip/Chip";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import GradientScrollAnimation from "../../../ui/gradient-scroll-animation/GradientScrollAnimation";
import useAutoplaySlider from "../../../../hooks/useAutoplaySlider";
import OurSolutionsShowcase from "./_components/OurSolutionsShowcase";
import { HeartHandshake } from "lucide-react";
import {
  ourSolutionsContent,
  ourSolutionsSteps,
} from "../../../../data/pages/home/our-solutions/OurSolutionsData";

function OurSolutions() {
  const total = ourSolutionsSteps.length;
  const {
    sectionRef,
    activeIndex: activeStep,
    goToSlide,
  } = useAutoplaySlider({
    totalSlides: total,
    delay: 2000,
    threshold: 0.45,
  });
  const pillCount = total - 1;
  const active = ourSolutionsSteps[activeStep];
  const indicatorStyle = useMemo(
    () =>
      activeStep < pillCount
        ? {
            transform: `translateY(calc(${activeStep} * var(--solutions-rail-step)))`,
            opacity: 1,
          }
        : {
            transform: `translateY(calc(${pillCount - 1} * var(--solutions-rail-step)))`,
            opacity: 0,
          },
    [activeStep, pillCount],
  );

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.stickyFrame}>
        <Container className={styles.container}>
          <div className={styles.header}>
            <Chip
              text={ourSolutionsContent.chipText}
              className={styles.chip}
              Icon={HeartHandshake}
            />
            <SectionIntro
              variant="section"
              title={ourSolutionsContent.title}
              titleAs="h2"
              highlightWord={ourSolutionsContent.highlightWord}
              titleClassName={styles.title}
              animationVariant="dark"
              animateTitle
              animateMode="scroll"
            />
            <GradientScrollAnimation variant="dark">
              <p className={styles.subtitle}>{ourSolutionsContent.subtitle}</p>
            </GradientScrollAnimation>
          </div>

          <OurSolutionsShowcase
            steps={ourSolutionsSteps}
            total={total}
            pillCount={pillCount}
            activeStep={activeStep}
            active={active}
            indicatorStyle={indicatorStyle}
            goToSlide={goToSlide}
            learnMoreHref={ourSolutionsContent.learnMoreHref}
            learnMoreText={ourSolutionsContent.learnMoreText}
          />
        </Container>
      </div>
    </section>
  );
}

export default OurSolutions;
