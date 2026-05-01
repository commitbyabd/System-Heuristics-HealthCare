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
          <SectionIntro
            title="About Us"
            description="Whether you're exploring A1 solutions, improving workflows,
or scaling your healthcare platform — our team is here to
help."
            className={styles.intro}
            titleClassName={styles.introTitle}
            descriptionClassName={styles.introDescription}
            animateTitle
          />

          <div className={styles.actions}>
            <Button text="Book a Demo" variant="filled" width="222px" />
            <Button
              text="Talk to an Expert"
              variant="transparent"
              width="147px"
            />
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
