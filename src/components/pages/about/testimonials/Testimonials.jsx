import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./testimonials.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import TestimonialCard from "./_components/TestimonialCard";
import { testimonialsData } from "../../../../data/pages/about/testimonials-data/testimonials-data";

gsap.registerPlugin(ScrollTrigger);

function mod(index, length) {
  return ((index % length) + length) % length;
}

function Testimonials() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isAutoRotationStopped, setIsAutoRotationStopped] = useState(false);
  const total = testimonialsData.length;
  const activeItem = testimonialsData[activeIndex];

  const visibleItems = useMemo(() => {
    const previous = testimonialsData[mod(activeIndex - 1, total)];
    const current = testimonialsData[activeIndex];
    const next = testimonialsData[mod(activeIndex + 1, total)];

    return [previous, current, next];
  }, [activeIndex, total]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => setIsInView(true),
      onEnterBack: () => setIsInView(true),
      onLeave: () => setIsInView(false),
      onLeaveBack: () => setIsInView(false),
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (!isInView || isAutoRotationStopped) return undefined;

    let rotationInterval = 0;

    const initialDelay = window.setTimeout(() => {
      setActiveIndex((current) => mod(current + 1, total));

      rotationInterval = window.setInterval(() => {
        setActiveIndex((current) => mod(current + 1, total));
      }, 3200);
    }, 1800);

    return () => {
      window.clearTimeout(initialDelay);
      window.clearInterval(rotationInterval);
    };
  }, [isInView, isAutoRotationStopped, total]);

  const handleManualNavigation = (direction) => {
    setIsAutoRotationStopped(true);
    setActiveIndex((current) => mod(current + direction, total));
  };

  return (
    <section
      ref={sectionRef}
      className={`bgGrid ${styles.section}`.trim()}
      data-testimonials-section
    >
      <Container className={styles.container}>
        <div className={styles.introWrap}>
          <SectionIntro
            variant="section"
            title="Testimonials"
            description="Real leaders share how they crushed dead-end leads and boosted sales with our game-changing AI solutions."
            titleAs="h2"
            highlightWord={1}
            className={styles.intro}
            animateTitle
            animateMode="scroll"
            animateInitialColor="#7f8d9f"
            animateAccentColor="#2FD1AB"
            animateFinalColor="#FFFFFF"
            highlightColor="#FFFFFF"
          />
        </div>

        <div className={styles.avatarStrip} aria-label="Testimonial people">
          {testimonialsData.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.avatarButton} ${
                index === activeIndex ? styles.avatarButtonActive : ""
              }`.trim()}
              aria-label={`Show testimonial from ${item.name}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              <img
                className={styles.avatarImage}
                src={item.avatar}
                alt={item.name}
              />
            </button>
          ))}
        </div>

        <div className={styles.cardsWrap}>
          <div className={styles.cardsGrid}>
            {visibleItems.map((item, index) => (
              <TestimonialCard
                key={item.id}
                id={item.id}
                name={item.name}
                role={item.role}
                rating={item.rating}
                quote={item.quote}
                avatar={item.avatar}
                slot={index}
                active={item.id === activeItem.id}
              />
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.controlButton}
            aria-label="Previous testimonial"
            onClick={() => handleManualNavigation(-1)}
          >
            &#8592;
          </button>

          <button
            type="button"
            className={styles.controlButton}
            aria-label="Next testimonial"
            onClick={() => handleManualNavigation(1)}
          >
            &#8594;
          </button>
        </div>
      </Container>
    </section>
  );
}

export default Testimonials;
