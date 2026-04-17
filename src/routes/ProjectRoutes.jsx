// ProjectRoutes.jsx
// Defines all application routes and handles maintenance mode

import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
function ProjectRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default ProjectRoutes;
