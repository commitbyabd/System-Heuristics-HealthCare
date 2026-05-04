/* eslint-disable react-refresh/only-export-components */
import { forwardRef } from "react";
import styles from "./process-nodes-data.module.css";

const sharedDescription =
  "We understand your goals, workflows, technical constraints, and healthcare use cases before defining the right path forward.";

export const processNodes = [
  {
    id: "discover",
    step: "01",
    label: "Discover",
    desc: sharedDescription,
  },
  {
    id: "plan",
    step: "02",
    label: "Plan",
    desc: sharedDescription,
  },
  {
    id: "design",
    step: "03",
    label: "Design",
    desc: sharedDescription,
  },
  {
    id: "build",
    step: "04",
    label: "Build",
    desc: sharedDescription,
  },
  {
    id: "launch",
    step: "05",
    label: "Launch",
    desc: sharedDescription,
  },
  {
    id: "support",
    step: "06",
    label: "Support",
    desc: sharedDescription,
  },
];

export const ProcessNodeCard = forwardRef(function ProcessNodeCard(
  {
    node,
    index,
    isActive = false,
    onMouseEnter,
    onMouseLeave,
  },
  ref,
) {
  const { step, label, desc } = node;
  const displayStep =
    step ||
    (typeof index === "number" ? String(index + 1).padStart(2, "0") : "");

  return (
    <article
      ref={ref}
      tabIndex={0}
      data-process-card
      data-active={isActive}
      className={`${styles.card} ${isActive ? styles.cardActive : ""}`.trim()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className={styles.stepBadge} aria-hidden="true">
        <span className={styles.stepBadgeInner}>{displayStep}</span>
      </span>
      <h3 className={styles.label}>{label}</h3>
      <p className={styles.desc}>{desc}</p>
    </article>
  );
});

export default ProcessNodeCard;
