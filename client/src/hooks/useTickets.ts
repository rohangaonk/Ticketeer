import axios from "../utils/axiosCustom";
import {
  useQuery,
  useMutation,
  QueryFunctionContext,
  useQueryClient,
} from "react-query";
import {
  FilterQuery,
  FetchTicketsResponse,
  TicketBody,
  FetchedTicket,
  FetchedTicketResponse,
} from "../types/tickets";
import { removeNullKeys } from "../utils/helpers";

export const useGetTickets = (query: FilterQuery) => {
  return useQuery<
    FetchTicketsResponse,
    Error,
    FetchTicketsResponse,
    [string, FilterQuery]
  >(["GET_TICKETS", query], fetchTickets);
};

export const useGetTicket = (id: string) => {
  return useQuery<FetchedTicketResponse, Error>(
    ["GET_TICKET", id],
    fetchTicket
  );
};
export const useCreateTicket = () => {
  return useMutation<any, Error, TicketBody>(["CREATE_TICKET"], (data) =>
    createTicket(data)
  );
};

export const useEditTicket = (id: string) => {
  return useMutation<any, Error, TicketBody>(
    ["EDIT_TICKET"],
    (data: TicketBody) => editTicket(data, id)
  );
};

export const useDeleteTicket = () => {
  return useMutation<any, Error, string>(["DELETE_TICKET"], (id: string) =>
    deleteTicket(id)
  );
};

export const useToggleStatus = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>(
    ["EDIT_STATUS"],
    () => toggleStatus(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["GET_TICKET", id]); //refetch ticket upon mutation
      },
    }
  );
};

const fetchTickets = async ({
  queryKey,
}: QueryFunctionContext<[string, FilterQuery]>) => {
  const [, query] = queryKey;
  const queryObj = removeNullKeys(query);

  const res = await axios.get("/api/tickets", {
    params: queryObj,
  });

  return res.data.data;
};

const fetchTicket = async ({ queryKey }: any) => {
  const [, id] = queryKey;
  const res = await axios.get(`/api/tickets/${id}`);
  return res.data.data;
};

const createTicket = async (data: TicketBody): Promise<any> => {
  const res = await axios.post("/api/tickets", data);
  return res.data.data;
};

const editTicket = async (data: TicketBody, id: string): Promise<any> => {
  const res = await axios.post(`/api/tickets/${id}`, data);
  return res.data.data;
};

const deleteTicket = async (id: string) => {
  const res = await axios.delete(`/api/tickets/${id}`);
  return res.data.data;
};

//The general consensus is that a dash is seen by google as a space,
//when an underscore and camel-case are not.
const toggleStatus = async (id: string) => {
  const res = await axios.post(`/api/tickets/${id}/toggle-status`);
  return res.data.data;
};
