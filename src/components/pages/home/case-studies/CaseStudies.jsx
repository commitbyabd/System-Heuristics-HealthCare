import { useState } from "react";
import styles from "./case-studies.module.css";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import GradientScrollAnimation from "../../../ui/gradient-scroll-animation/GradientScrollAnimation";
import Button from "../../../ui/button/Button";
import CaseStudySlide from "./_components/CaseStudySlide";
import { caseStudies } from "../../../../data/pages/home/case-study/CaseStudyData";
import useAutoplaySlider from "../../../../hooks/useAutoplaySlider";
import Chip from "../../../ui/chip/Chip";
import { ShieldCheck } from "lucide-react";
function ArrowIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function CaseStudies() {
  const total = caseStudies.length;
  const [hoverSide, setHoverSide] = useState(null);
  const { sectionRef, activeIndex, goToNext, goToPrevious } = useAutoplaySlider(
    {
      totalSlides: total,
      delay: 2600,
      threshold: 0.35,
    },
  );

  const handleStagePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = event.clientX - bounds.left;
    const centerX = bounds.width / 2;

    setHoverSide(pointerX > centerX ? "right" : "left");
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.stickyFrame}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Chip
              text="Proven Healthcare Outcomes"
              className={styles.chip}
              Icon={ShieldCheck}
            />
            <SectionIntro
              variant="section"
              title="Case Studies"
              titleAs="h2"
              highlightWord={2}
              titleClassName={styles.title}
              animationVariant="dark"
              animateTitle
              animateMode="scroll"
            />
            <GradientScrollAnimation variant="dark">
              <p className={styles.subtitle}>
                Explore how we help healthcare organizations solve operational,
                clinical, and patient-experience challenges through tailored
                digital solutions.
              </p>
            </GradientScrollAnimation>
            <div className={styles.portfolioBtn}>
              <Button
                text="Checkout Our Portfolio"
                variant="filled"
                width="222px"
                href="/case-study"
              />
            </div>
          </div>

          <div
            className={styles.stage}
            onPointerMove={handleStagePointerMove}
            onPointerLeave={() => setHoverSide(null)}
          >
            <button
              type="button"
              aria-label="Previous case study"
              className={`${styles.navButton} ${styles.navButtonLeft} ${hoverSide === "left" ? styles.navButtonVisible : ""}`.trim()}
              onClick={() => goToPrevious({ stop: true })}
            >
              <ArrowIcon className={styles.navIcon} />
            </button>
            <button
              type="button"
              aria-label="Next case study"
              className={`${styles.navButton} ${styles.navButtonRight} ${hoverSide === "right" ? styles.navButtonVisible : ""}`.trim()}
              onClick={() => goToNext({ stop: true })}
            >
              <ArrowIcon className={styles.navIcon} />
            </button>

            <div
              className={styles.viewport}
              style={{
                "--total": total,
                "--active-index": activeIndex,
              }}
            >
              <div className={styles.track}>
                {caseStudies.map((study, index) => (
                  <CaseStudySlide
                    key={study.id}
                    title={study.title}
                    problem={study.problem}
                    solution={study.solution}
                    image={study.image}
                    imageAlt={study.imageAlt}
                    liveDemo={study.liveDemo}
                    videoDemo={study.videoDemo}
                    isActive={index === activeIndex}
                  />
                ))}
              </div>
            </div>

            <div
              className={styles.dots}
              role="tablist"
              aria-label="Case study pagination"
            >
              {caseStudies.map((study, index) => (
                <span
                  key={study.id}
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Go to ${study.title}`}
                  className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`.trim()}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CaseStudies;
