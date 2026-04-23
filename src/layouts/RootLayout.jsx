import { Outlet } from "react-router-dom";
import Nav from "../components/ui/nav/Nav";
import Footer from "../components/ui/footer/Footer";

function RootLayout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
