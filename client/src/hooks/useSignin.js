import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignin = ({ successRedirect }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signin = async (email, password) => {
    try {
      setIsLoading(true);
      setError(false);
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        setError(json.message);
      }
      if (response.ok) {
        //save user in localstorage
        localStorage.setItem("user", JSON.stringify(json.data));
        //save user in context
        dispatch({ type: "LOGIN", payload: json.data });

        setIsLoading(false);
        navigate(successRedirect, { state: { message: "Signin Successful" } });
      }
    } catch (err) {
      setIsLoading(false);
      setError("Please check network");
    }
  };

  return { signin, isLoading, error };
};
