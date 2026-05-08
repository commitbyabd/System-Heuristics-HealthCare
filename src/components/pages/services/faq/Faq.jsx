import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Faq.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import FaqList from "../../../ui/faq/FaqList";
import FaqItem from "../../../ui/faq/faq-item/FaqItem";
import { SERVICES_FAQ_DATA } from "../../../../data/pages/services/faq/FaqData";

function Faq() {
  const { intro, group } = SERVICES_FAQ_DATA;
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [openQuestionId, setOpenQuestionId] = useState(group.items[0]?.id ?? null);

  const toggleQuestion = (questionId) => {
    setOpenQuestionId((current) =>
      current === questionId ? null : questionId,
    );
  };

  if (!group?.items?.length) return null;

  return (
    <section className={styles.section}>
      <Container maxWidth={1260} className={styles.container}>
        <SectionIntro
          variant="section"
          title={intro.title}
          description={intro.description}
          titleAs="h2"
          highlightWord={intro.highlightWord}
          className={styles.intro}
          titleClassName={styles.introTitle}
          descriptionClassName={styles.introDescription}
          animationVariant="dark"
          animateTitle
          animateMode="scroll"
        />

        <div className={styles.panel}>
          <button
            type="button"
            className={styles.panelToggle}
            onClick={() => setIsPanelOpen((current) => !current)}
            aria-expanded={isPanelOpen}
          >
            <span className={styles.groupTitle}>{group.title}</span>
            <ChevronDown
              className={`${styles.panelIcon} ${
                isPanelOpen ? styles.panelIconOpen : ""
              }`.trim()}
            />
          </button>

          <div
            className={`${styles.panelBody} ${
              isPanelOpen ? styles.panelBodyOpen : ""
            }`.trim()}
          >
            <div className={styles.panelBodyInner}>
              <div className={styles.content}>
                <FaqList className={styles.list}>
                  {group.items.map((item) => (
                    <FaqItem
                      key={item.id}
                      question={item.question}
                      answer={item.answer}
                      isOpen={openQuestionId === item.id}
                      onToggle={() => toggleQuestion(item.id)}
                    />
                  ))}
                </FaqList>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Faq;
