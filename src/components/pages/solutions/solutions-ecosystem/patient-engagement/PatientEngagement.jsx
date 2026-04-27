import { useRef, useState } from "react";
import styles from "./patient-engagement.module.css";
import Brain from "../../../../ui/icons/patient-engagement/Brain";
import ChatBubble from "../../../../ui/icons/patient-engagement/ChatBubble";
import Gear from "../../../../ui/icons/patient-engagement/Gear";
import Stats from "../../../../ui/icons/patient-engagement/Stats";
import Clip from "../../../../ui/icons/patient-engagement/Clip";
import Shield from "../../../../ui/icons/patient-engagement/Shield";

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
  const wheelRef = useRef(null);
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

  return (
    <div className={styles.wheelWrapper}>
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
          const radiusPct = 33;
          const left = `${50 + radiusPct * Math.sin(rad)}%`;
          const top = `${50 - radiusPct * Math.cos(rad)}%`;
          const Icon = seg.Icon;
          return (
            <div
              key={`label-${i}`}
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

        <div
          className={styles.nibRing}
          style={{ transform: `translate(-50%, -50%) rotate(${nibAngle}deg)` }}
        >
          <div className={styles.nibTriangle} />
        </div>

        <div className={styles.pill}>
          <span>Patient</span>
          <span>Engagement</span>
        </div>
      </div>
    </div>
  );
}

export default PatientEngagement;
