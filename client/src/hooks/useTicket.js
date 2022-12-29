import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
export const useTicket = () => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const saveTicket = async (title, description, priority, assigneeId) => {
    try {
      console.log({ title, description, priority, assigneeId });
      setIsLoading(true);
      setError(false);
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.accessToken,
        },
        body: JSON.stringify({ title, description, priority, assigneeId }),
      });

      const json = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        setError(json.message);
      }
      if (response.ok) {
        setIsLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
    } catch (err) {
      setIsLoading(false);
      setError("Please check network");
      console.log(err);
    }
  };

  const getTickets = async () => {
    try {
      setIsLoading(true);
      setError(false);
      const response = await fetch("/api/tickets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user.accessToken,
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        setError(json.message);
        return [];
      }
      if (response.ok) {
        setIsLoading(false);
        return json.data.tickets;
      }
    } catch (err) {
      setIsLoading(false);
      setError("Please check network");
      return [];
    }
  };

  return { saveTicket, getTickets, isLoading, error, success };
};
