import SharedGradient from "./shared-gradient/SharedGradient";
import Hero from "./hero/Hero";
import Compliance from "./compliance/Compliance";
import OutdatedSystems from "./Outdated-systems/OutdatedSystems";
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
      </SharedGradient>
    </div>
  );
}

export default HomeMain;
