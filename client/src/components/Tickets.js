import React, { useEffect, useState } from "react";

import Ticket from "./Ticket";
import Filter from "./Filter";
import { useGetTickets } from "../hooks/useTickets";
import SearchTicket from "./SearchTicket";
import DisplayTickets from "./DisplayTickets";

function Tickets() {
  const [isOldest, setIsOldest] = useState(true);
  const [filter, setFilter] = useState({});
  const [search, setSearch] = useState("");
  const {
    data: ticketData,
    isError,
    error,
    isLoading,
  } = useGetTickets({
    order: isOldest ? "DATE_DESC" : "DATE_ASC",
    filter,
  });
  console.log(filter);
  return (
    <div className="sm:p-6 p-4">
      <div className="flex justify-between items-center ">
        <div>
          <span className="font-semibold">{ticketData?.count || 0}</span>
          Tickets
        </div>

        <div className="flex space-x-4 sm:space-x-8 items-center">
          <SearchTicket
            setFilter={setFilter}
            search={search}
            setSearch={setSearch}
          />
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
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>{error.message}</p>
      ) : (
        <DisplayTickets ticketData={ticketData} />
      )}
    </div>
  );
}

export default Tickets;
