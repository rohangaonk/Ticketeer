import React from "react";
import { Routes, Route } from "react-router-dom";
import Tickets from "./Tickets";
import CreateTicket from "./CreateTicket";
import Sidebar from "./Sidebar";
import TicketDetails from "./TicketDetails";

function Home() {
  return (
    <div>
      <div className="hidden fixed z-20 w-56 h-screen top-0 sm:block">
        <Sidebar />
      </div>
      <Routes>
        <Route
          path="tickets"
          element={
            <div className="sm:ml-56 pt-20">
              <Tickets />
            </div>
          }
        />
        <Route
          path="create-ticket"
          element={
            <div className="sm:ml-56 pt-20">
              <CreateTicket />
            </div>
          }
        />
        <Route
          path="tickets/:id"
          element={
            <div className="sm:ml-56 pt-20">
              <TicketDetails />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default Home;
