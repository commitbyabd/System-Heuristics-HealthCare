import styles from "./contact-form.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ContactPageData } from "../../../../data/pages/contact/ContactPageData";
import {
  contactFormInitialValues,
  contactFormValidationSchema,
} from "./validation";
import Container from "../../../ui/container/Container";
import Mail from "../../../ui/icons/Mail";
import MapPin from "../../../ui/icons/MapPin";
import Phone from "../../../ui/icons/Phone";
import ChevronDown from "../../../ui/icons/ChevronDown";
import ArrowRight from "../../../ui/icons/ArrowRight";

const ICONS = {
  email: Mail,
  office: MapPin,
  phone: Phone,
};

function ContactForm() {
  const { contactForm, contactSection } = ContactPageData;
  const { title, highlightWord, description, fields, submitText } = contactForm;
  const { contactInfo } = contactSection;

  const titleWords = title.split(" ");

  const handleSubmit = (values, { resetForm }) => {
    console.log("Contact form submitted:", values);
    resetForm();
  };

  return (
    <section className={styles.section}>
      <Container className={styles.card}>
        <div className={styles.left}>
          <h2 className={styles.title}>
            {titleWords.map((word, i) => (
              <span
                key={i}
                className={i + 1 === highlightWord ? styles.highlight : ""}
              >
                {word}
                {i !== titleWords.length - 1 && " "}
              </span>
            ))}
          </h2>

          <p className={styles.description}>{description}</p>

          <ul className={styles.contactList}>
            {contactInfo.map((item) => {
              const Icon = ICONS[item.type];
              return (
                <li key={item.type} className={styles.contactItem}>
                  <span className={styles.iconWrap}>
                    {Icon && <Icon size={18} color="#2FD1AB" />}
                  </span>
                  <div className={styles.contactText}>
                    <p className={styles.contactTitle}>{item.title}</p>
                    <p className={styles.contactSubtitle}>{item.subtitle}</p>
                    <p className={styles.contactValue}>{item.value}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <Formik
          initialValues={contactFormInitialValues}
          validationSchema={contactFormValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={styles.right} noValidate>
              {fields.map((field) => {
                const hasError = touched[field.name] && errors[field.name];
                return (
                  <div key={field.name} className={styles.field}>
                    <label htmlFor={field.name} className={styles.label}>
                      {field.label}
                    </label>

                    {field.type === "textarea" ? (
                      <Field
                        as="textarea"
                        id={field.name}
                        name={field.name}
                        className={`${styles.textarea} ${hasError ? styles.inputError : ""}`.trim()}
                        placeholder={field.placeholder}
                        rows={5}
                      />
                    ) : field.type === "select" ? (
                      <div className={styles.selectWrap}>
                        <Field
                          as="select"
                          id={field.name}
                          name={field.name}
                          className={`${styles.select} ${hasError ? styles.inputError : ""}`.trim()}
                        >
                          <option value="" disabled>
                            {field.placeholder}
                          </option>
                          {field.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </Field>
                        <ChevronDown
                          className={styles.selectIcon}
                          size={18}
                          color="#8F9EAE"
                        />
                      </div>
                    ) : (
                      <Field
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        className={`${styles.input} ${hasError ? styles.inputError : ""}`.trim()}
                        placeholder={field.placeholder}
                      />
                    )}

                    <ErrorMessage
                      name={field.name}
                      component="p"
                      className={styles.errorText}
                    />
                  </div>
                );
              })}

              <button
                type="submit"
                className={styles.submit}
                disabled={isSubmitting}
              >
                <span>{submitText}</span>
                <ArrowRight size={20} color="#FFFFFF" />
              </button>
            </Form>
          )}
        </Formik>
      </Container>
    </section>
  );
}

export default ContactForm;
