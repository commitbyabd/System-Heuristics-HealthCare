import Shield from "../../../../components/ui/icons/patient-engagement/Shield";
import Stats from "../../../../components/ui/icons/patient-engagement/Stats";
import styles from "./expertise-showcase-data.module.css";

const EXPERTISE_DATA = [
  {
    id: 1,
    title: "AI Specialists",
    description:
      "Our machine learning, deep learning, and analytics experts transform raw data into actionable insights, enabling smarter decision-making and sustained growth.",
    Icon: Shield,
  },
  {
    id: 2,
    title: "Software Developers",
    description:
      "Our engineering teams build scalable, high-performance applications tailored to your business needs, ensuring seamless integration and robust functionality.",
    Icon: Stats,
  },
  {
    id: 3,
    title: "Data Strategists",
    description:
      "We turn fragmented healthcare data into practical roadmaps, helping teams prioritize the right systems, workflows, and growth opportunities.",
    Icon: Shield,
  },
  {
    id: 4,
    title: "Compliance & Regulatory Experts",
    description:
      "We navigate complex regulatory landscapes to ensure your AI and software solutions meet global standards for security, privacy, and ethical compliance.",
    Icon: Stats,
  },
];

function ExpertiseShowcaseData() {
  return (
    <div className={styles.timelineLayout}>
      <div className={styles.railColumn} aria-hidden="true">
        <div className={styles.railTrack}>
          <span className={styles.railFill} data-timeline-fill />
          <span className={styles.railPulse} />
        </div>

        {EXPERTISE_DATA.map((item, index) => (
          <div
            key={item.id}
            className={styles.marker}
            data-timeline-marker
            style={{ "--marker-delay": `${index * 0.55}s` }}
          >
            <span className={styles.markerPulse} data-marker-pulse />
            <span className={styles.markerCore}>{item.id}</span>
          </div>
        ))}
      </div>

      <div className={styles.cardsColumn}>
        {EXPERTISE_DATA.map((item) => (
          <article
            key={item.id}
            className={`bgDarkBlur ${styles.card}`}
            data-expertise-card
          >
            <div className={styles.iconWrapper}>
              <item.Icon />
            </div>

            <div className={styles.content}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ExpertiseShowcaseData;
