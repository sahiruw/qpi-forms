// src/components/ProtectedRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ component: Component, allowedRoles, tag, ...rest }) => {
  const user = getCurrentUser();
  console.log()
  if (allowedRoles.includes("all")) {
    if (user?.role) {
      let x = `/${String(user.role).charAt(0)}`;
      console.log("redirecting to " + x )
      return <Navigate to={x} />;
    } else {
      return <Component />;
    }
  }
  return user && allowedRoles.includes(user.role) ? (
    <Component />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
