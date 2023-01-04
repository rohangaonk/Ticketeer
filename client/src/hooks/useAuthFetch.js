import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

//build query based on how server parses it
/*
type filter = {
  filter:{},
  order:"",
  limit:"",
  offset:"",
}
*/
const buildQueryParams = (url, query) => {
  const queryObj = {};
  for (let key in query) {
    if (query[key]) queryObj[key] = query[key];
  }
  return `${url}?filter=${JSON.stringify(queryObj)}`;
};

const useAuthFetch = (url, query) => {
  const { user } = useAuthContext();
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const urlWithQuery = buildQueryParams(url, query);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await fetch(urlWithQuery, {
          headers: {
            "Content-type": "application/json",
            "x-access-token": user.accessToken,
          },
        });
        const json = await res.json();
        setData(json.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    if (user) fetchData();
  }, [urlWithQuery]);

  return { data, error, loading };
};

export default useAuthFetch;
