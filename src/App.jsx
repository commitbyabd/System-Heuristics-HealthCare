import { ReactLenis } from "lenis/react";
import ProjectRoutes from "./routes/ProjectRoutes";
import SplashCursor from "./components/ui/splash-cursor/SplashCursor";
import LenisScrollSync from "./utils/gsap/LenisScrollSync";
import IconProvider from "./components/ui/icon/IconProvider";

function App() {
  return (
    <IconProvider>
      <ReactLenis root>
        <LenisScrollSync />
        <SplashCursor />
        <ProjectRoutes />
      </ReactLenis>
    </IconProvider>
  );
}

export default App;
