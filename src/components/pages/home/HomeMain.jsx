import SharedGradient from "./shared-gradient/SharedGradient";
import Hero from "./hero/Hero";
import Compliance from "./compliance/Compliance";

function HomeMain() {
  return (
    <div>
      <SharedGradient>
        <Hero />
        <Compliance />
      </SharedGradient>
    </div>
  );
}

export default HomeMain;
