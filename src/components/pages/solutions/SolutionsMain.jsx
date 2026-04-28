import Hero from "./hero/Hero";
import SolutionsEcosystem from "./solutions-ecosystem/Solutions-ecosystem";
import OurSolutions from "../home/our-solutions/OurSolutions";
import CaseStudies from "../home/case-studies/CaseStudies";
import HealthcareEnvironment from "./healthcare-environment/HealthcareEnvironment";

function SolutionsMain() {
  return (
    <section>
      <Hero />
      <SolutionsEcosystem />
      <HealthcareEnvironment />
      <OurSolutions />
    </section>
  );
}

export default SolutionsMain;
