// ProjectRoutes.jsx
// Defines all application routes. Routes nested under RootLayout share the
// Nav + Footer chrome via <Outlet />. Pages that need a different shell can
// be added under their own layout route in the future (e.g. AuthLayout).

import { Routes, Route } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Solutions from "../pages/solutions/Solutions";
import Services from "../pages/services/Services";
import Ai from "../pages/Ai/Ai";
import CaseStudy from "../pages/case-study/CaseStudy";
function ProjectRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/services" element={<Services />} />
        <Route path="/ai" element={<Ai />} />
        <Route path="/case-study" element={<CaseStudy />} />
      </Route>
    </Routes>
  );
}

export default ProjectRoutes;
