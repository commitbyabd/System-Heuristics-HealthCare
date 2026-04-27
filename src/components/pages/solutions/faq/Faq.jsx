import { FaqData } from "../../../../data/pages/solutions/faq/FaqData";
import FaqComponent from "../../../ui/faq/FaqComponent";

function Faq() {
  const faqs = FaqData?.faqSection?.faqs ?? [];

  if (faqs.length === 0) return null;

  return <FaqComponent data={faqs} />;
}

export default Faq;
