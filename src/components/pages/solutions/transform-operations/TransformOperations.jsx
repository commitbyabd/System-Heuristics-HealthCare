import styles from "./transform-operations.module.css";
import Container from "../../../ui/container/Container";
import LazyImage from "../../../ui/lazy-image/LazyImage";
import SectionTitle from "../../../ui/section-title/SectionTitle";
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

          <SectionTitle
            title="Ready to transform your healthcare operations?"
            highlightWord={5}
            className={styles.title}
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
