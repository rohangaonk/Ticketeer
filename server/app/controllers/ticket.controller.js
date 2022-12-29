const ticketService = require("../services/ticket.service");

const createTicket = async (req, res) => {
  const { title, description, assigneeId, priority } = req.body;
  const assignorId = req.userId;

  console.log;

  const savedTicket = await ticketService.createTicket({
    title,
    description,
    assigneeId,
    status: "open",
    priority,
    assignorId,
  });
  res.status(200).json({
    message: "ticket created",
    data: {
      ticket: savedTicket,
    },
  });
};
const updateTicket = async (req, res) => {
  const { title, description, assigneeId, status, priority } = req.body;
  const assignorId = req.userId;
  const ticketId = req.params.ticketId;
  const updatedTicket = await ticketService.updateTicket(
    {
      title,
      description,
      assigneeId,
      status,
      priority,
      assignorId,
    },
    ticketId
  );
  res.status(200).json({
    message: "ticket updated",
    data: {
      ticket: updatedTicket,
    },
  });
};
const getTicket = async (req, res) => {
  const ticketId = req.params.ticketId;
  const ticket = await ticketService.getTicket(ticketId);
  res.status(200).json({
    message: "ticket retrived",
    data: {
      ticket,
    },
  });
};
const deleteTicket = async (req, res) => {
  const ticketId = req.params.ticketId;
  console.log(ticketId);
  await ticketService.deleteTicket(ticketId);
  res.status(200).json({
    message: "ticket saved",
    data: {},
  });
};

const getTicketByUser = async (req, res) => {
  const userId = req.userId;
  const tickets = await ticketService.getTicketsByUser(userId);
  res.status(200).json({
    message: "ticket retrieved",
    data: {
      tickets,
    },
  });
};

const getAllTickets = async (req, res) => {
  const { filter, modifier } = req.query.filter;
  const tickets = await ticketService.getAllTickets(filter, modifier);
  res.status(200).json({
    message: "tickets retrieved",
    data: {
      tickets,
    },
  });
};
module.exports = {
  getTicket,
  getAllTickets,
  createTicket,
  updateTicket,
  deleteTicket,
  getTicketByUser,
};
