import { useState } from "react";
import { FaqData } from "../../../../../data/pages/solutions/faq/FaqData";
import FaqList from "../../../../ui/faq/FaqList";
import FaqItem from "../../../../ui/faq/faq-item/FaqItem";

function Accordion() {
  const items = FaqData?.faqSection?.faqs ?? [];
  const [openIndices, setOpenIndices] = useState(() => new Set([0]));

  const toggle = (index) => {
    setOpenIndices((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  if (items.length === 0) return null;

  return (
    <FaqList>
      {items.map((faq, index) => (
        <FaqItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndices.has(index)}
          onToggle={() => toggle(index)}
        />
      ))}
    </FaqList>
  );
}

export default Accordion;
