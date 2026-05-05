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
            title={["Real-World Healthcare", "Technology Case Studies"]}
            description="Explore how we help healthcare organizations design, build,
and scale digital solutions — from A1-powered systems to
fully integrated platforms. Each case study highlights the
challenges, our approach, and the measurable outcomes."
            highlightWord={5}
            className={styles.intro}
            titleClassName={styles.introTitle}
            descriptionClassName={styles.introDescription}
            animateTitle
          />

          <div className={styles.actions}>
            <Button
              text="View Case Studies"
              variant="filled"
              width="222px"
              Icon={ArrowRight}
            />
          </div>
        </div>

        <img
          className={styles.image}
          src="/images/case-study/casestudy-hero.png"
          alt="hero-doc"
        />
      </Container>
    </section>
  );
}

export default Hero;
