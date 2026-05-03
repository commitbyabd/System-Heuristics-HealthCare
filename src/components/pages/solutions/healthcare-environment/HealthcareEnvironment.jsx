import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./healthcare-environment.module.css";
import Container from "../../../ui/container/Container";
import Chip from "../../../ui/chip/Chip";
import SectionTitle from "../../../ui/section-title/SectionTitle";
import GradientRevealAnimation from "../../../ui/gradient-reveal-animation/GradientRevealAnimation";
import Button from "../../../ui/button/Button";
import { HealthcareEnvironmentData } from "../../../../data/pages/solutions/environment/HealthcareEnvironment";

gsap.registerPlugin(ScrollTrigger);

function HealthcareEnvironment() {
  const { section, steps } = HealthcareEnvironmentData;
  const total = steps.length;
  const initialIndex = Math.floor(total / 2);

  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const triggerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!pin || !track || !viewport) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const slideStep = 100 / total;
      const endXPercent = -slideStep * (total - 1);
      const totalSteps = total - 1;

      gsap.set(track, { xPercent: 0 });

      const tween = gsap.to(track, {
        xPercent: endXPercent,
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          pin,
          start: "center center",
          end: () => `+=${window.innerHeight * totalSteps}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              Math.round(self.progress * totalSteps),
              total - 1,
            );
            setActiveIndex(idx);
          },
        },
      });

      triggerRef.current = tween.scrollTrigger;

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        triggerRef.current = null;
        gsap.set(track, { xPercent: 0, x: 0, clearProps: "transform" });
      };
    });

    mm.add("(max-width: 768px)", () => {
      gsap.set(track, { xPercent: 0, x: 0, clearProps: "transform" });
      setActiveIndex(initialIndex);
    });

    return () => {
      mm.revert();
      ScrollTrigger.refresh();
    };
  }, [total, initialIndex]);

  const handleTabClick = (index) => {
    const trigger = triggerRef.current;
    if (!trigger) {
      setActiveIndex(index);
      return;
    }
    const totalSteps = total - 1;
    const targetProgress = totalSteps === 0 ? 0 : index / totalSteps;
    const target =
      trigger.start + targetProgress * (trigger.end - trigger.start);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className={`${styles.section} bgGrid`}>
      <div ref={pinRef} className={styles.stickyFrame}>
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
            <GradientRevealAnimation
              triggerOnScroll
              colorInitial="#5b6b78"
              colorAccent="#2FD1AB"
              colorFinal="#c5cdd4"
              charDuration={0.5}
              charStagger={0.035}
              finalDuration={0.3}
            >
              <p className={styles.subtitle}>{section.subtitle}</p>
            </GradientRevealAnimation>
          </div>

          <div className={styles.tabs} role="tablist">
            {steps.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={styles.tabBtn}
                  onClick={() => handleTabClick(index)}
                >
                  {isActive ? (
                    <Button text={step.label} variant="filled" width="auto" />
                  ) : (
                    <Button
                      text={step.label}
                      variant="transparent"
                      width="auto"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className={styles.stage}>
            <div
              ref={viewportRef}
              className={styles.viewport}
              style={{ "--total": total }}
            >
              <div ref={trackRef} className={styles.track}>
                {steps.map((step, index) => (
                  <article
                    key={step.id}
                    className={`${styles.slide} ${index === activeIndex ? styles.slideActive : ""}`.trim()}
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
                        <GradientRevealAnimation
                          key={`${step.id}-pain-${index === activeIndex ? "active" : "idle"}`}
                          colorInitial="#5b6b78"
                          colorAccent="#2FD1AB"
                          colorFinal="#c5cdd4"
                          charDuration={0.4}
                          charStagger={0.02}
                          finalDuration={0.2}
                        >
                          <p className={styles.copyText}>{step.painPoint}</p>
                        </GradientRevealAnimation>
                      </div>
                      <div className={styles.copyRow}>
                        <h3 className={styles.copyHeading}>Solution:</h3>
                        <GradientRevealAnimation
                          key={`${step.id}-solution-${index === activeIndex ? "active" : "idle"}`}
                          colorInitial="#5b6b78"
                          colorAccent="#2FD1AB"
                          colorFinal="#c5cdd4"
                          charDuration={0.4}
                          charStagger={0.02}
                          finalDuration={0.2}
                        >
                          <p className={styles.copyText}>{step.solution}</p>
                        </GradientRevealAnimation>
                      </div>
                      <div className={styles.copyRow}>
                        <h3 className={styles.copyHeading}>Result:</h3>
                        <GradientRevealAnimation
                          key={`${step.id}-result-${index === activeIndex ? "active" : "idle"}`}
                          colorInitial="#5b6b78"
                          colorAccent="#2FD1AB"
                          colorFinal="#c5cdd4"
                          charDuration={0.4}
                          charStagger={0.02}
                          finalDuration={0.2}
                        >
                          <p className={styles.copyText}>{step.result}</p>
                        </GradientRevealAnimation>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default HealthcareEnvironment;
