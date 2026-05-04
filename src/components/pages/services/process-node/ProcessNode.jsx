import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./process-node.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import {
  processNodes,
  ProcessNodeCard,
} from "../../../../data/pages/services/process-nodes/ProcessNodesData";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_BREAKPOINT = 1100;
const DASH_PATTERN = "4 8";
const DASH_CYCLE = 12;

function ProcessNode() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const drawTlRef = useRef(null);
  const [paths, setPaths] = useState([]);
  const [active, setActive] = useState(false);
  const [drawn, setDrawn] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const computePaths = () => {
      const cards = cardRefs.current.filter(Boolean);
      if (cards.length < 2 || window.innerWidth <= DESKTOP_BREAKPOINT) {
        setPaths([]);
        return;
      }

      const trackRect = track.getBoundingClientRect();
      const points = cards.map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          x1: rect.left - trackRect.left + 22,
          x2: rect.right - trackRect.left - 22,
          cy: rect.top + rect.height / 2 - trackRect.top,
        };
      });

      const segments = [];
      for (let i = 0; i < points.length - 1; i += 1) {
        const a = points[i];
        const b = points[i + 1];
        const startX = a.x2;
        const endX = b.x1;
        const controlOffset = Math.max((endX - startX) * 0.38, 36);
        segments.push(
          `M ${startX.toFixed(1)} ${a.cy.toFixed(1)} C ${(startX + controlOffset).toFixed(1)} ${a.cy.toFixed(1)}, ${(endX - controlOffset).toFixed(1)} ${b.cy.toFixed(1)}, ${endX.toFixed(1)} ${b.cy.toFixed(1)}`,
        );
      }
      setPaths(segments);
    };

    computePaths();

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(computePaths)
        : null;
    ro?.observe(track);
    cardRefs.current.forEach((c) => c && ro?.observe(c));
    window.addEventListener("resize", computePaths);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray("[data-process-card]", track);
      if (!cards.length) return;

      gsap.from(cards, {
        autoAlpha: 0,
        y: 40,
        scale: 0.97,
        duration: 0.72,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: track,
          start: "top 72%",
          once: true,
        },
        onComplete: () => {
          const pathEls = track.querySelectorAll("[data-line-path]");
          if (!pathEls.length) {
            setDrawn(true);
            return;
          }
          const lengths = Array.from(pathEls).map((p) => p.getTotalLength());

          gsap.set(pathEls, {
            opacity: 1,
            strokeDasharray: (i) => lengths[i],
            strokeDashoffset: (i) => lengths[i],
          });

          const tl = gsap.timeline({
            onComplete: () => {
              gsap.set(pathEls, {
                strokeDasharray: DASH_PATTERN,
                strokeDashoffset: 0,
              });
              setDrawn(true);
            },
          });

          pathEls.forEach((p, index) => {
            tl.to(p, {
              strokeDashoffset: 0,
              duration: Math.max(lengths[index] / 320, 0.28),
              ease: "none",
            }, index === 0 ? 0 : ">-0.08");
          });

          drawTlRef.current = tl;
        },
      });
    }, section);

    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", computePaths);
      drawTlRef.current?.kill();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined")
      return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ "--process-dash-cycle": `${DASH_CYCLE}px` }}
      className={`bgGrid ${styles.section} ${active ? styles.inView : ""} ${drawn ? styles.drawn : ""}`.trim()}
    >
      <Container maxWidth={1600} className={styles.container}>
        <div className={styles.intro}>
          <SectionIntro
            title={["Our Delivery Process"]}
            description="We follow a clear, collaborative process to turn ideas into secure, scalable healthcare products — with the right planning, execution, and long-term support at every stage."
            titleAs="h2"
            highlightWord={2}
            color="#ffffff"
            highlightColor="#2FD1AB"
            className={styles.introWrap}
            titleClassName={styles.introTitle}
            descriptionClassName={styles.introDescription}
            animateTitle
            animateMode="scroll"
            animateInitialColor="#7f8d9f"
            animateAccentColor="#2FD1AB"
            animateFinalColor="#ffffff"
          />
        </div>

        <div ref={trackRef} className={styles.track}>
          <svg
            className={styles.lineSvg}
            width="100%"
            height="100%"
            aria-hidden="true"
          >
            {paths.map((d, i) => (
              <path
                key={i}
                d={d}
                data-line-path
                className={styles.linePath}
              />
            ))}
          </svg>

          <ul className={styles.list}>
            {processNodes.map((node, index) => (
              <li
                key={node.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                data-process-card
                className={`${styles.cell} ${
                  index % 2 === 0 ? styles.cellLow : styles.cellHigh
                }`}
              >
                <ProcessNodeCard node={node} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default ProcessNode;
