import styles from "./hero.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import Button from "../../../ui/button/Button";
import SharedGradient from "../../home/shared-gradient/SharedGradient";

function Hero() {
  return (
    <SharedGradient className={styles.hero}>
      <Container className={styles.layout}>
        <div className={styles.content}>
          <SectionIntro animateTitle />

          <div className={styles.actions}>
            <Button text="Book a Consultation" variant="filled" width="222px" />
            <Button text="View Our Work" variant="transparent" width="147px" />
          </div>
        </div>

        <img
          className={styles.image}
          src="/images/about/about-hero.png"
          alt="hero-doc"
        />
      </Container>
    </SharedGradient>
  );
}

export default Hero;
