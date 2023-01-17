import axios from "../utils/axiosCustom";
import { useQuery, useMutation } from "react-query";
import { removeNullKeys } from "../utils/helpers";

export const useGetTickets = (query) => {
  return useQuery(["GET_TICKETS", query], fetchTickets);
};

export const useGetTicket = (id) => {
  return useQuery(["GET_TICKET", id], fetchTicket);
};

export const useCreateTicket = () => {
  return useMutation(["CREATE_TICKET"], (data) => createTicket(data));
};

export const useEditTicket = (id) => {
  return useMutation(["EDIT_TICKET"], (data) => editTicket(data, id));
};

export const useDeleteTicket = () => {
  return useMutation(["DELETE_TICKET"], (id) => deleteTicket(id));
};

const fetchTickets = async ({ queryKey }) => {
  const [, query] = queryKey;
  const queryObj = removeNullKeys(query);
  const res = await axios.get("/api/tickets", {
    params: queryObj,
  });

  return res.data.data;
};

const fetchTicket = async ({ queryKey }) => {
  const [, id] = queryKey;
  const res = await axios.get(`/api/tickets/${id}`);
  return res.data.data;
};

const createTicket = async (data) => {
  const res = await axios.post("/api/tickets", data);
  return res.data;
};

const editTicket = async (data, id) => {
  const res = await axios.post(`/api/tickets/${id}`, data);
  return res.data;
};

const deleteTicket = async (id) => {
  const res = await axios.delete(`/api/tickets/${id}`);
  return res.data;
};
