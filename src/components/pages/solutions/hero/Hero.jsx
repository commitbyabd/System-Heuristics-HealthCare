import styles from "./hero.module.css";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import BackgroundFilledButton from "../../../ui/buttons/background-filled/BackgroundFilledButton";
import BackgroundTransparentButton from "../../../ui/buttons/background-transparent/BackgroundTransparentButton";
import Container from "../../../ui/container/Container";
function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={styles.inner}>
        <div className={styles.content}>
          <SectionIntro
            animateTitle
            title="AI-Powered Solutions for Modern Healthcare Systems"
            description="From patient data to predictive insights - transform how your organization operates, diagnoses, and scales."
            highlightWord={4}
          />

          <div className={styles.actions}>
            <BackgroundFilledButton />
            <BackgroundTransparentButton />
          </div>
        </div>

        <img
          className={styles.image}
          src="/images/solutions/solutions-hero.png"
          alt="hero-doc"
        />
      </Container>
    </section>
  );
}

export default Hero;
