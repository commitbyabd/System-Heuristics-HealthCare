import React from "react";
import Hero from "./hero/Hero";
import SharedGradient from "../home/shared-gradient/SharedGradient";
import PurposeBuilt from "./purpose-built/PurposeBuilt";

function AiMain() {
  return (
    <section>
      <SharedGradient>
        <Hero />
        <PurposeBuilt />
      </SharedGradient>
    </section>
  );
}

export default AiMain;
