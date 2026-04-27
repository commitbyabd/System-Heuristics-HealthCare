import Container from "../container/Container";
import FaqSectionCard from "./faq-card/FaqSectionCard";
import styles from "./faq-component.module.css";

function FaqComponent({ data }) {
  const faqs = data ?? [];
  if (faqs.length === 0) return null;

  return (
    <Container>
      <div className={styles.sectionCards}>
        {faqs.map((faq, index) => (
          <FaqSectionCard faq={faq} key={index} />
        ))}
      </div>
    </Container>
  );
}

export default FaqComponent;
