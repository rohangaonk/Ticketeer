import React from "react";
import { Routes, Route } from "react-router-dom";
import Tickets from "./Tickets";
import CreateTicket from "./CreateTicket";
import Sidebar from "./Sidebar";
import TicketDetails from "./TicketDetails";
import EditTicket from "./EditTicket";

function Home() {
  return (
    <div className="flex mt-20 space-x-2">
      <div className="hidden z-20 w-56 h-screen top-0 sm:block">
        <Sidebar />
      </div>
      <div className="w-full">
        <Routes>
          <Route path="tickets" element={<Tickets />} />
          <Route path="create-ticket" element={<CreateTicket />} />
          <Route path="edit-ticket" element={<EditTicket />} />
          <Route path="tickets/:id" element={<TicketDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
