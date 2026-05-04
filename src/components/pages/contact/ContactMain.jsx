import Hero from "./hero/Hero";
import ContactForm from "./contact-form/ContactForm";
import Faq from "./../about/faq/Faq";
function ContactMain() {
  return (
    <section>
      <Hero />
      <ContactForm />
      <Faq />
    </section>
  );
}

export default ContactMain;
