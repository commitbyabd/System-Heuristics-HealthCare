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
            title="Software That Heals How Healthcare Works"
            description="We engineer intelligent, HIPAA-compliant healthcare platforms - from AI diagnostics to enterprise hospital systems - built for the future of medicine."
            highlightWord={3}
            animateTitle
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
          src="/images/home/hero-doc.png"
          alt="hero-doc"
        />
      </Container>
    </section>
  );
}

export default Hero;
