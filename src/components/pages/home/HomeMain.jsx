import SharedGradient from "./shared-gradient/SharedGradient";
import Hero from "./hero/Hero";
import Compliance from "./compliance/Compliance";
import Container from "../../ui/container/Container";

function HomeMain() {
  return (
    <div>
      <SharedGradient>
        <Container>
          <Hero />
          <Compliance />
        </Container>
      </SharedGradient>
    </div>
  );
}

export default HomeMain;
