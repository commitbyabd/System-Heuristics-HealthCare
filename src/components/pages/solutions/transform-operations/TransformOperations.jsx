import styles from "./transform-operations.module.css";
import Container from "../../../ui/container/Container";
import LazyImage from "../../../ui/lazy-image/LazyImage";
import SectionTitle from "../../../ui/section-title/SectionTitle";
import BackgroundFilledButton from "../../../ui/buttons/background-filled/BackgroundFilledButton";
import BackgroundTransparentButton from "../../../ui/buttons/background-transparent/BackgroundTransparentButton";

function TransformOperations() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <Container className={styles.inner}>
          <LazyImage
            src="/images/nav/sh-logo.svg"
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
            <BackgroundFilledButton text="Talk to an Expert" width="170px" />
            <BackgroundTransparentButton text="Book Demo" width="120px" />
          </div>
        </Container>
      </div>
    </section>
  );
}

export default TransformOperations;
