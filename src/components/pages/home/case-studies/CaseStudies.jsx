import { useState } from "react";
import styles from "./case-studies.module.css";
import SectionTitle from "../../../ui/section-title/SectionTitle";
import GradientScrollAnimation from "../../../ui/gradient-scroll-animation/GradientScrollAnimation";
import caseStudies from "../../../../data/pages/home/case-study/CaseStudyData";
import Button from "../../../ui/button/Button";
import useAutoplaySlider from "../../../../hooks/useAutoplaySlider";

function PlayIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

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
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              Proven healthcare outcomes
            </span>
            <SectionTitle
              title="Case Studies"
              highlightWord={2}
              className={styles.title}
              color="#1f2940"
              highlightColor="#2FD1AB"
              animateTitle
              animateInitialColor="#737e8a"
              animateAccentColor="#2FD1AB"
              animateFinalColor="#1f2940"
            />
            <GradientScrollAnimation
              colorInitial="#737e8a"
              colorAccent="#2FD1AB"
              colorFinal="#6a7484"
            >
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
                {caseStudies.map((study) => (
                  <article key={study.id} className={styles.slide}>
                    <div className={styles.slideMediaWrap}>
                      <img
                        src={study.image}
                        alt={study.imageAlt}
                        className={styles.slideImage}
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.slideBody}>
                      <h3 className={styles.slideTitle}>{study.title}</h3>
                      <p className={styles.slideBlock}>
                        <span className={styles.slideBlockHeading}>
                          Problem :
                        </span>
                        {study.problem}
                      </p>
                      <p className={styles.slideBlock}>
                        <span className={styles.slideBlockHeading}>
                          Solution:
                        </span>
                        {study.solution}
                      </p>
                      <div className={styles.slideActions}>
                        <a href={study.liveDemo}>
                          <Button
                            text="Live Demo"
                            variant="filled"
                            width="152px"
                          />
                        </a>
                        <a
                          href={study.videoDemo}
                          className={styles.videoDemoBtn}
                        >
                          Video Demo
                          <PlayIcon className={styles.videoDemoIcon} />
                        </a>
                      </div>
                    </div>
                  </article>
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
