import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./expertise-showcase.module.css";
import Container from "../../../ui/container/Container";
import GradientScrollAnimation from "../../../ui/gradient-scroll-animation/GradientScrollAnimation";
import ExpertiseShowcaseData from "../../../../data/pages/about/expertise-showcase-data/ExpertiseShowcaseData";

gsap.registerPlugin(ScrollTrigger);

function ExpertiseShowcase() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      const setSectionAnimationState = (isActive) => {
        section.setAttribute(
          "data-animations-active",
          isActive ? "true" : "false",
        );
      };

      const cards = gsap.utils.toArray("[data-expertise-card]", section);
      const lineFill = section.querySelector("[data-timeline-fill]");
      const markers = gsap.utils.toArray("[data-timeline-marker]", section);

      setSectionAnimationState(false);

      if (cards.length) {
        gsap.set(cards, {
          x: 140,
          opacity: 0,
        });

        gsap.to(cards, {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.16,
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        });
      }

      if (lineFill) {
        gsap.set(lineFill, {
          scaleY: 0,
          transformOrigin: "top center",
        });

        gsap.to(lineFill, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 72%",
            scrub: 0.7,
          },
        });
      }

      markers.forEach((marker) => {
        const pulse = marker.querySelector("[data-marker-pulse]");

        if (!pulse) return;

        gsap.set(pulse, {
          opacity: 0.2,
          scale: 0.85,
        });

        gsap.to(pulse, {
          opacity: 1,
          scale: 1.5,
          duration: 0.45,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          scrollTrigger: {
            trigger: marker,
            start: "top center+=40",
            once: true,
          },
        });
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => setSectionAnimationState(true),
        onEnterBack: () => setSectionAnimationState(true),
        onLeave: () => setSectionAnimationState(false),
        onLeaveBack: () => setSectionAnimationState(false),
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`bgGrid ${styles.section}`}>
      <Container className={styles.container}>
        <div className={styles.introWrap}>
          <GradientScrollAnimation
            className={styles.intro}
            colorInitial="#7f8d9f"
            colorAccent="#2FD1AB"
            colorFinal="#FFFFFF"
            highlightFinalColor="#2FD1AB"
            highlightWords={[{ elementIndex: 0, wordIndex: 2 }]}
          >
            <h2 className={styles.title}>Who We Are</h2>
            <p className={styles.description}>
              Meet our team of experts dedicated to transforming healthcare
              with technology that's secure, user-friendly, and driven by
              realworld insights.
            </p>
          </GradientScrollAnimation>
        </div>

        <ExpertiseShowcaseData />
      </Container>
    </section>
  );
}

export default ExpertiseShowcase;
