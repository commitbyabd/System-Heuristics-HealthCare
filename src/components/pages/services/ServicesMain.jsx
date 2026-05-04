import React from "react";
import Hero from "./hero/Hero";
import ModernServices from "./modern-services/ModernServices";
import ProcessNode from "./process-node/ProcessNode";
import Faq from "./faq/Faq";
import Pipeline from "../about/pipeline/Pipeline";
function ServicesMain() {
  return (
    <div>
      <Hero />
      <ModernServices />
      <ProcessNode />
      <Pipeline />
      <Faq />
    </div>
  );
}

export default ServicesMain;
