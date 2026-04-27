import { FaqData } from "../../../../../data/pages/solutions/faq/FaqData";
import FaqComponent from "../../../../ui/faq/FaqComponent";

function Accordion() {
  const items = FaqData?.faqSection?.faqs ?? [];

  if (items.length === 0) return null;

  return <FaqComponent data={items} />;
}

export default Accordion;
