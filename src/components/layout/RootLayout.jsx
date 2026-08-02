import { Outlet } from "react-router-dom";

import NavBar from "../navigation/NavBar";
import Footer from "./Footer";
import useTimeTheme from "../../hooks/useTimeTheme";

// Shared page shell: fixed navbar, routed content, and footer.
function RootLayout() {
  // Re-evaluate the time-of-day theme every minute.
  useTimeTheme();

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
