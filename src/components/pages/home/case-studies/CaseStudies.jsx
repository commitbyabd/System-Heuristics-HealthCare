import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./case-studies.module.css";
import BackgroundFilledButton from "../../../ui/buttons/background-filled/BackgroundFilledButton";
import SectionTitle from "../../../ui/section-title/SectionTitle";
import caseStudies from "../../../../data/case-study/CaseStudyData";

gsap.registerPlugin(ScrollTrigger);

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

function CaseStudies() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = caseStudies.length;

  useLayoutEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!pin || !track || !viewport) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px)", () => {
      const xPercent = -(100 / total) * (total - 1);

      const tween = gsap.to(track, {
        xPercent,
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          pin,
          start: "top top",
          end: () => `+=${viewport.clientWidth * (total - 1)}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              Math.floor(self.progress * total),
              total - 1,
            );
            setActiveIndex(idx);
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { xPercent: 0, x: 0, clearProps: "transform" });
      };
    });

    mm.add("(max-width: 900px)", () => {
      gsap.set(track, { xPercent: 0, x: 0, clearProps: "transform" });
      setActiveIndex(0);
    });

    return () => {
      mm.revert();
      ScrollTrigger.refresh();
    };
  }, [total]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={pinRef} className={styles.stickyFrame}>
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
            />
            <p className={styles.subtitle}>
              Explore how we help healthcare organizations solve operational,
              clinical, and patient-experience challenges through tailored
              digital solutions.
            </p>
            <div className={styles.portfolioBtn}>
              <BackgroundFilledButton
                text="Checkout our Portfolio"
                width="222px"
              />
            </div>
          </div>

          <div className={styles.stage}>
            <div
              ref={viewportRef}
              className={styles.viewport}
              style={{ "--total": total }}
            >
              <div ref={trackRef} className={styles.track}>
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
                          <BackgroundFilledButton
                            text="Live Demo"
                            width="132px"
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
