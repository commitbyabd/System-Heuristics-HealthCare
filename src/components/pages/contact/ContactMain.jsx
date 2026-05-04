import Hero from "./hero/Hero";
import ContactForm from "./contact-form/ContactForm";
import Faq from "./../about/faq/Faq";
import Newsletter from "./newsletter/Newsletter";
function ContactMain() {
  return (
    <section>
      <Hero />
      <ContactForm />
      <Faq />
      <Newsletter />
    </section>
  );
}

export default ContactMain;
