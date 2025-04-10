import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";
import { ProtectedRouteProps } from "../types/protectRoute";
import { useSelector } from "react-redux";
import NotFound from "./NotFound";
import Unauthorized from "./Unauthorized";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // If not logged in, show NotFound with login button
  if (!isLoggedIn) {
    return <NotFound />;
  }

  // If logged in but not authorized, show Unauthorized component
  if (allowedRoles?.length && (!user?.role || !allowedRoles.includes(user.role))) {
    return <Unauthorized />;
  }

  // If logged in and authorized, show the protected content
  return children;
};

export default React.memo(ProtectedRoute);
