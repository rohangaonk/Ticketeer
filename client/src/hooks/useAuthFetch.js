import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

const useAuthFetch = (url, options) => {
  const { user } = useAuthContext();
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await fetch(url, {
          headers: {
            "Content-type": "application/json",
            "x-access-token": user.accessToken,
          },
        });
        const json = await res.json();
        setData(json.data);
      } catch (error) {
        setError(error.message);
      }
    };
    if (user) fetchData();
  }, []);

  return { data, error, loading };
};

export default useAuthFetch;
