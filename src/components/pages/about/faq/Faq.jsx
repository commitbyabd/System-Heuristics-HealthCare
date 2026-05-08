import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./faq.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import FaqCard from "./_components/FaqCard";
import { ABOUT_FAQ_SECTIONS } from "../../../../data/pages/about/faq/faq-data";

function Faq() {
  const [activeSectionId, setActiveSectionId] = useState(
    ABOUT_FAQ_SECTIONS[0].id,
  );
  const [openQuestionIds, setOpenQuestionIds] = useState({
    [ABOUT_FAQ_SECTIONS[0].id]: ABOUT_FAQ_SECTIONS[0].items[0].id,
  });

  const openSection = (sectionId) => {
    if (sectionId === activeSectionId) return;
    setActiveSectionId(sectionId);
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
          titleClassName={styles.introTitle}
          descriptionClassName={styles.introDescription}
          animationVariant="dark"
          animateTitle
          animateMode="scroll"
        />

        <div className={styles.sectionList}>
          {ABOUT_FAQ_SECTIONS.map((section) => {
            const isActive = activeSectionId === section.id;

            return (
              <article
                key={section.id}
                className={`${styles.panel} ${isActive ? styles.panelOpen : ""}`.trim()}
              >
                {!isActive && (
                  <button
                    type="button"
                    className={styles.sectionToggle}
                    onClick={() => openSection(section.id)}
                    aria-expanded={false}
                  >
                    <span className={styles.sectionToggleTitle}>{section.title}</span>
                    <ChevronDown className={styles.sectionToggleIcon} />
                  </button>
                )}

                {isActive && (
                  <div className={styles.panelBody}>
                    <div className={styles.titleColumn}>
                      <h3 className={styles.sectionTitle}>{section.title}</h3>
                    </div>

                    <div className={styles.cardList}>
                      {section.items.map((item) => (
                        <FaqCard
                          key={item.id}
                          question={item.question}
                          answer={item.answer}
                          isOpen={openQuestionIds[section.id] === item.id}
                          onToggle={() => toggleQuestion(section.id, item.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Faq;
