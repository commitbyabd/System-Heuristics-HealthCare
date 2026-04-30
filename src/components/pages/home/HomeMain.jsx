import SharedGradient from "./shared-gradient/SharedGradient";
import Hero from "./hero/Hero";
import Compliance from "./compliance/Compliance";
import OutdatedSystems from "./outdated-systems/OutdatedSystems";
// import OurSolutions from "./our-solutions/OurSolutions";
// import Domains from "./domains/Domains";
// import CaseStudies from "./case-studies/CaseStudies";
// import SuccessStory from "./success-story/SuccessStory";

function HomeMain() {
  return (
    <div>
      <SharedGradient>
        <Hero />
        <Compliance />
      </SharedGradient>
      <OutdatedSystems />
      {/* <OurSolutions />
      <Domains />
      <CaseStudies />
      <SuccessStory /> */}
    </div>
  );
}

export default HomeMain;
