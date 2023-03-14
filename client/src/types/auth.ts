import { Dispatch } from "react";

export type AuthUser = {
  username: string;
  accessToken: string;
};

export type AuthState = AuthUser | null;

export type AuthAction = {
  type: "LOGIN" | "LOGOUT";
  payload: AuthState;
};

export type UserContext = {
  user: AuthUser | null;
  dispatch: Dispatch<AuthAction>;
};
