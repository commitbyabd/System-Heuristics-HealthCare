import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./patient-engagement.module.css";
import Brain from "../../../../ui/icons/patient-engagement/Brain";
import ChatBubble from "../../../../ui/icons/patient-engagement/ChatBubble";
import Gear from "../../../../ui/icons/patient-engagement/Gear";
import Stats from "../../../../ui/icons/patient-engagement/Stats";
import Clip from "../../../../ui/icons/patient-engagement/Clip";
import Shield from "../../../../ui/icons/patient-engagement/Shield";

gsap.registerPlugin(ScrollTrigger);

const SEGMENTS = [
  { number: "01", color: "#2FA89F", Icon: Brain },
  { number: "02", color: "#9CD6CB", Icon: ChatBubble },
  { number: "03", color: "#BCCBD2", Icon: Gear },
  { number: "04", color: "#1F4F6B", Icon: Stats },
  { number: "05", color: "#3A6E8A", Icon: Clip },
  { number: "06", color: "#5B95A4", Icon: Shield },
];

const CX = 200;
const CY = 200;
const R_OUTER = 180;
const SLICE_GAP_DEG = 2.5;
const DEFAULT_NIB_SEG = 1;
const LABEL_RADIUS_PCT = 33;

function polar(angleDeg, radius) {
  const rad = (angleDeg * Math.PI) / 180;
  return [CX + radius * Math.sin(rad), CY - radius * Math.cos(rad)];
}

function slicePath(startDeg, endDeg) {
  const [x1, y1] = polar(startDeg, R_OUTER);
  const [x2, y2] = polar(endDeg, R_OUTER);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${CX} ${CY} L ${x1} ${y1} A ${R_OUTER} ${R_OUTER} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

function PatientEngagement() {
  const wrapperRef = useRef(null);
  const wheelRef = useRef(null);
  const sliceRefs = useRef([]);
  const labelRefs = useRef([]);
  const pillRef = useRef(null);
  const nibIntroRef = useRef(null);
  const cumulativeAngle = useRef(DEFAULT_NIB_SEG * 60);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [nibAngle, setNibAngle] = useState(DEFAULT_NIB_SEG * 60);

  const pointToAngle = (target) => {
    const current = cumulativeAngle.current;
    const normalized = ((current % 360) + 360) % 360;
    let delta = target - normalized;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    cumulativeAngle.current = current + delta;
    setNibAngle(cumulativeAngle.current);
  };

  const handleMove = (e) => {
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    let angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
    if (angle < 0) angle += 360;
    const segIndex = Math.floor(((angle + 30) % 360) / 60);

    setHoverIndex(segIndex);
    pointToAngle(angle);
  };

  const handleLeave = () => {
    setHoverIndex(null);
    pointToAngle(DEFAULT_NIB_SEG * 60);
  };

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const wheel = wheelRef.current;
    if (!wrapper || !wheel) return undefined;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const slices = sliceRefs.current.filter(Boolean);
      const labels = labelRefs.current.filter(Boolean);

      if (prefersReducedMotion) {
        gsap.set([slices, labels, pillRef.current, nibIntroRef.current], {
          opacity: 1,
          clearProps: "transform",
        });
        return;
      }

      const wheelSize = wheel.getBoundingClientRect().width;

      gsap.set(slices, {
        opacity: 0,
        scale: 0,
        transformOrigin: `${CX}px ${CY}px`,
      });

      labels.forEach((label, i) => {
        const angle = i * 60;
        const rad = (angle * Math.PI) / 180;
        const offsetX = -(LABEL_RADIUS_PCT / 100) * wheelSize * Math.sin(rad);
        const offsetY = (LABEL_RADIUS_PCT / 100) * wheelSize * Math.cos(rad);
        gsap.set(label, {
          xPercent: -50,
          yPercent: -50,
          x: offsetX,
          y: offsetY,
          opacity: 0,
          scale: 0.35,
        });
      });

      gsap.set(pillRef.current, {
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
        scale: 0,
        transformOrigin: "50% 50%",
      });

      gsap.set(nibIntroRef.current, {
        opacity: 0,
        scale: 0.6,
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 75%",
          once: true,
        },
      });

      tl.to(slices, {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "back.out(1.4)",
        stagger: 0.16,
      })
        .to(
          labels,
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "back.out(1.7)",
            stagger: 0.16,
          },
          "<+0.3",
        )
        .to(
          pillRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "elastic.out(1, 0.55)",
          },
          "-=0.5",
        )
        .to(
          nibIntroRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(2)",
          },
          "-=0.5",
        );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wheelWrapper}>
      <div
        ref={wheelRef}
        className={styles.wheel}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <svg viewBox="0 0 400 400" className={styles.svg}>
          {SEGMENTS.map((seg, i) => {
            const start = i * 60 - 30 + SLICE_GAP_DEG / 2;
            const end = i * 60 + 30 - SLICE_GAP_DEG / 2;
            const isActive = hoverIndex === i;
            const isDimmed = hoverIndex !== null && !isActive;
            return (
              <path
                key={i}
                ref={(el) => {
                  sliceRefs.current[i] = el;
                }}
                d={slicePath(start, end)}
                fill={seg.color}
                strokeLinejoin="round"
                className={`${styles.slice} ${isActive ? styles.active : ""} ${isDimmed ? styles.dimmed : ""}`}
              />
            );
          })}
        </svg>

        {SEGMENTS.map((seg, i) => {
          const angle = i * 60;
          const rad = (angle * Math.PI) / 180;
          const left = `${50 + LABEL_RADIUS_PCT * Math.sin(rad)}%`;
          const top = `${50 - LABEL_RADIUS_PCT * Math.cos(rad)}%`;
          const Icon = seg.Icon;
          return (
            <div
              key={`label-${i}`}
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              className={styles.label}
              style={{ left, top }}
            >
              <span className={styles.number}>{seg.number}</span>
              <span className={styles.icon}>
                <Icon />
              </span>
            </div>
          );
        })}

        <div ref={nibIntroRef} className={styles.nibIntro}>
          <div
            className={styles.nibRing}
            style={{ transform: `translate(-50%, -50%) rotate(${nibAngle}deg)` }}
          >
            <div className={styles.nibTriangle} />
          </div>
        </div>

        <div ref={pillRef} className={styles.pill}>
          <span>Patient</span>
          <span>Engagement</span>
        </div>
      </div>
    </div>
  );
}

export default PatientEngagement;
