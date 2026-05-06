import { useMemo } from "react";
import styles from "./our-solutions.module.css";
import Chip from "../../../ui/chip/Chip";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import GradientRevealAnimation from "../../../ui/gradient-reveal-animation/GradientRevealAnimation";
import { FileText, Cpu, Users, Monitor } from "lucide-react";
import useAutoplaySlider from "../../../../hooks/useAutoplaySlider";

const steps = [
  {
    id: "ehr",
    Icon: FileText,
    title: "Comprehensive EHR Management System",
    description:
      "Efficiently manage electronic health records across clinics and hospitals.",
    image: "/images/home/solution-card.svg",
  },
  {
    id: "operations",
    Icon: Cpu,
    title: "Operational Intelligence Layer",
    description:
      "Unify day-to-day healthcare operations with dashboards, automation, and real-time reporting for every team.",
    image: "/images/home/solution-card.svg",
  },
  {
    id: "patient",
    Icon: Users,
    title: "Patient Experience Optimization Suite",
    description:
      "Streamline onboarding, scheduling, and patient communications with systems designed for modern care journeys.",
    image: "/images/home/patient-experience.png",
  },
  {
    id: "compliance",
    Icon: Monitor,
    title: "Compliance And Risk Command Center",
    description:
      "Surface compliance blind spots early and give teams the visibility they need to act before issues escalate.",
    image: "/images/home/solution-card.svg",
  },
];

function OurSolutions() {
  const total = steps.length;
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
  const active = steps[activeStep];
  const MonitorIcon = steps[total - 1].Icon;
  const isMonitorActive = activeStep === total - 1;
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
            <Chip text="Our Services" className={styles.chip} />
            <SectionIntro
              variant="section"
              title="Our Healthcare Solutions"
              titleAs="h2"
              highlightWord={2}
              titleClassName={styles.title}
              color="#1f2940"
              highlightColor="#2FD1AB"
              animateTitle
              animateMode="scroll"
              animateInitialColor="#737e8a"
              animateAccentColor="#2FD1AB"
              animateFinalColor="#1f2940"
            />
            <GradientRevealAnimation
              triggerOnScroll
              colorInitial="#737e8a"
              colorAccent="#2FD1AB"
              colorFinal="#6a7484"
              charDuration={0.5}
              charStagger={0.035}
              finalDuration={0.3}
            >
              <p className={styles.subtitle}>
                Explore our key solutions designed to enhance patient care,
                streamline operations, and drive smarter healthcare decisions
                through technology.
              </p>
            </GradientRevealAnimation>
          </div>

          <div className={styles.content}>
            <div className={styles.leftColumn}>
              <div className={styles.railWrap}>
                <div className={styles.rail} role="tablist" aria-label="Solutions">
                  <span
                    className={styles.railIndicator}
                    style={indicatorStyle}
                    aria-hidden="true"
                  />
                  {steps.slice(0, pillCount).map((step, index) => {
                    const isActive = activeStep === index;
                    const IconComp = step.Icon;

                    return (
                      <button
                        key={step.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={step.title}
                        className={`${styles.railCell} ${isActive ? styles.railCellActive : ""}`.trim()}
                        onClick={() => goToSlide(index, { stop: true })}
                      >
                        <IconComp
                          className={styles.railIcon}
                          color={isActive ? "#49bea9" : "#ffffff"}
                        />
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  aria-label={steps[total - 1].title}
                  className={`${styles.monitorNode} ${isMonitorActive ? styles.monitorNodeActive : ""}`.trim()}
                  onClick={() => goToSlide(total - 1, { stop: true })}
                >
                  <MonitorIcon
                    className={styles.monitorIcon}
                    color={isMonitorActive ? "#49bea9" : "rgba(120, 132, 140, 0.75)"}
                  />
                </button>
              </div>

              <div className={styles.copyBlock}>
                <h3 className={styles.solutionTitle}>{active.title}</h3>
                <p className={styles.solutionDescription}>
                  {active.description}
                </p>
                <a href="/" className={styles.learnMore}>
                  Learn More
                  <span className={styles.learnArrow}>&rarr;</span>
                </a>
              </div>
            </div>

            <div className={styles.previewWrap}>
              <div className={styles.cardStack}>
                {steps.map((step, index) => {
                  const offset = activeStep - index;
                  let transform;
                  let opacity;
                  let zIndex;

                  if (offset === 0) {
                    transform = "translate3d(0, 0, 0) scale(1)";
                    opacity = 1;
                    zIndex = total + 1;
                  } else if (offset > 0) {
                    const clamped = Math.min(offset, 3);
                    transform = `translate3d(${clamped * 28}px, ${-clamped * 20}px, 0) scale(${1 - clamped * 0.035})`;
                    opacity = Math.max(0.55, 1 - clamped * 0.15);
                    zIndex = total - offset;
                  } else {
                    transform = "translate3d(0, 120px, 0) scale(0.94)";
                    opacity = 0;
                    zIndex = total + 2;
                  }

                  return (
                    <div
                      key={step.id}
                      className={styles.card}
                      style={{ transform, opacity, zIndex }}
                    >
                      <img
                        src={step.image}
                        alt={`${step.title} preview`}
                        className={styles.cardImage}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default OurSolutions;
