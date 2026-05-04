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

const CORNER_INSET = 26;

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
      if (cards.length < 2) {
        setPaths([]);
        return;
      }
      const trackRect = track.getBoundingClientRect();
      const points = cards.map((el, i) => {
        const rect = el.getBoundingClientRect();
        return {
          leftX: rect.left - trackRect.left,
          rightX: rect.right - trackRect.left,
          topY: rect.top - trackRect.top,
          bottomY: rect.bottom - trackRect.top,
          isHigh: i % 2 === 1,
        };
      });

      const segments = [];
      for (let i = 0; i < points.length - 1; i += 1) {
        const a = points[i];
        const b = points[i + 1];
        const startX = a.rightX;
        const endX = b.leftX;
        const startY = a.isHigh
          ? a.bottomY - CORNER_INSET
          : a.topY + CORNER_INSET;
        const endY = b.isHigh
          ? b.bottomY - CORNER_INSET
          : b.topY + CORNER_INSET;
        const midX = (startX + endX) / 2;
        segments.push(
          `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${midX.toFixed(1)} ${startY.toFixed(1)}, ${midX.toFixed(1)} ${endY.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`,
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
        y: 32,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: track,
          start: "top 78%",
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
                strokeDasharray: "3 7",
                strokeDashoffset: 0,
              });
              setDrawn(true);
            },
          });

          pathEls.forEach((p) => {
            tl.to(p, {
              strokeDashoffset: 0,
              duration: 0.4,
              ease: "power2.out",
            });
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
      className={`bgGrid ${styles.section} ${active ? styles.inView : ""} ${drawn ? styles.drawn : ""}`.trim()}
    >
      <Container className={styles.container}>
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
