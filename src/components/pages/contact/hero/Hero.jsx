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
            title={["Let's Build the", "Future of Healthcare", "Togehter"]}
            description="Whether you're exploring A1 solutions, improving workflows,
or scaling your healthcare platform — our team is here to
help."
            highlightWord={4}
            className={styles.intro}
            titleClassName={styles.introTitle}
            descriptionClassName={styles.introDescription}
            animateTitle
          />

          <div className={styles.actions}>
            <Button
              text="Book a Demo"
              variant="filled"
              width="222px"
              Icon={ArrowRight}
            />
            <Button
              text="Explore AI Solutions"
              variant="transparent"
              width="184px"
            />
          </div>
        </div>

        <img
          className={styles.image}
          src="/images/contact/contact-hero.png"
          alt="hero-doc"
        />
      </Container>
    </section>
  );
}

export default Hero;
