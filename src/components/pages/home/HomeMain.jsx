import SharedGradient from "./shared-gradient/SharedGradient";
import Hero from "./hero/Hero";
import Compliance from "./compliance/Compliance";
import OutdatedSystems from "./Outdated-systems/OutdatedSystems";
import OurSolutions from "./our-solutions/OurSolutions";
import Domains from "./domains/Domains";
import CaseStudies from "./case-studies/CaseStudies";
import SuccessStory from "./success-story/SuccessStory";
import Container from "../../ui/container/Container";

function HomeMain() {
  return (
    <div>
      <SharedGradient>
        <Container>
          <Hero />
          <Compliance />
        </Container>
        <OutdatedSystems />
        <OurSolutions />
        <Domains />
        <CaseStudies />
        <SuccessStory />
      </SharedGradient>
    </div>
  );
}

export default HomeMain;
