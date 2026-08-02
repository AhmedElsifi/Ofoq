import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Questions from "./pages/Questions";
import Report from "./pages/Report";
import Analysis from "./pages/Analysis";
import Protocol from "./pages/Protocol";
import Privacy from "./pages/Privacy";
import About from "./pages/About";

// Application route table; RootLayout wraps every page.
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/protocol", element: <Protocol /> },
      { path: "/questions", element: <Questions /> },
      { path: "/questions/:phase", element: <Questions /> },
      { path: "/report", element: <Report /> },
      { path: "/analysis", element: <Analysis /> },
      { path: "/about", element: <About /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

// Root component that renders the configured router.
function App() {
  return <RouterProvider router={router} />;
}

export default App;
