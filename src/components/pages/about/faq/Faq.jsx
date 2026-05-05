import { useState } from "react";
import styles from "./faq.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import FaqList from "../../../ui/faq/FaqList";
import FaqSection from "../../../ui/faq/faq-section/FaqSection";
import FaqItem from "../../../ui/faq/faq-item/FaqItem";
import { ABOUT_FAQ_SECTIONS } from "../../../../data/pages/about/faq/faq-data";

function Faq() {
  const [activeSectionId, setActiveSectionId] = useState(
    ABOUT_FAQ_SECTIONS[0].id,
  );
  const [openQuestionIds, setOpenQuestionIds] = useState({
    [ABOUT_FAQ_SECTIONS[0].id]: ABOUT_FAQ_SECTIONS[0].items[0].id,
  });

  const toggleSection = (sectionId) => {
    setActiveSectionId((current) => (current === sectionId ? null : sectionId));
    setOpenQuestionIds((current) => {
      if (current[sectionId]) return current;
      const nextSection = ABOUT_FAQ_SECTIONS.find((s) => s.id === sectionId);
      return {
        ...current,
        [sectionId]: nextSection?.items[0]?.id ?? null,
      };
    });
  };

  const toggleQuestion = (sectionId, questionId) => {
    setOpenQuestionIds((current) => ({
      ...current,
      [sectionId]: current[sectionId] === questionId ? null : questionId,
    }));
  };

  return (
    <section className={styles.section}>
      <Container>
        <SectionIntro
          variant="section"
          title="Frequently Asked Questions"
          description="We're here to help with any questions you have about plans, pricing, and supported features."
          titleAs="h2"
          highlightWord={3}
          className={styles.intro}
          color="#18233b"
          highlightColor="#2FD1AB"
          animateTitle
          animateMode="scroll"
          animateInitialColor="#7f8d9f"
          animateAccentColor="#2FD1AB"
          animateFinalColor="#18233b"
        />

        <FaqList>
          {ABOUT_FAQ_SECTIONS.map((section) => (
            <FaqSection
              key={section.id}
              title={section.title}
              isOpen={activeSectionId === section.id}
              onToggle={() => toggleSection(section.id)}
            >
              {section.items.map((item) => (
                <FaqItem
                  key={item.id}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openQuestionIds[section.id] === item.id}
                  onToggle={() => toggleQuestion(section.id, item.id)}
                />
              ))}
            </FaqSection>
          ))}
        </FaqList>
      </Container>
    </section>
  );
}

export default Faq;
