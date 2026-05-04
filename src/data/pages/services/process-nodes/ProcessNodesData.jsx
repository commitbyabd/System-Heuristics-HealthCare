import styles from "./process-nodes-data.module.css";

export const processNodes = [
  {
    id: "discover",
    step: "01",
    label: "Discover",
    desc: "We understand your goals, workflows, technical constraints, and healthcare use cases before defining the right path forward.",
  },
  {
    id: "plan",
    step: "02",
    label: "Plan",
    desc: "We shape the roadmap, prioritize features, define milestones, and align delivery with your business and product goals.",
  },
  {
    id: "design",
    step: "03",
    label: "Design",
    desc: "We design intuitive experiences, scalable architecture, and product systems that fit real healthcare environments.",
  },
  {
    id: "build",
    step: "04",
    label: "Build",
    desc: "We develop secure, scalable healthcare solutions with clean implementation, integrations, and production-ready quality.",
  },
  {
    id: "launch",
    step: "05",
    label: "Launch",
    desc: "We test, refine, deploy, and support rollout so your product goes live smoothly with confidence.",
  },
  {
    id: "support",
    step: "06",
    label: "Support",
    desc: "We continue with maintenance, optimization, improvements, and long-term technical support as your platform grows.",
  },
];

export function ProcessNodeCard({ node }) {
  const { step, label, desc } = node;

  return (
    <article className={`bgDarkBlur ${styles.card}`.trim()}>
      <span className={styles.stepBadge} aria-hidden="true">
        {step}
      </span>
      <h3 className={styles.label}>{label}</h3>
      <p className={styles.desc}>{desc}</p>
    </article>
  );
}

export default ProcessNodeCard;
