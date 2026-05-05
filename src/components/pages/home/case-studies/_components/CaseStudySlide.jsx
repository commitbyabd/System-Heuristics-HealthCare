import styles from "./CaseStudySlide.module.css";
import Button from "../../../../ui/button/Button";

function PlayIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function CaseStudySlide({
  title,
  problem,
  solution,
  image,
  imageAlt,
  liveDemo,
  videoDemo,
}) {
  return (
    <article className={styles.slide}>
      <div className={styles.slideMediaWrap}>
        <img
          src={image}
          alt={imageAlt}
          className={styles.slideImage}
          loading="lazy"
        />
      </div>
      <div className={styles.slideBody}>
        <h3 className={styles.slideTitle}>{title}</h3>
        <p className={styles.slideBlock}>
          <span className={styles.slideBlockHeading}>Problem :</span>
          {problem}
        </p>
        <p className={styles.slideBlock}>
          <span className={styles.slideBlockHeading}>Solution:</span>
          {solution}
        </p>
        <div className={styles.slideActions}>
          <a href={liveDemo}>
            <Button text="Live Demo" variant="filled" width="152px" />
          </a>
          <a href={videoDemo} className={styles.videoDemoBtn}>
            Video Demo
            <PlayIcon className={styles.videoDemoIcon} />
          </a>
        </div>
      </div>
    </article>
  );
}

export default CaseStudySlide;
