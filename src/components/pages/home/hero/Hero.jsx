import styles from "./hero.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import BackgroundFilledButton from "../../../ui/buttons/background-filled/BackgroundFilledButton";
import BackgroundTransparentButton from "../../../ui/buttons/background-transparent/BackgroundTransparentButton";

function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={styles.layout}>
        <div className={styles.content}>
          <SectionIntro animateTitle />

          <div className={styles.actions}>
            <BackgroundFilledButton
              text="Book a Consultation"
              width="222px"
            />
            <BackgroundTransparentButton
              text="View Our Work"
              width="147px"
            />
          </div>
        </div>

        <img
          className={styles.image}
          src="/images/home/hero-doc.png"
          alt="hero-doc"
        />
      </Container>
    </section>
  );
}

export default Hero;
