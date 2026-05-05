import styles from "./building.module.css";
import Container from "../../../ui/container/Container";
import SectionIntro from "../../../ui/section-intro/SectionIntro";

function Building() {
  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <svg
          className={styles.logo}
          width="70"
          height="81"
          viewBox="0 0 35 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="System Heuristics"
        >
          <path
            d="M29.4908 13.7135L29.4773 13.632L24.1684 10.5635L21.4664 9.00204L17.1894 6.53089L15.0441 7.78004L12.6409 9.16497L8.51324 11.5547L7.23693 12.2743L7.074 12.3693L4.43992 13.9036L4.34487 13.9579L4.4535 14.0122L8.62186 16.4291L9.00204 16.6327L13.3605 19.1582L15.6551 17.3252L15.7909 17.2166L11.5275 14.759L16.9179 11.6361L20.3259 13.6049L25.7026 16.7142L30.0068 19.1989L31.3781 20L34.5553 21.8194L34.6504 22.8106V30.0068L31.2967 31.9348L31.2152 31.9756L27.6714 34.0258L25.7841 35.1256L23.1229 36.6599L17.3252 40L11.2967 36.5241L10.8486 36.2661L7.01969 34.053L6.30007 33.6456L5.22743 33.021L5.05092 32.926L0 30.0068V20.2444L1.00475 20.8282L5.32247 23.313L5.52614 25.3904L5.63476 26.5716L10.0883 29.1378L10.1833 29.1921L12.8174 30.7128L17.0944 33.184L19.7556 31.6361L21.6565 30.5499L27.3727 27.2505L30.1018 25.6755L30.2648 25.5805L25.9878 23.1093L21.1677 20.3259L21.0319 20.4345L18.7373 22.2675L23.0957 24.7794L17.3659 28.0788L13.9308 26.0828L9.65377 23.6253L8.54039 22.9871L5.10523 20.9912L2.90564 19.7284L0 18.0448V10.0068L1.47997 9.13781L1.64291 9.05635L3.85608 7.78004L7.04684 5.93347L7.9294 5.41752L9.4501 4.54854L11.5954 3.29939L17.3252 0L33.3605 9.26001L34.3517 9.83028L34.6504 10.0068V19.0903L34.2702 18.8866L33.795 18.6015L29.7217 16.2525L29.4908 13.7135Z"
            fill="#0A1428"
          />
        </svg>
        <SectionIntro
          title={["Building Solutions That", "Work in Real Environments"]}
          description="Our case studies showcase how we approach real-world challenges, design practical solutions, and deliver systems that create measurable impact."
          titleAs="h2"
          highlightWord={[4, 5, 6]}
          color="#001830"
          className={styles.intro}
          titleClassName={styles.title}
          descriptionClassName={styles.description}
          animateTitle
          animateMode="scroll"
          animateFinalColor="#001830"
        />
      </Container>
    </section>
  );
}

export default Building;
