import { Link } from "react-router-dom";
import styles from "./modern-services-cards.module.css";
import Button from "../../../../components/ui/button/Button";
import ArrowRight from "../../../../components/ui/icons/ArrowRight";

export const modernServicesData = [
  {
    id: "custom-software",
    number: "01",
    title: "Custom Healthcare Software Development",
    description:
      "From automation to intelligent decision support, we design AI systems that integrate into real workflows — helping teams reduce manual effort, improve accuracy, and make faster, data-driven decisions.",
    link: "/services/custom-healthcare-software",
  },
  {
    id: "ai-solutions",
    number: "02",
    title: "AI-Powered Healthcare Solutions",
    description:
      "We connect your systems with existing healthcare infrastructure, enabling seamless data flow across platforms. Our integrations ensure interoperability without disrupting your current workflows.",
    link: "/services/ai-powered-healthcare",
  },
  {
    id: "ehr-emr",
    number: "03",
    title: "EHR / EMR Integrations",
    description:
      "We build tailored healthcare platforms designed around your workflows — from patient management systems to complex operational tools. Every solution is scalable, secure, and aligned with real clinical and business needs.",
    link: "/services/ehr-emr-integrations",
  },
  {
    id: "web-mobile",
    number: "04",
    title: "Web & Mobile Applications",
    description:
      "We design and develop responsive healthcare applications that are intuitive, reliable, and optimized for both patients and healthcare professionals.",
    link: "/services/web-mobile-applications",
  },
];

export function ModernServiceCard({ service }) {
  const { number, title, description, link } = service;

  return (
    <article className={styles.card}>
      <span className={styles.number} aria-hidden="true">
        {number}
      </span>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <Link
          to={link}
          className={styles.cta}
          aria-label={`View service: ${title}`}
        >
          <Button
            text="View Service"
            variant="transparent"
            Icon={ArrowRight}
            className={styles.viewButton}
            tabIndex={-1}
          />
        </Link>
      </div>
    </article>
  );
}

export default ModernServiceCard;
