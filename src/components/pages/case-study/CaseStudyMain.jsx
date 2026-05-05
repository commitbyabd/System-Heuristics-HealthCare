import React from "react";
import Hero from "./hero/Hero";
import Building from "./building/Building";
import CaseStudies from "../home/case-studies/CaseStudies";
import Impact from "./impact/Impact";
import Faq from "./../services/faq/Faq";

function CaseStudyMain() {
  return (
    <div>
      <Hero />
      <Building />
      <CaseStudies />
      <Impact />
      <Faq />
    </div>
  );
}

export default CaseStudyMain;
