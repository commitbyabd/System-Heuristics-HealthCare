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
            title="AI That Makes
Healthcare Smarter."
            description="We build practical A1 solutions for healthcare teams — from
utomation and clinical support to patient engagement and
perational intelligence. Designed to improve efficiency,
nhance decision-making, and deliver better care."
            highlightWord={5}
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
          src="/images/ai/ai-hero.png"
          alt="hero-doc"
        />
      </Container>
    </section>
  );
}

export default Hero;
