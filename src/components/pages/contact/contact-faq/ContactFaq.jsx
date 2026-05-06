import { useState } from "react";
import styles from "./contact-faq.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import FaqComponent from "../../../ui/faq/FaqComponent";
import { ChevronDown } from "lucide-react";
import { ContactFaqData } from "../../../../data/pages/contact/ContactFaq";

function ContactFaq() {
  const { intro, categories } = ContactFaqData;
  const [openIndex, setOpenIndex] = useState(0);

  const toggleCategory = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? -1 : index));
  };

  if (!categories?.length) return null;

  return (
    <section className={styles.section}>
      <Container maxWidth={1180}>
        <SectionIntro
          variant="section"
          title={intro.title}
          description={intro.description}
          highlightWord={intro.highlightWord}
          className={styles.intro}
          color="#0A1F2E"
          highlightColor="#2FD1AB"
        />

        <div className={styles.groups}>
          {categories.map((category, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={category.label}
                className={`${styles.group} ${isOpen ? styles.groupOpen : ""}`.trim()}
              >
                <button
                  type="button"
                  className={styles.groupToggle}
                  onClick={() => toggleCategory(index)}
                  aria-expanded={isOpen}
                  aria-controls={`contact-faq-panel-${index}`}
                >
                  <span className={styles.groupLabel}>{category.label}</span>
                  <ChevronDown
                    className={`${styles.groupIcon} ${isOpen ? styles.groupIconOpen : ""}`.trim()}
                    style={{ "--icon-size": "18px" }}
                    color="#44515D"
                  />
                </button>

                {isOpen && (
                  <div
                    id={`contact-faq-panel-${index}`}
                    className={styles.groupBody}
                  >
                    <div className={styles.groupSidebar}>
                      <h3 className={styles.groupHeading}>{category.label}</h3>
                    </div>

                    <div className={styles.groupContent}>
                      <FaqComponent data={category.faqs} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default ContactFaq;
