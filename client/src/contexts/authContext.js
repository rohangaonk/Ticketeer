import { isExpired } from "react-jwt";
import { createContext, useReducer } from "react";

const initialiseUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return null;
  if (isExpired(user.accessToken)) return null;
  return user;
};

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: initialiseUser(),
  });
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
