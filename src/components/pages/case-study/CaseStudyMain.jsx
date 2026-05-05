import React from "react";
import Hero from "./hero/Hero";
import Building from "./building/Building";
import CaseStudies from "../home/case-studies/CaseStudies";

function CaseStudyMain() {
  return (
    <div>
      <Hero />
      <Building />
      <CaseStudies />
    </div>
  );
}

export default CaseStudyMain;
