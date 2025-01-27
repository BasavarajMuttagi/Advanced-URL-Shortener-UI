import { createBrowserRouter } from "react-router-dom";
import AuthCallback from "../components/AuthCallback";
import Dashboard from "../pages/Dashboard";
import LandingPage from "../pages/LandingPage";
import NotFound from "../pages/NotFound";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/callback",
    element: <AuthCallback />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default routes;
