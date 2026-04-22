import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./our-solutions.module.css";
import Chip from "../../../ui/chip/Chip";
import SectionTitle from "../../../ui/section-title/SectionTitle";
import Container from "../../../ui/container/Container";
import FileText from "../../../ui/icons/FileText";
import Cpu from "../../../ui/icons/Cpu";
import Users from "../../../ui/icons/Users";
import Monitor from "../../../ui/icons/Monitor";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const indicatorRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const total = steps.length;
  const pillCount = total - 1;
  const RAIL_CELL = 56;
  const MonitorIcon = steps[total - 1].Icon;
  const isMonitorActive = activeStep === total - 1;

  useLayoutEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: pin,
        pin,
        start: "top top",
        end: () => `+=${window.innerHeight * (total - 1)}`,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;

          if (indicatorRef.current) {
            const continuous = p * (total - 1);
            const pillP = Math.min(continuous, pillCount - 1);
            const fadeStart = pillCount - 0.5;
            const opacity =
              continuous <= fadeStart
                ? 1
                : Math.max(0, 1 - (continuous - fadeStart) * 2);
            gsap.set(indicatorRef.current, {
              y: pillP * RAIL_CELL,
              opacity,
            });
          }

          const idx = Math.min(Math.round(p * (total - 1)), total - 1);
          setActiveStep(idx);
        },
      });

      return () => {
        trigger.kill();
        if (indicatorRef.current) gsap.set(indicatorRef.current, { y: 0 });
      };
    });

    mm.add("(max-width: 768px)", () => {
      setActiveStep(0);
      if (indicatorRef.current) gsap.set(indicatorRef.current, { y: 0 });
    });

    return () => {
      mm.revert();
      ScrollTrigger.refresh();
    };
  }, [total]);

  const active = steps[activeStep];

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
                  <span
                    ref={indicatorRef}
                    className={styles.railIndicator}
                    aria-hidden="true"
                  />
                  {steps.slice(0, pillCount).map((step, index) => {
                    const isActive = activeStep === index;
                    const IconComp = step.Icon;
                    return (
                      <div
                        key={step.id}
                        className={`${styles.railCell} ${isActive ? styles.railCellActive : ""}`.trim()}
                        aria-label={step.title}
                      >
                        <IconComp
                          className={styles.railIcon}
                          color={isActive ? "#49bea9" : "#ffffff"}
                        />
                      </div>
                    );
                  })}
                </div>

                <div
                  className={`${styles.monitorNode} ${isMonitorActive ? styles.monitorNodeActive : ""}`.trim()}
                  aria-hidden="true"
                >
                  <MonitorIcon
                    className={styles.monitorIcon}
                    color={isMonitorActive ? "#49bea9" : "rgba(120, 132, 140, 0.75)"}
                  />
                </div>
              </div>

              <div className={styles.copyBlock}>
                <h3 className={styles.solutionTitle}>{active.title}</h3>
                <p className={styles.solutionDescription}>
                  {active.description}
                </p>
                <a href="/" className={styles.learnMore}>
                  Learn More
                  <span className={styles.learnArrow}>→</span>
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
