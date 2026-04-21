import BackgroundFilledButton from "../../ui/buttons/background-filled/BackgroundFilledButton";
import BackgroundTransparent from "../../ui/buttons/background-transparent/BackgroundTransparent";
import Chip from "../../ui/chip/Chip";
import FeatureCard from "../../ui/cards/feature-card/FeatureCard";
import SectionIntro from "../../ui/section-intro/SectionIntro";
function HomeMain() {
  return (
    <div>
      <BackgroundFilledButton />
      <br />
      <BackgroundTransparent />
      <br />
      <Chip />
      <br />
      <div style={{ backgroundColor: "#000000" }}>
        <FeatureCard />
      </div>
      <br />
      <div style={{ backgroundColor: "#000000" }}>
        <SectionIntro />
      </div>
    </div>
  );
}

export default HomeMain;
