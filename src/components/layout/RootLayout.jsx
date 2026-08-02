import { Outlet } from "react-router-dom";

import NavBar from "../UI/NavBar";
import Footer from "../UI/Footer";

// Shared page shell: fixed navbar, routed content, and footer.
function RootLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
