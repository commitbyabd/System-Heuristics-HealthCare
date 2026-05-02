import { useEffect, useRef, useState } from "react";
import ChevronDown from "../../../../components/ui/icons/ChevronDown";
import styles from "./faq-data.module.css";

const FAQ_SECTIONS = [
  {
    id: "solutions-capabilities",
    title: "Solutions & Capabilities",
    items: [
      {
        id: "what-is-sh-health",
        question: "What is SH Health?",
        answer:
          "SH Health is an AI-powered health optimization platform by System Heuristics that helps users track routines, analyze patterns, and improve wellness decisions through intelligent insights.",
      },
      {
        id: "ai-health-tracking",
        question: "How does the AI improve my health tracking?",
        answer:
          "The AI identifies trends across nutrition, habits, and activity data, then surfaces practical suggestions so users can act on meaningful patterns instead of guessing.",
      },
      {
        id: "beginner-friendly",
        question: "Is SH Health suitable for beginners?",
        answer:
          "Yes. The experience is designed to stay approachable for first-time users while still giving more advanced users enough depth to track progress and refine habits over time.",
      },
      {
        id: "workspace-site-plan",
        question: "Do I need both a Workspace & a Site plan?",
        answer:
          "Not always. The right setup depends on whether your team needs a collaborative internal workspace, a public-facing experience, or both. We help teams choose the right combination based on scope.",
      },
      {
        id: "workspace-count",
        question: "How many Workspaces can I have?",
        answer:
          "You can scale workspaces based on your operational needs. Most teams start with a single workspace and expand as departments, clinics, or initiatives grow.",
      },
      {
        id: "integrations",
        question: "Can your solutions integrate with our existing systems?",
        answer:
          "Yes. We build with interoperability in mind and can connect with internal dashboards, operational tools, and approved third-party systems where needed.",
      },
    ],
  },
  {
    id: "security-compliance",
    title: "Security & Compliance",
    items: [
      {
        id: "hipaa-support",
        question: "Do your healthcare solutions support HIPAA-compliant workflows?",
        answer:
          "Yes. Our systems are designed with secure data handling, access controls, and privacy-aware workflows that support HIPAA-aligned operational requirements.",
      },
      {
        id: "data-storage",
        question: "How is sensitive data stored and protected?",
        answer:
          "We use secure storage practices, role-based access, encryption-conscious architecture, and operational safeguards to reduce exposure and protect sensitive records.",
      },
      {
        id: "access-control",
        question: "Can different teams have different access levels?",
        answer:
          "Absolutely. We support permissions and access structures so administrators, clinicians, and operational staff only see the data and workflows relevant to them.",
      },
      {
        id: "audit-visibility",
        question: "Do you provide audit visibility for key system actions?",
        answer:
          "Yes. We can design systems with logging and activity visibility so teams can trace changes, review usage, and strengthen accountability across operations.",
      },
      {
        id: "compliance-guidance",
        question: "Can your team help us plan for compliance from the start?",
        answer:
          "Yes. We work with teams early in the product and workflow design process so security and compliance are built into the system, not patched on later.",
      },
      {
        id: "secure-integrations",
        question: "How do you handle security when integrating multiple tools?",
        answer:
          "We map system boundaries carefully, define secure data flows, and apply least-privilege thinking so integrations remain useful without unnecessarily widening access.",
      },
    ],
  },
  {
    id: "custom-development-process",
    title: "Custom Development Process",
    items: [
      {
        id: "project-start",
        question: "How does a custom development project start?",
        answer:
          "We begin with discovery sessions to understand your workflows, goals, users, and technical constraints. From there we define scope, priorities, and the right delivery roadmap.",
      },
      {
        id: "timeline-shaping",
        question: "How do you estimate timelines for healthcare builds?",
        answer:
          "Timelines depend on feature depth, integrations, compliance needs, and operational complexity. We break work into phases so progress remains predictable and visible.",
      },
      {
        id: "design-collaboration",
        question: "Will we be involved during design and development?",
        answer:
          "Yes. We work collaboratively with your team through planning, design reviews, milestone check-ins, and iterative delivery so the product stays aligned with real needs.",
      },
      {
        id: "post-launch-support",
        question: "Do you provide support after launch?",
        answer:
          "Yes. We can continue with enhancements, operational support, performance improvements, and roadmap evolution after the first release goes live.",
      },
      {
        id: "existing-product-upgrade",
        question: "Can you improve an existing healthcare product instead of rebuilding it?",
        answer:
          "Definitely. Many engagements start by improving workflows, redesigning key modules, modernizing architecture, or layering AI capabilities onto an existing system.",
      },
      {
        id: "scaling-teams",
        question: "Can you build in phases as our organization grows?",
        answer:
          "Yes. We often structure delivery in stages so teams can launch core functionality first and then expand features as adoption, budget, and operational maturity increase.",
      },
    ],
  },
];

