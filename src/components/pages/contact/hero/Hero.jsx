import styles from "./hero.module.css";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import Button from "../../../ui/button/Button";
import ArrowRight from "../../../ui/icons/ArrowRight";
import Container from "../../../ui/container/Container";
function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={styles.inner}>
        <div className={styles.content}>
          <SectionIntro
            animateTitle
            title="Let's Build the Future of Healthcare Together"
            description="Whether you're exploring A1 solutions, improving workflows, or scaling your healthcare platform — our team is here to help."
            highlightWord={4}
          />

          <div className={styles.actions}>
            <Button
              text="Book a Consultation"
              variant="filled"
              width="222px"
              Icon={ArrowRight}
            />
            <Button text="View Our Work" variant="transparent" width="147px" />
          </div>
        </div>

        <img
          className={styles.image}
          src="/images/contact/hero-front.png"
          alt="hero-doc"
        />
      </Container>
    </section>
  );
}

export default Hero;
