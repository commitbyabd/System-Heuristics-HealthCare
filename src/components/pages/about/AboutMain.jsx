import Hero from "../about/hero/Hero";
import Principles from "./principles/Principles";
import ExpertiseShowcase from "./expertise-showcase/ExpertiseShowcase";
import ChooseUs from "./choose-us/ChooseUs";
import Pipeline from "./pipeline/Pipeline";
function AboutMain() {
  return (
    <div>
      <Hero />
      <Principles />
      <ExpertiseShowcase />
      <ChooseUs />
      <Pipeline />
    </div>
  );
}

export default AboutMain;