function FaqData() {
  const [activeSectionId, setActiveSectionId] = useState(FAQ_SECTIONS[0].id);
  const [openQuestionIds, setOpenQuestionIds] = useState({
    [FAQ_SECTIONS[0].id]: FAQ_SECTIONS[0].items[0].id,
  });
  const itemRefs = useRef(new Map());

  useEffect(() => {
    let rafId = null;

    const update = () => {
      rafId = null;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const start = vh * 0.95;
      const end = vh * 0.3;
      const span = start - end;

      for (const el of itemRefs.current.values()) {
        if (!el) continue;
        const lineY = el.getBoundingClientRect().bottom;
        let p = (start - lineY) / span;
        if (p < 0) p = 0;
        else if (p > 1) p = 1;
        el.style.setProperty("--line-progress", p.toFixed(4));
      }
    };

    const onScroll = () => {
      if (rafId == null) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  const setItemRef = (key) => (el) => {
    if (el) itemRefs.current.set(key, el);
    else itemRefs.current.delete(key);
  };

  const toggleSection = (sectionId) => {
    setActiveSectionId((current) => (current === sectionId ? null : sectionId));
    setOpenQuestionIds((current) => {
      if (current[sectionId]) return current;

      const nextSection = FAQ_SECTIONS.find((section) => section.id === sectionId);
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
    <div className={styles.section}>
      <div className={styles.sections}>
        {FAQ_SECTIONS.map((section) => {
          const isActive = section.id === activeSectionId;
          const openQuestionId = openQuestionIds[section.id];

          return (
            <article
              key={section.id}
              className={`${styles.sectionCard} ${isActive ? styles.sectionCardActive : ""}`.trim()}
            >
              <button
                type="button"
                className={styles.sectionToggle}
                aria-expanded={isActive}
                onClick={() => toggleSection(section.id)}
              >
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                <ChevronDown
                  className={`${styles.sectionIcon} ${isActive ? styles.sectionIconOpen : ""}`.trim()}
                  size={20}
                  color="#18233b"
                />
              </button>

              <div
                className={`${styles.sectionContentWrap} ${isActive ? styles.sectionContentWrapOpen : ""}`.trim()}
              >
                <div className={styles.sectionContent}>
                  <div className={styles.sectionTitleColumn}>
                    <h3 className={styles.sectionTitleLarge}>{section.title}</h3>
                  </div>

                  <div className={styles.questionList}>
                    {section.items.map((item) => {
                      const isOpen = openQuestionId === item.id;

                      return (
                        <div
                          key={item.id}
                          className={styles.questionItem}
                          ref={setItemRef(`${section.id}/${item.id}`)}
                        >
                          <button
                            type="button"
                            className={styles.questionToggle}
                            aria-expanded={isOpen}
                            onClick={() => toggleQuestion(section.id, item.id)}
                          >
                            <span className={styles.questionText}>
                              {item.question}
                            </span>
                            <span className={styles.questionIcon} aria-hidden="true">
                              {isOpen ? "-" : "+"}
                            </span>
                          </button>

                          <div
                            className={`${styles.answerWrap} ${isOpen ? styles.answerWrapOpen : ""}`.trim()}
                          >
                            <p className={styles.answer}>{item.answer}</p>
                          </div>

                          <span className={styles.questionLine} aria-hidden="true">
                            <span className={styles.questionLineFill} />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default FaqData;
