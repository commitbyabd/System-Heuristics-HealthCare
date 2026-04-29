import { Link } from "react-router-dom";
import Container from "../../ui/container/Container";
import caseStudies from "../../../data/case-study/CaseStudyData";
import styles from "./case-studies-page.module.css";

function CaseStudiesPageMain() {
  return (
    <section className={styles.page}>
      <Container className={styles.container}>
        <div className={styles.hero}>
          <span className={styles.eyebrow}>Case Studies</span>
          <h1 className={styles.title}>Healthcare products built around real operational needs.</h1>
          <p className={styles.description}>
            Browse the work showcased on the home page, then open each case
            study for a dedicated view.
          </p>
        </div>

        <div className={styles.grid}>
          {caseStudies.map((study) => (
            <article key={study.id} className={styles.card}>
              <img
                src={study.image}
                alt={study.imageAlt}
                className={styles.image}
                loading="lazy"
              />

              <div className={styles.cardBody}>
                <div className={styles.metaRow}>
                  <span className={styles.number}>Case Study {study.number}</span>
                  <span className={styles.category}>{study.category}</span>
                </div>

                <h2 className={styles.cardTitle}>{study.title}</h2>
                <p className={styles.summary}>{study.summary}</p>

                <Link to={`/case-studies/${study.id}`} className={styles.link}>
                  View full case study
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CaseStudiesPageMain;
