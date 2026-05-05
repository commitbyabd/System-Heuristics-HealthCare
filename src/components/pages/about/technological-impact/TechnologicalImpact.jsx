import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./technological-impact.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    id: "client-success",
    value: 96,
    suffix: "%",
    primary: "Client",
    secondary: "Success Rate",
    variant: "mint",
    pos: "pos0",
  },
  {
    id: "countries-served",
    value: 10,
    suffix: "+",
    primary: "Countries",
    secondary: "Served",
    variant: "cream",
    pos: "pos1",
  },
  {
    id: "repeating-clients",
    value: 80,
    suffix: "%",
    primary: "Repeating",
    secondary: "Clients",
    variant: "blue",
    pos: "pos2",
  },
  {
    id: "projects-delivered",
    value: 60,
    suffix: "+",
    primary: "Projects",
    secondary: "Delivered",
    variant: "cream",
    pos: "pos3",
  },
];

const VARIANT_CLASS = {
  mint: styles.cardMint,
  cream: styles.cardCream,
  blue: styles.cardBlue,
};

function TechnologicalImpact() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray("[data-impact-card]", section);
      if (!cards.length) return;

      const numbers = cards.map((c) => c.querySelector("[data-impact-number]"));
      const labels = cards.map((c) => c.querySelector("[data-impact-label]"));
      const shines = cards.map((c) => c.querySelector("[data-impact-shine]"));

      numbers.forEach((num) => {
        if (!num) return;
        const suffix = num.dataset.suffix ?? "";
        num.textContent = `0${suffix}`;
      });

      gsap.set(cards, {
        opacity: 0,
        rotateY: -110,
        transformPerspective: 1000,
        transformOrigin: "50% 50%",
        backfaceVisibility: "hidden",
      });
      gsap.set(labels, { opacity: 0, y: 14 });
      gsap.set(shines, { xPercent: -130 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      tl.to(
        cards,
        {
          opacity: 1,
          rotateY: 0,
          duration: 1.05,
          ease: "back.out(1.3)",
          stagger: 0.14,
        },
        0,
      );

      tl.to(
        shines,
        {
          xPercent: 130,
          duration: 0.85,
          ease: "power2.out",
          stagger: 0.14,
        },
        0.55,
      );

      cards.forEach((card, i) => {
        const num = numbers[i];
        if (!num) return;
        const target = parseFloat(num.dataset.target ?? "0") || 0;
        const suffix = num.dataset.suffix ?? "";
        const counter = { v: 0 };

        tl.to(
          counter,
          {
            v: target,
            duration: 1.1,
            ease: "power2.out",
            onUpdate: () => {
              num.textContent = `${Math.round(counter.v)}${suffix}`;
            },
          },
          0.6 + i * 0.14,
        );

        tl.to(
          labels[i],
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          0.75 + i * 0.14,
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <SectionIntro
              variant="section"
              title="Our Impact in Healthcare Technology"
              description="We measure our success by the impact we create—delivering reliable systems, intelligent solutions, and measurable results across healthcare organizations."
              titleAs="h2"
              highlightWord={4}
              className={styles.intro}
              color="#18233b"
              highlightColor="#2FD1AB"
              animateTitle
              animateMode="scroll"
              animateInitialColor="#7f8d9f"
              animateAccentColor="#2FD1AB"
              animateFinalColor="#18233b"
            />
          </div>

          {STATS.map((stat) => (
            <article
              key={stat.id}
              data-impact-card
              className={`${styles.card} ${VARIANT_CLASS[stat.variant]} ${styles[stat.pos]}`.trim()}
            >
              <span
                className={styles.shine}
                data-impact-shine
                aria-hidden="true"
              />
              <div
                className={styles.number}
                data-impact-number
                data-target={stat.value}
                data-suffix={stat.suffix}
              >
                {stat.value}
                {stat.suffix}
              </div>
              <div className={styles.label} data-impact-label>
                <span className={styles.labelPrimary}>{stat.primary}</span>
                <span className={styles.labelSecondary}>{stat.secondary}</span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TechnologicalImpact;
