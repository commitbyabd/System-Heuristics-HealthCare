import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./choose-us.module.css";
import Container from "../../../ui/container/Container";
import GradientScrollAnimation from "../../../ui/gradient-scroll-animation/GradientScrollAnimation";
import ChooseCard from "./_components/ChooseCard";
import { chooseUsData } from "../../../../data/pages/about/choose-us-data/choose-us-data";

gsap.registerPlugin(ScrollTrigger);

function ChooseUs() {
  const sectionRef = useRef(null);
  const linePathRef = useRef(null);
  const orbGlowRef = useRef(null);
  const orbCoreRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const linePath = linePathRef.current;
    const orbGlow = orbGlowRef.current;
    const orbCore = orbCoreRef.current;

    if (!section || !linePath || !orbGlow || !orbCore) return undefined;

    const updateOrbPosition = (distance) => {
      const point = linePath.getPointAtLength(distance);

      orbGlow.setAttribute("cx", `${point.x}`);
      orbGlow.setAttribute("cy", `${point.y}`);
      orbCore.setAttribute("cx", `${point.x}`);
      orbCore.setAttribute("cy", `${point.y}`);
    };

    const ctx = gsap.context(() => {
      const board = section.querySelector("[data-choose-board]");
      const cards = gsap.utils.toArray("[data-choose-card]", section);
      const lineLength = linePath.getTotalLength();
      const lineAnimation = gsap.timeline({ paused: true });
      const orbState = { distance: 0 };
      let travelAnimation;

      const setCardsToStack = () => {
        if (!board || !cards.length) return;

        const boardRect = board.getBoundingClientRect();
        const centerX = boardRect.left + boardRect.width / 2;
        const centerY = boardRect.top + boardRect.height / 2;

        cards.forEach((card, index) => {
          const rect = card.getBoundingClientRect();
          const cardCenterX = rect.left + rect.width / 2;
          const cardCenterY = rect.top + rect.height / 2;
          const rotation = index % 2 === 0 ? -7 : 7;

          gsap.set(card, {
            x: centerX - cardCenterX,
            y: centerY - cardCenterY,
            scale: 0.76,
            rotate: rotation,
            opacity: 0,
            transformOrigin: "center center",
          });
        });
      };

      gsap.set(linePath, {
        strokeDasharray: lineLength,
        strokeDashoffset: lineLength,
      });
      gsap.set([orbGlow, orbCore], { autoAlpha: 0 });
      updateOrbPosition(0);
      setCardsToStack();

      lineAnimation.to(linePath, {
        strokeDashoffset: 0,
        duration: 1.55,
        ease: "power2.out",
      });

      lineAnimation.to(
        [orbGlow, orbCore],
        {
          autoAlpha: 1,
          duration: 0.18,
          ease: "power1.out",
        },
        0.22,
      );

      if (cards.length) {
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 74%",
            once: true,
            invalidateOnRefresh: true,
            onRefreshInit: setCardsToStack,
          },
        }).to(cards, {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 1.05,
          ease: "power3.out",
          stagger: {
            each: 0.08,
            from: "center",
          },
        });
      }

      travelAnimation = gsap.to(orbState, {
        distance: lineLength,
        duration: 5.4,
        ease: "none",
        repeat: -1,
        paused: true,
        onUpdate: () => updateOrbPosition(orbState.distance),
        onRepeat: () => {
          orbState.distance = 0;
          updateOrbPosition(0);
        },
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          if (lineAnimation.progress() < 1) {
            lineAnimation.play();
          }

          gsap.set([orbGlow, orbCore], { autoAlpha: 1 });
          travelAnimation.play();
        },
        onEnterBack: () => {
          if (lineAnimation.progress() < 1) {
            lineAnimation.play();
          }

          gsap.set([orbGlow, orbCore], { autoAlpha: 1 });
          travelAnimation.play();
        },
        onLeave: () => {
          if (lineAnimation.progress() < 1) {
            lineAnimation.pause();
          }

          travelAnimation.pause();
          gsap.set([orbGlow, orbCore], { autoAlpha: 0 });
        },
        onLeaveBack: () => {
          if (lineAnimation.progress() < 1) {
            lineAnimation.pause();
          }

          travelAnimation.pause();
          gsap.set([orbGlow, orbCore], { autoAlpha: 0 });
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`bgGrid ${styles.section}`.trim()}>
      <Container className={styles.container}>
        <div className={styles.surface} data-choose-board>
          <GradientScrollAnimation
            className={styles.intro}
            colorInitial="#7f8d9f"
            colorAccent="#2FD1AB"
            colorFinal="#FFFFFF"
            highlightFinalColor="#2FD1AB"
            highlightWords={[{ elementIndex: 0, wordIndex: 2 }]}
          >
            <h2 className={styles.title}>Why Choose Us</h2>
            <p className={styles.description}>
              Explore our key solutions designed to enhance patient care,
              streamline operations, and drive smarter healthcare decisions
              through technology.
            </p>
          </GradientScrollAnimation>

          <div className={styles.lineWrap} aria-hidden="true">
            <svg
              className={styles.lineSvg}
              viewBox="0 0 1000 120"
              preserveAspectRatio="none"
            >
              <path
                ref={linePathRef}
                className={styles.linePath}
                d="M12 84 C 230 36, 770 36, 988 84"
              />
              <circle ref={orbGlowRef} className={styles.orbGlow} r="12" />
              <circle ref={orbCoreRef} className={styles.orbCore} r="4" />
            </svg>
          </div>

          <div className={styles.cardsGrid}>
            {chooseUsData.map((item, index) => (
              <ChooseCard
                key={item.id}
                title={item.title}
                description={item.description}
                Icon={item.Icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ChooseUs;
