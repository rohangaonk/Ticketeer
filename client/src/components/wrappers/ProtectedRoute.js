import React from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuthContext();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
