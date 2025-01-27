import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Private = () => {
  const { decodedToken, isExpired } = useAuth();

  if (!decodedToken || isExpired) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default Private;
