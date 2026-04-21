import ProjectRoutes from "./routes/ProjectRoutes";
import SplashCursor from "./components/ui/splash-cursor/SplashCursor";
import Nav from "./components/ui/nav/Nav";
import Footer from "./components/ui/footer/Footer";

function App() {
  return (
    <>
      <SplashCursor />
      <Nav />
      <ProjectRoutes />
      <Footer />
    </>
  );
}

export default App;
