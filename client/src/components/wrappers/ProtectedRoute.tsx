import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

//children typed as jsx element Reactnode not compatible
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuthContext();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
