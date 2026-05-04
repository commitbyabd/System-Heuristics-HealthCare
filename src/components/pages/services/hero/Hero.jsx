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
            title="Our Services"
            description="We design, build, and scale healthcare products — from
Custom software and A1 solutions to system integrations and
data platforms. Our services ore tailored to help healthcare
Organizations improve operations. enhance patient
experiences. and build future-ready systems."
            highlightWord={2}
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
          src="/images/services/services-hero.png"
          alt="hero-doc"
        />
      </Container>
    </section>
  );
}

export default Hero;
