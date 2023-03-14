import React from "react";
import Ticket from "./Ticket";
import { FetchedTicket } from "../types/tickets";

type props = {
  tickets?: [FetchedTicket];
};

function DisplayTickets({ tickets }: props) {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="table table-zebra w-full text-sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Title</th>
            <th>Assignee</th>
            <th>Assignor</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets?.map((item, i) => (
            <Ticket key={i} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayTickets;
