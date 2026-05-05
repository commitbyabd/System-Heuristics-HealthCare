import styles from "./transform-operations.module.css";
import Container from "../../../ui/container/Container";
import LazyImage from "../../../ui/lazy-image/LazyImage";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import Button from "../../../ui/button/Button";

function TransformOperations() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <Container className={styles.inner}>
          <LazyImage
            src="/images/logo/sh-logo.svg"
            alt="Smart Healthcare logo"
            className={styles.logo}
          />

          <SectionIntro
            variant="section"
            title="Ready to transform your healthcare operations?"
            titleAs="h2"
            highlightWord={5}
            titleClassName={styles.title}
            color="#ffffff"
            highlightColor="#2FD1AB"
          />

          <div className={styles.actions}>
            <Button text="Talk to an Expert" variant="filled" width="170px" />
            <Button text="Book Demo" variant="transparent" width="120px" />
          </div>
        </Container>
      </div>
    </section>
  );
}

export default TransformOperations;
