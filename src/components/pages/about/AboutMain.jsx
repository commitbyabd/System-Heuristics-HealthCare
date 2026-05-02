import Hero from "../about/hero/Hero";
import Principles from "./principles/Principles";
import TechnologicalImpact from "./technological-impact/TechnologicalImpact";
import ExpertiseShowcase from "./expertise-showcase/ExpertiseShowcase";
import ChooseUs from "./choose-us/ChooseUs";
import Pipeline from "./pipeline/Pipeline";
import Testimonials from "./testimonials/Testimonials";
import Faq from "./faq/Faq";
function AboutMain() {
  return (
    <div>
      <Hero />
      <Principles />
      <ExpertiseShowcase />
      <TechnologicalImpact />
      <ChooseUs />
      <Pipeline />
      <Testimonials />
      <Faq />
    </div>
  );
}

export default AboutMain;
