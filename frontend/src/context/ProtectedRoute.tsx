import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";
import FullPageLoader from "../components/helpers/FullScreenLoader.tsx";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <FullPageLoader />;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
