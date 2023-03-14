import axios from "../utils/axiosCustom";
import { useQuery } from "react-query";
import { removeNullKeys } from "../utils/helpers";
import { FetchedUsersResponse } from "../types/users";

export const useGetUsers = (query?: String) => {
  return useQuery<FetchedUsersResponse, Error>(["users", query], fetchUsers);
};

//has access to useQuery first argument
const fetchUsers = async ({ queryKey }: any) => {
  const [, query] = queryKey;
  const queryObj = removeNullKeys(query);
  const res = await axios.get("/api/users", {
    params: queryObj,
  });
  return res.data.data;
};
