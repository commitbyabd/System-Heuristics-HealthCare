import { Link, useParams } from "react-router-dom";
import Container from "../../ui/container/Container";
import caseStudies from "../../../data/case-study/CaseStudyData";
import styles from "./case-study-detail.module.css";

function CaseStudyDetailMain() {
  const { caseStudyId } = useParams();
  const study = caseStudies.find((item) => item.id === caseStudyId);

  if (!study) {
    return (
      <section className={styles.page}>
        <Container className={styles.container}>
          <div className={styles.notFound}>
            <span className={styles.eyebrow}>Case Study</span>
            <h1 className={styles.title}>This case study could not be found.</h1>
            <p className={styles.description}>
              The requested item does not match any case study in the current
              dataset.
            </p>
            <Link to="/case-studies" className={styles.primaryLink}>
              Back to all case studies
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <Container className={styles.container}>
        <Link to="/case-studies" className={styles.backLink}>
          All case studies
        </Link>

        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>Case Study {study.number}</span>
            <h1 className={styles.title}>{study.title}</h1>
            <p className={styles.description}>{study.summary}</p>

            <div className={styles.meta}>
              <span className={styles.metaItem}>{study.category}</span>
              <span className={styles.metaItem}>ID: {study.id}</span>
            </div>
          </div>

          <div className={styles.heroMedia}>
            <img
              src={study.image}
              alt={study.imageAlt}
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.contentGrid}>
          <article className={styles.panel}>
            <h2 className={styles.panelTitle}>The challenge</h2>
            <p className={styles.panelCopy}>{study.problem}</p>
          </article>

          <article className={styles.panel}>
            <h2 className={styles.panelTitle}>The solution</h2>
            <p className={styles.panelCopy}>{study.solution}</p>
          </article>
        </div>

        <article className={styles.resultsPanel}>
          <h2 className={styles.panelTitle}>Key outcomes</h2>
          <div className={styles.resultsList}>
            {study.results.map((result) => (
              <p key={result} className={styles.resultItem}>
                {result}
              </p>
            ))}
          </div>
        </article>
      </Container>
    </section>
  );
}

export default CaseStudyDetailMain;
