import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";

const ProtectedRoute = () => {
  const { auth } = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;