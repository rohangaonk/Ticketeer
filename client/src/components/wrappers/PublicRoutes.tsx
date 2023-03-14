import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

function PublicRoutes({ children }: { children: JSX.Element }) {
  const { user } = useAuthContext();
  if (user) {
    // user is not authenticated
    return <Navigate to="/auth/tickets" />;
  }
  return children;
}

export default PublicRoutes;
