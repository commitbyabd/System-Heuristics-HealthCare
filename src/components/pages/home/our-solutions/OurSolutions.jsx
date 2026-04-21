import { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./our-solutions.module.css";
import Chip from "../../../ui/chip/Chip";
import SectionTitle from "../../../ui/section-title/SectionTitle";
import Container from "../../../ui/container/Container";
import FileText from "../../../ui/icons/FileText";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "ehr",
    iconLabel: "EHR",
    title: "Comprehensive EHR Management System",
    description:
      "Efficiently manage electronic health records across clinics and hospitals with secure, connected workflows.",
  },
  {
    id: "operations",
    iconLabel: "OPS",
    title: "Operational Intelligence Layer",
    description:
      "Unify day-to-day healthcare operations with dashboards, automation, and real-time reporting for every team.",
  },
  {
    id: "patient",
    iconLabel: "PAT",
    title: "Patient Experience Optimization Suite",
    description:
      "Streamline onboarding, scheduling, and patient communications with systems designed for modern care journeys.",
  },
  {
    id: "compliance",
    iconLabel: "CMP",
    title: "Compliance And Risk Command Center",
    description:
      "Surface compliance blind spots early and give teams the visibility they need to act before issues escalate.",
  },
];

function OurSolutions() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const previewRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = steps.length + 1;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const preview = previewRef.current;

    if (!section || !pin || !preview) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: preview,
        start: "bottom 70%",
        end: `+=${window.innerHeight * (totalSteps - 1)}`,
        pin,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const stepIndex = Math.min(
            Math.floor(self.progress * totalSteps),
            totalSteps - 1,
          );

          setActiveStep(stepIndex);
        },
      });

      return () => trigger.kill();
    });

    mm.add("(max-width: 768px)", () => {
      setActiveStep(0);
    });

    return () => {
      mm.revert();
      ScrollTrigger.refresh();
    };
  }, [totalSteps]);

  const activeContent = useMemo(() => {
    const safeIndex = Math.min(activeStep, steps.length - 1);
    return steps[safeIndex];
  }, [activeStep]);

  const isMonitorActive = activeStep === totalSteps - 1;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={pinRef} className={styles.stickyFrame}>
        <Container className={styles.container}>
          <div className={styles.header}>
            <Chip text="Our Services" className={styles.chip} />
            <SectionTitle
              title="Our Healthcare Solutions"
              highlightWord={2}
              className={styles.title}
              color="#1f2940"
              highlightColor="#2FD1AB"
            />
            <p className={styles.subtitle}>
              Explore our key solutions designed to enhance patient care,
              streamline operations, and drive smarter healthcare decisions
              through technology.
            </p>
          </div>

          <div className={styles.content}>
            <div className={styles.leftColumn}>
              <div className={styles.railWrap}>
                <div className={styles.rail}>
                  {steps.map((step, index) => {
                    const isActive = activeStep === index;

                    return (
                      <button
                        key={step.id}
                        type="button"
                        className={`${styles.railButton} ${isActive ? styles.railButtonActive : ""}`.trim()}
                        aria-label={step.title}
                      >
                        <FileText
                          className={styles.railIcon}
                          color={isActive ? "#49bea9" : "#ffffff"}
                        />
                      </button>
                    );
                  })}
                </div>

                <div
                  className={`${styles.monitorNode} ${isMonitorActive ? styles.monitorNodeActive : ""}`.trim()}
                  aria-hidden="true"
                >
                  <span className={styles.monitorStand} />
                </div>
              </div>

              <div className={styles.copyBlock}>
                <h3 className={styles.solutionTitle}>{activeContent.title}</h3>
                <p className={styles.solutionDescription}>
                  {activeContent.description}
                </p>
                <a href="/" className={styles.learnMore}>
                  Learn More
                  <span className={styles.learnArrow}>-</span>
                </a>
              </div>
            </div>

            <div ref={previewRef} className={styles.previewWrap}>
              <div
                className={`${styles.monitorGlow} ${isMonitorActive ? styles.monitorGlowActive : ""}`.trim()}
              />

              <div className={styles.cardStack}>
                {steps.map((step, index) => {
                  const isVisible = index <= activeStep;

                  return (
                    <div
                      key={step.id}
                      className={`${styles.card} ${isVisible ? styles.cardVisible : ""}`.trim()}
                      style={{
                        zIndex: index + 1,
                        transform: `translate(${index * 18}px, ${index * 12}px) scale(${1 - index * 0.03})`,
                      }}
                    >
                      <img
                        src="/images/home/solution-card.svg"
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
