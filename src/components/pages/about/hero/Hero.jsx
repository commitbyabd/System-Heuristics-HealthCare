import styles from "./hero.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import Button from "../../../ui/button/Button";
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={styles.layout}>
        <div className={styles.content}>
          <SectionIntro
            variant="hero"
            title="About Us"
            description="Whether you're exploring A1 solutions, improving workflows,
            or scaling your healthcare platform — our team is here to
            help."
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
    </section>
  );
}

export default Hero;
