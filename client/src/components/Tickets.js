import React, { useEffect, useState } from "react";

import Ticket from "./Ticket";
import Filter from "./Filter";
import useAuthFetch from "../hooks/useAuthFetch";
import { Link } from "react-router-dom";

function Tickets() {
  const [isOldest, setIsOldest] = useState(true);
  const [filter, setFilter] = useState({});
  console.log(filter);
  const {
    data: ticketData,
    loading,
    error,
  } = useAuthFetch("/api/tickets", {
    order: isOldest ? "DATE_DESC" : "DATE_ASC",
    filter,
  });

  return (
    <div className="sm:py-6 sm:px-8 p-4">
      <div className="flex justify-between items-center ">
        <div>
          <span className="font-semibold">145</span> Tickets
        </div>

        <div className="flex space-x-4 sm:space-x-8 items-center">
          <div className="_sortBy tabs">
            <a
              className={`tab  tab-bordered  ${isOldest ? "tab-active" : ""}`}
              onClick={() => setIsOldest(true)}
            >
              Oldest
            </a>
            <a
              className={`tab tab-bordered ${isOldest ? "" : "tab-active"}`}
              onClick={() => setIsOldest(false)}
            >
              Latest
            </a>
          </div>
          <Filter setFilter={setFilter} />
        </div>
      </div>
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
            {ticketData?.tickets?.map((item, i) => (
              <Ticket key={i} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tickets;
