import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Public() {
  const { decodedToken, isExpired } = useAuth();

  if (decodedToken && !isExpired) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default Public;
