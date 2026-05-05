import styles from "./hero.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import Button from "../../../ui/button/Button";
import ArrowRight from "../../../ui/icons/ArrowRight";

function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={styles.layout}>
        <div className={styles.content}>
          <SectionIntro
            variant="hero"
            title={[
              "AI-Powered",
              "Solutions for Modern",
              "Healthcare Systems",
            ]}
            description="From patient data to predictive insights — transform how your organization operates, diagnoses, and scales."
            highlightWord={4}
            animateTitle
          />

          <div className={styles.actions}>
            <Button
              text="Explore Solutions"
              variant="filled"
              width="222px"
              Icon={ArrowRight}
            />
            <Button text="Book a Demo" variant="transparent" width="147px" />
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
