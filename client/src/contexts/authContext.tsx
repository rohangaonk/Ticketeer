import { isExpired } from "react-jwt";
import { createContext, useReducer, ReactNode, Dispatch } from "react";
import { AuthAction, AuthState, AuthUser, UserContext } from "../types/auth";

export type AuthProviderProps = {
  children: ReactNode;
};

const initialiseUser = (): AuthState => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!user) return null;
  if (isExpired(user.accessToken)) return null;
  return user;
};

export const AuthContext = createContext<UserContext | undefined>(undefined); //react doc https://reactjs.org/docs/context.html#reactcreatecontext

export const authReducer = (state: { user: AuthState }, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: initialiseUser(),
  });
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
