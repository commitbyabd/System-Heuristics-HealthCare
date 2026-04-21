import ProjectRoutes from "./routes/ProjectRoutes";
import SplashCursor from "./components/ui/splash-cursor/SplashCursor";
import Nav from "./components/ui/nav/Nav";

function App() {
  return (
    <>
      <SplashCursor />
      <Nav />
      <ProjectRoutes />
    </>
  );
}

export default App;
