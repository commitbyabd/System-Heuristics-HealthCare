import BackgroundFilledButton from "../../ui/buttons/background-filled/BackgroundFilledButton";
import BackgroundTransparent from "../../ui/buttons/background-transparent/BackgroundTransparent";
import Chip from "../../ui/chip/Chip";
import FeatureCard from "../../ui/cards/feature-card/FeatureCard";
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
    </div>
  );
}

export default HomeMain;
