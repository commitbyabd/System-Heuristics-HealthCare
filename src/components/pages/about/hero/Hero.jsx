import styles from "./hero.module.css";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>About Us</h1>
        <p className={styles.description}>
          We are a healthcare company dedicated to providing high-quality
          medical services and innovative solutions to improve the health and
          well-being of our patients.
        </p>
      </div>
      <img
        src="/images/about/about-hero.png"
        alt="About Us"
        className={styles.image}
      />
    </section>
  );
}
export default Hero;
