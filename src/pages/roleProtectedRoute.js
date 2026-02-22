import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const isAuth = localStorage.getItem("isAuthenticated") === "true";

  const userData = localStorage.getItem("user");
  const userRole = userData ? JSON.parse(userData).role : null;

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
