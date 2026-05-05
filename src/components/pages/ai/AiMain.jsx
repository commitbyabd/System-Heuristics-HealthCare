import React from "react";
import Hero from "./hero/Hero";
import SharedGradient from "../home/shared-gradient/SharedGradient";
import PurposeBuilt from "./purpose-built/PurposeBuilt";
import Capabilities from "./capabilities/Capabilities";
import AiImpact from "./impact/AiImpact";

function AiMain() {
  return (
    <section>
      <SharedGradient>
        <Hero />
        <PurposeBuilt />
      </SharedGradient>
      <Capabilities />
      <AiImpact />
    </section>
  );
}

export default AiMain;
