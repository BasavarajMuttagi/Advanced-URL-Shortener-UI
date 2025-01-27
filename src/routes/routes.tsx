import { createBrowserRouter } from "react-router-dom";
import AuthCallback from "../components/AuthCallback";
import Dashboard from "../pages/Dashboard";
import LandingPage from "../pages/LandingPage";
import NotFound from "../pages/NotFound";
import Private from "./Private";
import Public from "./Public";

const routes = createBrowserRouter([
  {
    element: <Public />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/callback",
        element: <AuthCallback />,
      },
    ],
  },
  {
    element: <Private />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
export default routes;
