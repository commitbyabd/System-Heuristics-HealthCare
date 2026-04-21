import { useEffect, useState } from "react";
import styles from "./outdated-systems.module.css";
import Chip from "../../../ui/chip/Chip";
import SectionTitle from "../../../ui/section-title/SectionTitle";
import Container from "../../../ui/container/Container";

const stats = [
  {
    id: "operational-loss",
    low: 5,
    high: 20,
    suffix: "%",
    description:
      "of operational budgets lost to inefficient compliance processes",
  },
  {
    id: "manual-work",
    low: 10,
    high: 30,
    suffix: "%",
    description:
      "of staff time consumed by manual documentation and workflows",
    hasAccentLine: true,
  },
  {
    id: "annual-loss",
    low: 100,
    high: null,
    prefix: "$",
    suffix: "k+",
    description:
      "annual losses due to compliance gaps and system failures",
  },
];

function formatStat({ low, high, prefix = "", suffix = "" }, animatedValue) {
  if (high == null) {
    return `${prefix}${animatedValue}${suffix}`;
  }

  const animatedLow = Math.max(
    0,
    Math.round((animatedValue / Math.max(low, high)) * low),
  );

  return `${prefix}${animatedLow}-${animatedValue}${suffix}`;
}

function OutdatedSystems() {
  const [animatedValues, setAnimatedValues] = useState(
    stats.map(() => 0),
  );

  useEffect(() => {
    const duration = 1800;
    const targets = stats.map((item) => item.high ?? item.low);
    const startTime = performance.now();
    let frameId = 0;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues(
        targets.map((target) => Math.round(target * easedProgress)),
      );

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.panel}>
        <Container className={styles.inner}>
          <div className={styles.header}>
            <Chip text="Industry Research" className={styles.chip} />
            <SectionTitle
              title="The Hidden Cost of Outdated Healthcare Systems"
              highlightWord={5}
              className={styles.title}
            />
          </div>

          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <article
                key={stat.id}
                className={styles.statCard}
                style={{ animationDelay: `${0.2 + index * 0.18}s` }}
              >
                {stat.hasAccentLine ? (
                  <svg
                    className={styles.accentLine}
                    viewBox="0 0 116 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 12C22.5 5.5 43.5 2.8 61.5 3.2C81.2 3.7 96.7 7.7 115 8.6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <span className={styles.divider} aria-hidden="true" />
                )}

                <p className={styles.value}>
                  {formatStat(stat, animatedValues[index])}
                </p>

                <p
                  className={styles.description}
                  style={{ animationDelay: `${0.5 + index * 0.2}s` }}
                >
                  {stat.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}

export default OutdatedSystems;
