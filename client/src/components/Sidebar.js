import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "./ui-components/Logo";
import { useAuthContext } from "../hooks/useAuthContext";
import Developer from "./Developer";

function Sidebar() {
  const { user } = useAuthContext();
  return (
    <div className="bg-base-300 py-2 h-full w-full space-y-6">
      <div className="flex items-center space-x-2 py-4 px-6  ">
        <Logo />
      </div>
      {user ? <Developer /> : <></>}

      <ul className="menu w-56 px-2">
        <li>
          <Link to="/auth/tickets">
            <FontAwesomeIcon icon={faTicket} size="lg" />
            <span className="text-sm">Tickets</span>
          </Link>
        </li>
        <li>
          <span>
            <FontAwesomeIcon icon={faPeopleGroup} size="lg" />
            <span className="text-sm">Team</span>
          </span>
        </li>
        <li>
          <Link to="/auth/create-ticket">
            <FontAwesomeIcon icon={faCirclePlus} size="lg" />
            <span className="text-sm">Create</span>
          </Link>
        </li>
        <li>
          <span>
            <FontAwesomeIcon icon={faClockRotateLeft} size="lg" />
            <span className="text-sm">History</span>
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
