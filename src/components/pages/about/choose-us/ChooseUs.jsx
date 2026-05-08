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
  const lineWrapRef = useRef(null);
  const pulseTrackRef = useRef(null);
  const pulseGlowRef = useRef(null);
  const pulseCoreRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const lineWrap = lineWrapRef.current;
    const pulseTrack = pulseTrackRef.current;
    const pulseGlow = pulseGlowRef.current;
    const pulseCore = pulseCoreRef.current;

    if (!section || !lineWrap || !pulseTrack || !pulseGlow || !pulseCore) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const board = section.querySelector("[data-choose-board]");
      const cards = gsap.utils.toArray("[data-choose-card]", section);
      const trackLength = pulseTrack.getTotalLength();

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

      const movePulseTo = (distance) => {
        const point = pulseTrack.getPointAtLength(distance);
        pulseGlow.setAttribute("cx", `${point.x}`);
        pulseGlow.setAttribute("cy", `${point.y}`);
        pulseCore.setAttribute("cx", `${point.x}`);
        pulseCore.setAttribute("cy", `${point.y}`);
      };

      gsap.set(lineWrap, {
        clipPath: "inset(0 100% 0 0)",
        webkitClipPath: "inset(0 100% 0 0)",
      });
      gsap.set([pulseGlow, pulseCore], { autoAlpha: 0 });
      movePulseTo(0);
      setCardsToStack();

      const lineAnimation = gsap.timeline({ paused: true });
      lineAnimation
        .to(lineWrap, {
          clipPath: "inset(0 0% 0 0)",
          webkitClipPath: "inset(0 0% 0 0)",
          duration: 3,
          ease: "power2.out",
        })
        .to(
          [pulseGlow, pulseCore],
          { autoAlpha: 1, duration: 0.25, ease: "power1.out" },
          ">-0.1",
        );

      const travelStart = trackLength * 0.03;
      const travelEnd = trackLength * 0.97;
      const pulseTravel = { distance: travelStart };
      movePulseTo(travelStart);
      gsap.to(pulseTravel, {
        distance: travelEnd,
        duration: 4.8,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          pulseTravel.distance = travelStart;
        },
        onUpdate: () => movePulseTo(pulseTravel.distance),
      });

      gsap.to(pulseCore, {
        attr: { r: 7 },
        duration: 0.9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(pulseGlow, {
        attr: { r: 22 },
        opacity: 0.55,
        duration: 0.9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      if (cards.length) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 74%",
              once: true,
              invalidateOnRefresh: true,
              onRefreshInit: setCardsToStack,
            },
          })
          .to(cards, {
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            opacity: 1,
            duration: 1.05,
            ease: "power3.out",
            stagger: { each: 0.08, from: "center" },
          });
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        once: true,
        onEnter: () => lineAnimation.play(),
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
            variant="light"
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
            <div ref={lineWrapRef} className={styles.lineClip}>
              <svg
                className={styles.lineSvg}
                viewBox="0 0 1400 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M 0,120 C 400,18 1000,18 1400,120 C 1000,21 400,21 0,120 Z"
                  fill="rgba(255,255,255,0.92)"
                />
              </svg>
            </div>
            <svg
              className={styles.pulseSvg}
              viewBox="0 0 1400 120"
              preserveAspectRatio="none"
            >
              <path
                ref={pulseTrackRef}
                d="M 0,120 C 400,18 1000,18 1400,120"
                fill="none"
                stroke="none"
              />
              <circle ref={pulseGlowRef} className={styles.pulseGlow} r="14" />
              <circle ref={pulseCoreRef} className={styles.pulseCore} r="4" />
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
