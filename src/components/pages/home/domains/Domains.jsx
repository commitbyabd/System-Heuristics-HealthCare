import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./domains.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import {
  Brain,
  FileText,
  Lock,
  Building2,
  Globe,
  BarChart3,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const domainCards = [
  {
    id: "clinical",
    title: "Clinical Intelligence Systems",
    description: "AI-driven diagnostics, report analysis, and decision support",
    Icon: Brain,
    posClass: "cardTopLeft",
    anchor: "topLeft",
    entryRotate: -7,
  },
  {
    id: "documentation",
    title: "Medical Documentation",
    description: "AI scribes, structured notes, and record systems",
    Icon: FileText,
    posClass: "cardTopCenter",
    anchor: "topCenter",
    entryRotate: -2,
  },
  {
    id: "security",
    title: "Compliance & Data Security",
    description: "HIPAA-ready systems and audit-ready infrastructure",
    Icon: Lock,
    posClass: "cardTopRight",
    anchor: "topRight",
    entryRotate: 7,
  },
  {
    id: "operations",
    title: "Hospital & Clinic Operations",
    description: "Workflow automation, scheduling, and patient management",
    Icon: Building2,
    posClass: "cardBottomLeft",
    anchor: "bottomLeft",
    entryRotate: 7,
  },
  {
    id: "remote-care",
    title: "Telemedicine & Remote Care",
    description: "Digital consultation platforms and monitoring systems",
    Icon: Globe,
    posClass: "cardBottomCenter",
    anchor: "bottomCenter",
    entryRotate: 2,
  },
  {
    id: "analytics",
    title: "Healthcare Analytics",
    description:
      "Data-driven insights for better clinical and operational decisions",
    Icon: BarChart3,
    posClass: "cardBottomRight",
    anchor: "bottomRight",
    entryRotate: -7,
  },
];

function Domains() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const centerCardRef = useRef(null);
  const hubAuraRef = useRef(null);
  const cardRefs = useRef([]);
  const lineRefs = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const center = centerCardRef.current;
    const hubAura = hubAuraRef.current;
    if (!section || !grid || !center || !hubAura) return undefined;

    const positionLines = () => {
      if (window.matchMedia("(max-width: 1100px)").matches) {
        lineRefs.current.forEach((line) => {
          if (line) line.style.display = "none";
        });
        return;
      }

      const animatedEls = [center, ...cardRefs.current.filter(Boolean)];
      const savedTransforms = animatedEls.map((el) => el.style.transform);
      animatedEls.forEach((el) => {
        el.style.transform = "none";
      });

      const gridRect = grid.getBoundingClientRect();
      const centerRect = center.getBoundingClientRect();
      const c = {
        left: centerRect.left - gridRect.left,
        right: centerRect.right - gridRect.left,
        top: centerRect.top - gridRect.top,
        bottom: centerRect.bottom - gridRect.top,
        cx: (centerRect.left + centerRect.right) / 2 - gridRect.left,
        cy: (centerRect.top + centerRect.bottom) / 2 - gridRect.top,
      };

      const measurements = domainCards.map((card, index) => {
        const cardEl = cardRefs.current[index];
        if (!cardEl) return null;
        const rect = cardEl.getBoundingClientRect();
        return {
          card,
          r: {
            left: rect.left - gridRect.left,
            right: rect.right - gridRect.left,
            top: rect.top - gridRect.top,
            bottom: rect.bottom - gridRect.top,
            cx: (rect.left + rect.right) / 2 - gridRect.left,
            cy: (rect.top + rect.bottom) / 2 - gridRect.top,
          },
        };
      });

      animatedEls.forEach((el, i) => {
        el.style.transform = savedTransforms[i] || "";
      });

      measurements.forEach((m, index) => {
        if (!m) return;
        const { card, r } = m;
        const lineEl = lineRefs.current[index];
        if (!lineEl) return;
        const connectionOverlap = 10;

        lineEl.style.display = "block";

        const dxCenters = r.cx - c.cx;
        const dyCenters = r.cy - c.cy;
        const slope = dxCenters === 0 ? 0 : dyCenters / dxCenters;

        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        switch (card.anchor) {
          case "topLeft":
          case "bottomLeft":
            startX = c.left;
            startY = c.cy + slope * (c.left - c.cx);
            endX = r.right;
            endY = r.cy + slope * (r.right - r.cx);
            break;
          case "topCenter":
            startX = c.cx;
            startY = c.top;
            endX = r.cx;
            endY = r.bottom;
            break;
          case "topRight":
          case "bottomRight":
            startX = c.right;
            startY = c.cy + slope * (c.right - c.cx);
            endX = r.left;
            endY = r.cy + slope * (r.left - r.cx);
            break;
          case "bottomCenter":
            startX = c.cx;
            startY = c.bottom;
            endX = r.cx;
            endY = r.top;
            break;
          default:
            break;
        }

        const dx = endX - startX;
        const dy = endY - startY;
        const length = Math.sqrt(dx * dx + dy * dy);
        const unitX = length === 0 ? 0 : dx / length;
        const unitY = length === 0 ? 0 : dy / length;
        const adjustedStartX = startX - unitX * connectionOverlap;
        const adjustedStartY = startY - unitY * connectionOverlap;
        const adjustedEndX = endX + unitX * connectionOverlap;
        const adjustedEndY = endY + unitY * connectionOverlap;
        const adjustedDx = adjustedEndX - adjustedStartX;
        const adjustedDy = adjustedEndY - adjustedStartY;
        const adjustedLength = Math.sqrt(
          adjustedDx * adjustedDx + adjustedDy * adjustedDy,
        );
        const angle = (Math.atan2(adjustedDy, adjustedDx) * 180) / Math.PI;

        lineEl.style.left = `${adjustedStartX}px`;
        lineEl.style.top = `${adjustedStartY}px`;
        lineEl.style.width = `${adjustedLength}px`;
        lineEl.style.transform = `rotate(${angle}deg)`;
      });
    };

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => positionLines())
        : null;

    resizeObserver?.observe(grid);
    resizeObserver?.observe(center);
    cardRefs.current.forEach((cardEl) => {
      if (cardEl) resizeObserver?.observe(cardEl);
    });

    positionLines();

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1101px)", () => {
      const pulse = gsap.to(hubAura, {
        scale: 1.08,
        autoAlpha: 0.28,
        duration: 2.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        paused: true,
      });

      gsap.set(center, {
        autoAlpha: 0,
        y: 20,
        scale: 0.96,
        transformOrigin: "50% 50%",
      });

      gsap.set(hubAura, {
        autoAlpha: 0.14,
        scale: 0.92,
        transformOrigin: "50% 50%",
      });

      gsap.set(cardRefs.current, {
        autoAlpha: 0,
        y: 24,
        scale: 0.88,
        rotate: (index) => domainCards[index].entryRotate,
        transformOrigin: "50% 50%",
      });

      gsap.set(lineRefs.current, {
        autoAlpha: 1,
        clipPath: "inset(0 100% 0 0)",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 74%",
          toggleActions: "play none none reset",
          onEnter: () => {
            positionLines();
            pulse.pause(0);
          },
          onEnterBack: () => {
            positionLines();
            pulse.pause(0);
          },
          onLeaveBack: () => {
            pulse.pause(0);
            gsap.set(hubAura, { autoAlpha: 0.14, scale: 0.92 });
          },
        },
      });

      tl.to(center, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.78,
        ease: "back.out(1.45)",
      })
        .to(
          lineRefs.current,
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.08,
          },
          "-=0.2",
        )
        .to(
          cardRefs.current,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.08,
          },
          "-=0.34",
        )
        .call(() => pulse.play(), null, ">-0.12");

      return () => {
        pulse.kill();
      };
    });

    mm.add("(max-width: 1100px)", () => {
      lineRefs.current.forEach((line) => {
        if (line) line.style.display = "none";
      });

      gsap.set(center, {
        autoAlpha: 0,
        y: 24,
        scale: 0.97,
        transformOrigin: "50% 50%",
      });

      gsap.set(hubAura, {
        autoAlpha: 0.14,
        scale: 0.92,
        transformOrigin: "50% 50%",
      });

      gsap.set(cardRefs.current, {
        autoAlpha: 0,
        y: 18,
        scale: 0.9,
        rotate: (index) => domainCards[index].entryRotate * 0.7,
        transformOrigin: "50% 50%",
      });

      const pulse = gsap.to(hubAura, {
        scale: 1.08,
        autoAlpha: 0.26,
        duration: 2.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        paused: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          toggleActions: "play none none reset",
          onEnter: () => pulse.pause(0),
          onEnterBack: () => pulse.pause(0),
          onLeaveBack: () => {
            pulse.pause(0);
            gsap.set(hubAura, { autoAlpha: 0.14, scale: 0.92 });
          },
        },
      });

      tl.to(center, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.72,
        ease: "back.out(1.4)",
      })
        .to(
          cardRefs.current,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.72,
            ease: "back.out(1.6)",
            stagger: 0.08,
          },
          "-=0.2",
        )
        .call(() => pulse.play(), null, ">-0.1");

      return () => {
        pulse.kill();
      };
    });

    return () => {
      resizeObserver?.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.section} bgGrid`}>
      <Container className={styles.container} maxWidth={1480}>
        <div ref={gridRef} className={styles.grid}>
          {domainCards.map((card, index) => {
            const IconComp = card.Icon;
            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`${styles.domainCard} ${styles[card.posClass]}`}
              >
                <span className={styles.domainCardIconWrap}>
                  <IconComp className={styles.domainCardIcon} />
                </span>
                <h3 className={styles.domainCardTitle}>{card.title}</h3>
                <p className={styles.domainCardDescription}>
                  {card.description}
                </p>
              </div>
            );
          })}

          <div className={styles.centerWrap}>
            <div ref={centerCardRef} className={styles.centerCard}>
              <span
                ref={hubAuraRef}
                className={styles.hubAura}
                aria-hidden="true"
              />
              <SectionIntro
                title="Healthcare Domains We Solve For"
                description="From clinical workflows to compliance systems, we design solutions across critical areas of healthcare."
                highlightWord={3}
                className={styles.centerIntro}
                titleClassName={styles.centerTitle}
                descriptionClassName={styles.centerDescription}
                color="#243246"
                highlightColor="#2FD1AB"
              />
            </div>
          </div>

          {domainCards.map((card, index) => (
            <span
              key={`line-${card.id}`}
              ref={(el) => {
                lineRefs.current[index] = el;
              }}
              className={styles.line}
              aria-hidden="true"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Domains;
