import BackgroundFilledButton from "../../ui/buttons/background-filled/BackgroundFilledButton";
import BackgroundTransparent from "../../ui/buttons/background-transparent/BackgroundTransparent";
import Chip from "../../ui/chip/Chip";
function HomeMain() {
  return (
    <div>
      <BackgroundFilledButton />
      <br />
      <BackgroundTransparent />
      <br />
      <Chip />
    </div>
  );
}

export default HomeMain;
