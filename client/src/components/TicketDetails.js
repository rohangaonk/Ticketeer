import React from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import useAuthFetch from "../hooks/useAuthFetch";
function TicketDetails() {
  const { id } = useParams();
  const {
    data: { ticket } = {},
    loading,
    error,
  } = useAuthFetch(`/api/tickets/${id}`);
  console.log(ticket);

  if (error) return <div>{error.message}</div>;

  if (loading) return <div>Loading...</div>;

  return ticket ? (
    <div className="sm:w-1/2 w-3/4 p-4 mx-auto mt-8 bg-base-200 border rounded border-gray-400">
      <div className="_header flex">
        <h2 className="font-bold text-xl mb-2 w-4/6">{ticket.title}</h2>
        <div className="text-sm w-2/6 flex justify-end">
          <span>{dayjs().format("DD-MMM-YYYY hh:mm a")}</span>
        </div>
      </div>

      <p>{ticket.description}</p>
      <div className="sm:flex sm:space-x-6 items-center mt-6">
        <div className="flex items-center space-x-2 mt-2">
          <div className="h-8 w-8 bg-primary flex justify-center items-center rounded-full text-primary-content uppercase">
            <span>{ticket.assignee.name[0]}</span>
          </div>
          <div>
            <p className="text-sm">{ticket.assignee.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <div className="h-8 w-8 bg-secondary flex justify-center items-center rounded-full text-primary-content uppercase">
            <span>{ticket.assignor.name[0]}</span>
          </div>
          <div>
            <p className="text-sm">{ticket.assignor.email}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex space-x-4">
        <div
          className={`w-16 text-xs badge ${
            ticket.priority === "high"
              ? "badge-error"
              : ticket.priority === "medium"
              ? "badge-warning"
              : "badge-info"
          }`}
        >
          {ticket.priority}
        </div>
        <div
          className={`w-16 text-xs badge ${
            ticket.status === "open" ? "badge-warning" : "badge-success"
          }`}
        >
          {ticket.status}
        </div>
      </div>
    </div>
  ) : (
    <div>No Ticket to show</div>
  );
}

export default TicketDetails;

{
  /* <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"></div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">
            Can coffee make you a better developer?
          </div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-900 leading-none">Jonathan Reinink</p>
            <p className="text-gray-600">Aug 18</p>
          </div>
        </div>
      </div>
    </div> */
}
