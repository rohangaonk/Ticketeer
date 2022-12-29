import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    dispatch({ type: "LOGOUT", payload: null });
    //clear local storage
    localStorage.removeItem("user");
    //clear cookie
  };

  return { logout };
};
