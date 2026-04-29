import { ReactLenis } from "lenis/react";
import ProjectRoutes from "./routes/ProjectRoutes";
import SplashCursor from "./components/ui/splash-cursor/SplashCursor";
import LenisScrollSync from "./utils/gsap/LenisScrollSync";

function App() {
  return (
    <ReactLenis root>
      <LenisScrollSync />
      <SplashCursor />
      <ProjectRoutes />
    </ReactLenis>
  );
}

export default App;
