import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../components/LandingPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
]);
export default routes;
