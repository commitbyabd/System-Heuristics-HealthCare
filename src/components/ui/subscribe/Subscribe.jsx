import { useState } from "react";
import styles from "./subscribe.module.css";
import Container from "../container/Container";
import SectionIntro from "../section-intro/SectionIntro";
import { Mail } from "lucide-react";

function Subscribe({
  title,
  description,
  helper,
  placeholder,
  buttonText,
  onSubmit,
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (typeof onSubmit === "function") {
      onSubmit(email, event);
      return;
    }
  };

  return (
    <section className={styles.section}>
      <Container maxWidth={1120}>
        <div className={styles.panel}>
          <SectionIntro
            variant="section"
            title={title}
            description={description}
            titleAs="h2"
            className={styles.intro}
            color="#ffffff"
            highlightColor="#ffffff"
          />

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.inputWrap} aria-label="Email address">
              <Mail
                className={styles.icon}
                style={{ "--icon-size": "18px" }}
                color="#ffffff"
              />
              <input
                className={styles.input}
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={placeholder}
                autoComplete="email"
                required
              />
            </label>

            <button className={styles.button} type="submit">
              {buttonText}
            </button>
          </form>

          <div className={styles.helperWrap}>
            <p className={styles.helper}>{helper}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Subscribe;
