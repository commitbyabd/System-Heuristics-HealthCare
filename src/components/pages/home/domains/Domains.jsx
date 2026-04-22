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
  },
  {
    id: "documentation",
    title: "Medical Documentation",
    description: "AI scribes, structured notes, and record systems",
    Icon: FileText,
    posClass: "cardTopCenter",
    anchor: "topCenter",
  },
  {
    id: "security",
    title: "Compliance & Data Security",
    description: "HIPAA-ready systems and audit-ready infrastructure",
    Icon: Lock,
    posClass: "cardTopRight",
    anchor: "topRight",
  },
  {
    id: "operations",
    title: "Hospital & Clinic Operations",
    description: "Workflow automation, scheduling, and patient management",
    Icon: Building2,
    posClass: "cardBottomLeft",
    anchor: "bottomLeft",
  },
  {
    id: "remote-care",
    title: "Telemedicine & Remote Care",
    description: "Digital consultation platforms and monitoring systems",
    Icon: Globe,
    posClass: "cardBottomCenter",
    anchor: "bottomCenter",
  },
  {
    id: "analytics",
    title: "Healthcare Analytics",
    description: "Data-driven insights for better clinical and operational decisions",
    Icon: BarChart3,
    posClass: "cardBottomRight",
    anchor: "bottomRight",
  },
];

function Domains() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const centerCardRef = useRef(null);
  const cardRefs = useRef([]);
  const lineRefs = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const center = centerCardRef.current;
    if (!section || !grid || !center) return;

    const positionLines = () => {
      if (window.matchMedia("(max-width: 1100px)").matches) {
        lineRefs.current.forEach((line) => {
          if (line) line.style.display = "none";
        });
        return;
      }

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

      domainCards.forEach((card, i) => {
        const cardEl = cardRefs.current[i];
        const line = lineRefs.current[i];
        if (!cardEl || !line) return;

        line.style.display = "block";

        const rect = cardEl.getBoundingClientRect();
        const r = {
          left: rect.left - gridRect.left,
          right: rect.right - gridRect.left,
          top: rect.top - gridRect.top,
          bottom: rect.bottom - gridRect.top,
          cx: (rect.left + rect.right) / 2 - gridRect.left,
          cy: (rect.top + rect.bottom) / 2 - gridRect.top,
        };

        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        switch (card.anchor) {
          case "topLeft":
            startX = c.left + 24;
            startY = c.top;
            endX = r.right - 24;
            endY = r.bottom;
            break;
          case "topCenter":
            startX = c.cx;
            startY = c.top;
            endX = r.cx;
            endY = r.bottom;
            break;
          case "topRight":
            startX = c.right - 24;
            startY = c.top;
            endX = r.left + 24;
            endY = r.bottom;
            break;
          case "bottomLeft":
            startX = c.left + 24;
            startY = c.bottom;
            endX = r.right - 24;
            endY = r.top;
            break;
          case "bottomCenter":
            startX = c.cx;
            startY = c.bottom;
            endX = r.cx;
            endY = r.top;
            break;
          case "bottomRight":
            startX = c.right - 24;
            startY = c.bottom;
            endX = r.left + 24;
            endY = r.top;
            break;
          default:
            break;
        }

        const dx = endX - startX;
        const dy = endY - startY;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

        line.style.left = `${startX}px`;
        line.style.top = `${startY}px`;
        line.style.width = `${length}px`;
        line.style.transform = `rotate(${angle}deg)`;
      });
    };

    positionLines();
    window.addEventListener("resize", positionLines);

    const ctx = gsap.context(() => {
      gsap.set(lineRefs.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(cardRefs.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
          onEnter: positionLines,
        },
      });

      tl.to(
        cardRefs.current,
        {
          opacity: 1,
          ease: "power2.out",
          duration: 0.9,
          stagger: 0.12,
        },
        0,
      );

      tl.to(
        lineRefs.current,
        {
          clipPath: "inset(0 0% 0 0)",
          ease: "power2.inOut",
          duration: 1.6,
          stagger: 0.12,
        },
        0.25,
      );
    }, section);

    return () => {
      window.removeEventListener("resize", positionLines);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <Container className={styles.container}>
        <div ref={gridRef} className={styles.grid}>
          {domainCards.map((card, i) => {
            const IconComp = card.Icon;
            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
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

          <div ref={centerCardRef} className={styles.centerCard}>
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

          {domainCards.map((card, i) => (
            <span
              key={`line-${card.id}`}
              ref={(el) => {
                lineRefs.current[i] = el;
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
