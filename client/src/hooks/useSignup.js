import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const useSignup = ({ successRedirect }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const signup = async (name, email, password) => {
    try {
      setIsLoading(true);
      setError(false);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        setError(json.message);
      }
      if (response.ok) {
        setIsLoading(false);
        navigate(successRedirect, { state: { message: "Signup Successful" } });
      }
    } catch (err) {
      setIsLoading(false);
      setError("Please check network");
      console.log(err);
    }
  };

  return { signup, isLoading, error };
};
