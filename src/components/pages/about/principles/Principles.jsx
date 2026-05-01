import styles from "./principles.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";

import React from "react";

function Principles() {
  return (
    <div className={styles.content}>
      <SectionIntro
        title="Our Principles"
        description="The foundation of everything we do, our mission, vision, and values guide how we build
technology. empower people, and shape the future."
        highlightWord={2}
        className={styles.intro}
        titleClassName={styles.introTitle}
        descriptionClassName={styles.introDescription}
        animateTitle
      />
    </div>
  );
}

export default Principles;
