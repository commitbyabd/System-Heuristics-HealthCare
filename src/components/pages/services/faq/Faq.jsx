import { useState } from "react";
import styles from "./Faq.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";
import FaqList from "../../../ui/faq/FaqList";
import FaqItem from "../../../ui/faq/faq-item/FaqItem";
import { SERVICES_FAQ_DATA } from "../../../../data/pages/services/faq/FaqData";

function Faq() {
  const { intro, group } = SERVICES_FAQ_DATA;
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
          color="#18233b"
          highlightColor="#2FD1AB"
          animateTitle
          animateMode="scroll"
          animateInitialColor="#a2acb7"
          animateAccentColor="#2FD1AB"
          animateFinalColor="#18233b"
        />

        <div className={styles.panel}>
          <div className={styles.sidebar}>
            <h3 className={styles.groupTitle}>{group.title}</h3>
          </div>

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
      </Container>
    </section>
  );
}

export default Faq;
