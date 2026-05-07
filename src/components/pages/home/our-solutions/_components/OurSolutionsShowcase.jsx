import styles from "./OurSolutionsShowcase.module.css";

function OurSolutionsShowcase({
  steps,
  total,
  pillCount,
  activeStep,
  active,
  indicatorStyle,
  goToSlide,
  learnMoreHref,
  learnMoreText,
}) {
  const MonitorIcon = steps[total - 1].Icon;
  const isMonitorActive = activeStep === total - 1;

  return (
    <div className={styles.content}>
      <div className={styles.leftColumn}>
        <div className={styles.railWrap}>
          <div className={styles.rail} role="tablist" aria-label="Solutions">
            <span
              className={styles.railIndicator}
              style={indicatorStyle}
              aria-hidden="true"
            />
            {steps.slice(0, pillCount).map((step, index) => {
              const isActive = activeStep === index;
              const IconComp = step.Icon;

              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={step.title}
                  className={`${styles.railCell} ${isActive ? styles.railCellActive : ""}`.trim()}
                  onClick={() => goToSlide(index, { stop: true })}
                >
                  <IconComp
                    className={styles.railIcon}
                    color={isActive ? "#49bea9" : "#ffffff"}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label={steps[total - 1].title}
            className={`${styles.monitorNode} ${isMonitorActive ? styles.monitorNodeActive : ""}`.trim()}
            onClick={() => goToSlide(total - 1, { stop: true })}
          >
            <MonitorIcon
              className={styles.monitorIcon}
              color={isMonitorActive ? "#49bea9" : "rgba(120, 132, 140, 0.75)"}
            />
          </button>
        </div>

        <div className={styles.copyBlock}>
          <h3 className={styles.solutionTitle}>{active.title}</h3>
          <p className={styles.solutionDescription}>{active.description}</p>
          <a href={learnMoreHref} className={styles.learnMore}>
            {learnMoreText}
            <span className={styles.learnArrow}>&rarr;</span>
          </a>
        </div>
      </div>

      <div className={styles.previewWrap}>
        <div className={styles.cardStack}>
          {steps.map((step, index) => {
            const offset = activeStep - index;
            let transform;
            let opacity;
            let zIndex;

            if (offset === 0) {
              transform = "translate3d(0, 0, 0) scale(1)";
              opacity = 1;
              zIndex = total + 1;
            } else if (offset > 0) {
              const clamped = Math.min(offset, 3);
              transform = `translate3d(${clamped * 28}px, ${-clamped * 20}px, 0) scale(${1 - clamped * 0.035})`;
              opacity = Math.max(0.55, 1 - clamped * 0.15);
              zIndex = total - offset;
            } else {
              transform = "translate3d(0, 120px, 0) scale(0.94)";
              opacity = 0;
              zIndex = total + 2;
            }

            return (
              <div
                key={step.id}
                className={styles.card}
                style={{ transform, opacity, zIndex }}
              >
                <img
                  src={step.image}
                  alt={`${step.title} preview`}
                  className={styles.cardImage}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OurSolutionsShowcase;
