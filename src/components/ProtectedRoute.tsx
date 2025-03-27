import React from "react";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { ProtectedRouteProps } from "../types/protectRoute";
import { useSelector } from "react-redux";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (allowedRoles?.length && !allowedRoles.includes(user?.role || "admin")) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default React.memo(ProtectedRoute);
