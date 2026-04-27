import styles from "./hero.module.css";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import BackgroundFilledButton from "../../../ui/buttons/background-filled/BackgroundFilledButton";
import BackgroundTransparentButton from "../../../ui/buttons/background-transparent/BackgroundTransparentButton";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <SectionIntro animateTitle />

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
    </section>
  );
}

export default Hero;
