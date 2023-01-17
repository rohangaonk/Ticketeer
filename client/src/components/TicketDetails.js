import React, { useState } from "react";
import dayjs from "dayjs";
import { useParams, useNavigate } from "react-router-dom";
import { useDeleteTicket, useGetTicket } from "../hooks/useTickets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

const modalTypes = {
  EDIT: "EDIT",
  STATUS: "STATUS",
  DELETE: "DELETE",
};

function TicketDetails() {
  //same modal reused for both actions (edit and status update)
  const [modal, setModal] = useState({ open: false, type: "" });
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    mutate: deleteTicket,
    isError: isDeleteError,
    isLoading: isDeleteLoading,
    error: deleteError,
  } = useDeleteTicket();
  const {
    data: { ticket } = {},
    isError: isGetError,
    isLoading: isGetLoading,
    error: getError,
  } = useGetTicket(id);

  const handleModalClose = () => {
    setModal({ open: false, type: "" });
  };

  const handleEditModal = () => {
    //if ticket is in closed state we show modal
    //else direct redirect to edit page
    if (ticket.status === "closed") {
      setModal({ open: true, type: modalTypes.EDIT });
    } else handleEditTicket();
  };

  const handleEditTicket = () => {
    navigate("/auth/edit-ticket", {
      state: {
        fields: {
          id: ticket.id,
          title: ticket.title,
          description: ticket.description,
          priority: ticket.priority,
          assignee: ticket.assignee.id,
        },
      },
    });
  };

  const handleDelete = async () => {
    deleteTicket(id, {
      onSuccess: () => {
        navigate("/auth/tickets");
      },
    });
  };

  if (isGetError || isDeleteError)
    return <div>{getError.message || deleteError.message}</div>;

  if (isGetLoading || isDeleteLoading) return <div>Loading...</div>;

  return ticket ? (
    <div className="sm:w-1/2 w-11/12 p-4 mx-auto mt-8 border rounded border-gray-500">
      <div className="_header flex">
        <h2 className="font-bold text-xl mb-2 w-4/6 text-primary dark:text-secondary">
          {ticket.title}
        </h2>
        <div className="text-sm w-2/6 flex justify-end">
          <span className="mr-1">{dayjs().format("DD-MM-YYYY hh:mm a")}</span>
          <span className="btn btn-xs btn-ghost">
            <FontAwesomeIcon
              icon={faTrash}
              className="text-red-500 cursor-pointer"
              size="lg"
              onClick={() => setModal({ open: true, type: modalTypes.DELETE })}
            />
          </span>
        </div>
      </div>

      <p className="mt-4">{ticket.description}</p>
      <div className="sm:flex sm:space-x-6  mt-6">
        <div className="flex items-center space-x-2 mt-2">
          <div className="h-8 w-8 bg-primary flex justify-center items-center rounded-full text-primary-content uppercase">
            <span>{ticket.assignee.name[0]}</span>
          </div>
          <div className="text-sm">
            <p>{ticket.assignee.email}</p>
            <p>Assignee</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <div className="h-8 w-8 bg-secondary flex justify-center items-center rounded-full text-primary-content uppercase">
            <span>{ticket.assignor.name[0]}</span>
          </div>
          <div className="text-sm">
            <p>{ticket.assignor.email}</p>
            <p>Assignor</p>
          </div>
        </div>
      </div>
      <div className="_footer mt-4 flex justify-between ">
        <div className="_badges flex space-x-4">
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
        <div className="_action_buttons flex space-x-2">
          <button
            className="btn btn-xs btn-outline btn-secondary"
            onClick={handleEditModal}
          >
            Edit
          </button>
          <button
            className="btn btn-xs btn-accent"
            onClick={() => setModal({ open: true, type: modalTypes.STATUS })}
          >
            {ticket.status === "open" ? "Resolve" : "Open"}
          </button>
        </div>
      </div>
      {modal.open && modal.type === modalTypes.EDIT && (
        <Modal>
          <div className="text-black">
            <h1 className="font-bold">Are you sure?</h1>
            <p className="text-sm font-medium mt-1">
              Ticket is in closed state. If you continue this ticket will be
              auto-updated to open state. Do you want to continue?
            </p>
          </div>
          <div className="mt-8  flex justify-center space-x-4 ">
            <button
              className="btn btn-xs btn-warning"
              onClick={handleModalClose}
            >
              Cancel
            </button>
            <button
              className="btn btn-xs btn-secondary"
              onClick={handleEditTicket}
            >
              Continue
            </button>
          </div>
        </Modal>
      )}
      {modal.open && modal.type === modalTypes.STATUS && (
        <Modal>
          <div className="text-black">
            <h1 className="font-bold">Are you sure?</h1>
            <p className="text-sm font-medium mt-1">
              {`this action will ${
                ticket.status === "open" ? "close" : "re-open"
              } the ticket`}
            </p>
          </div>
          <div className="mt-8  flex justify-center space-x-4 ">
            <button
              className="btn btn-xs btn-warning"
              onClick={handleModalClose}
            >
              Cancel
            </button>
            <button className="btn btn-xs btn-secondary">Continue</button>
          </div>
        </Modal>
      )}
      {modal.open && modal.type === modalTypes.DELETE && (
        <Modal>
          <div className="text-black">
            <h1 className="font-bold">Are you sure?</h1>
            <p className="text-sm font-medium mt-1">
              This will delete current ticket
            </p>
          </div>
          <div className="mt-8  flex justify-center space-x-4 ">
            <button
              className="btn btn-xs btn-warning"
              onClick={handleModalClose}
            >
              Cancel
            </button>
            <button className="btn btn-xs btn-secondary" onClick={handleDelete}>
              Continue
            </button>
          </div>
        </Modal>
      )}
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
