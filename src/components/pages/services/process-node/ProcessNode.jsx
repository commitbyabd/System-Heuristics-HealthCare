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
const DASH_PATTERN = "6 4";
const DASH_CYCLE = 10;
const EDGE_INSET = 6;

function ProcessNode() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const drawTlRef = useRef(null);
  const [paths, setPaths] = useState([]);
  const [inView, setInView] = useState(false);
  const [drawn, setDrawn] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
      const points = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        return {
          left: rect.left - trackRect.left,
          right: rect.right - trackRect.left,
          centerY: rect.top - trackRect.top + rect.height / 2,
        };
      });

      const segments = [];
      for (let i = 0; i < points.length - 1; i += 1) {
        const start = points[i];
        const end = points[i + 1];
        const startX = start.right - EDGE_INSET;
        const endX = end.left + EDGE_INSET;
        const startY = start.centerY;
        const endY = end.centerY;
        const dx = endX - startX;
        const handle = Math.min(Math.max(dx * 0.45, 58), 124);

        segments.push({
          d: `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${(startX + handle).toFixed(1)} ${startY.toFixed(1)}, ${(endX - handle).toFixed(1)} ${endY.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`,
        });
      }

      setPaths(segments);
    };

    computePaths();

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(computePaths)
        : null;

    ro?.observe(track);
    cardRefs.current.forEach((card) => {
      if (card) {
        ro?.observe(card);
      }
    });
    window.addEventListener("resize", computePaths);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray("[data-process-card]", track);
      if (!cards.length) return;

      gsap.set(cards, { autoAlpha: 0, y: 48, scale: 0.92 });

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top 75%",
          once: true,
        },
        onComplete: () => {
          cards.forEach((card) => card.classList.add("is-revealed"));

          const pathEls = track.querySelectorAll("[data-line-path]");
          if (!pathEls.length) {
            setDrawn(true);
            return;
          }

          const lengths = Array.from(pathEls).map((path) => path.getTotalLength());

          gsap.set(pathEls, {
            opacity: 1,
            strokeDasharray: (index) => lengths[index],
            strokeDashoffset: (index) => lengths[index],
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

          pathEls.forEach((path, index) => {
            tl.to(
              path,
              {
                strokeDashoffset: 0,
                duration: Math.max(lengths[index] / 360, 0.32),
                ease: "power2.inOut",
              },
              index === 0 ? 0 : ">-0.12",
            );
          });

          drawTlRef.current = tl;
        },
      });

      reveal.to(cards, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: "back.out(1.4)",
        stagger: { each: 0.11, from: "start" },
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
    if (!section || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleKeyDown = (event, index) => {
    const isForward =
      event.key === "ArrowRight" || event.key === "ArrowDown";
    const isBackward = event.key === "ArrowLeft" || event.key === "ArrowUp";

    if (!isForward && !isBackward) {
      return;
    }

    event.preventDefault();

    const nextIndex =
      (index + (isForward ? 1 : -1) + processNodes.length) % processNodes.length;

    setActiveIndex(nextIndex);
    cardRefs.current[nextIndex]?.focus();
  };

  return (
    <section
      ref={sectionRef}
      style={{ "--process-dash-cycle": `${DASH_CYCLE}px` }}
      className={`${styles.section} ${inView ? styles.inView : ""} ${drawn ? styles.drawn : ""}`.trim()}
    >
      <Container maxWidth={1600} className={styles.container}>
        <div className={styles.intro}>
          <SectionIntro
            title={["Our Delivery Process"]}
            description="We follow a clear, collaborative path from discovery to support so healthcare products launch with confidence, clarity, and long-term resilience."
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
            {paths.map((segment, index) => (
              <path
                key={processNodes[index].id}
                d={segment.d}
                data-line-path
                className={`${styles.linePath} ${
                  activeIndex === index || activeIndex === index + 1
                    ? styles.linePathActive
                    : ""
                }`.trim()}
              />
            ))}
          </svg>

          <ul className={styles.list}>
            {processNodes.map((node, index) => (
              <li
                key={node.id}
                className={`${styles.cell} ${
                  index % 2 === 0 ? styles.cellLow : styles.cellHigh
                }`}
              >
                <ProcessNodeCard
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  node={node}
                  index={index}
                  isActive={activeIndex === index}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                />
                {index < processNodes.length - 1 ? (
                  <span className={styles.mobileConnector} aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default ProcessNode;
