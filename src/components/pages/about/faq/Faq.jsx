import styles from "./faq.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import FaqData from "../../../../data/pages/about/faq-data/FaqData";

function Faq() {
  return (
    <section className={styles.section}>
      <Container>
        <SectionIntro
          title="Frequently Asked Questions"
          description="We're here to help with any questions you have about plans, pricing, and supported features."
          titleAs="h2"
          highlightWord={3}
          className={styles.intro}
          titleClassName={styles.title}
          descriptionClassName={styles.description}
          color="#18233b"
          highlightColor="#2FD1AB"
          animateTitle
          animateMode="scroll"
          animateInitialColor="#7f8d9f"
          animateAccentColor="#2FD1AB"
          animateFinalColor="#18233b"
        />

        <FaqData />
      </Container>
    </section>
  );
}

export default Faq;
