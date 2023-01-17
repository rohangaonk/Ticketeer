import axios from "../utils/axiosCustom";
import { useQuery } from "react-query";
import { useAuthContext } from "./useAuthContext";
import { removeNullKeys } from "../utils/helpers";

export const useGetUsers = (query) => {
  const { user } = useAuthContext();
  return useQuery(["users", query, user], fetchUsers);
};

//has access to useQuery first argument
const fetchUsers = async ({ queryKey }) => {
  const [, query, user] = queryKey;
  const queryObj = removeNullKeys(query);
  const res = await axios.get("/api/users", {
    params: queryObj,
  });
  return res.data.data;
};
