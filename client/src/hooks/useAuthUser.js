import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosCustom";
import { useAuthContext } from "./useAuthContext";

export const useSignin = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  return useMutation(["SIGNIN"], doSignin, {
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      navigate("/auth/tickets", { state: { message: "Signin Sucessful" } });
    },
  });
};
export const useSignup = () => {
  const navigate = useNavigate();
  return useMutation(["SIGNUP"], doSignup, {
    onSuccess: () => {
      navigate("/signin", { state: { message: "Signup Successful" } });
    },
  });
};

export const useSignout = () => {
  const { dispatch } = useAuthContext();
  return useMutation(["SIGNOUT"], doSignout, {
    onSuccess: () => {
      dispatch({ type: "LOGOUT", payload: null });
      //clear local storage
      localStorage.removeItem("user");
      //clear cookie
    },
  });
};

const doSignin = async (data) => {
  const res = await axios.post("/api/auth/signin", data);
  return res.data.data;
};
const doSignup = async (data) => {
  const res = await axios.post("/api/auth/signup", data);
  return res.data.data;
};
const doSignout = async (data) => {
  return null;
};
