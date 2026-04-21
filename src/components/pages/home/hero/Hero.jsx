import styles from "./hero.module.css";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import BackgroundFilledButton from "../../../ui/buttons/background-filled/BackgroundFilledButton";
import BackgroundTransparentButton from "../../../ui/buttons/background-transparent/BackgroundTransparentButton";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <SectionIntro />

        <div className={styles.actions}>
          <BackgroundFilledButton />
          <BackgroundTransparentButton />
        </div>
      </div>

      <img
        className={styles.image}
        src="/images/home/hero-doc.svg"
        alt="hero-doc"
      />
    </section>
  );
}

export default Hero;
