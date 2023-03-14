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
  const { title, description, assigneeId, priority } = req.body;
  const assignorId = req.userId;
  const ticketId = req.params.ticketId;
  const updatedTicket = await ticketService.updateTicket(
    {
      title,
      description,
      assigneeId,
      priority,
      assignorId,
      status: "open",
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
  const { filter, modifier, search } = req.query.filter;
  let result;

  console.log("*******", search);
  //if query param has search query dont apply any filter,
  //filter result only based on search text
  if (!search) result = await ticketService.getAllTickets(filter, modifier);
  else result = await ticketService.getTicketsBySearch(search);
  res.status(200).json({
    message: "tickets retrieved",
    data: {
      count: result.count,
      tickets: result.items,
    },
  });
};

const getTicketCount = async (req, res) => {
  const { filter } = req.query.filter;
  const count = await ticketService.getTicketCount(filter);
  res.status(200).json({
    message: "count retrieved",
    data: {
      count,
    },
  });
};

const toggleTicketStatus = async (req, res) => {
  //get previous status for this ticket
  const ticketId = req.params.ticketId;
  const ticket = await ticketService.getTicket(ticketId);
  const newStatus = ticket.status === "open" ? "closed" : "open";

  //update ticket
  const updatedTicket = await ticketService.updateTicket(
    {
      status: newStatus,
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

module.exports = {
  getTicket,
  getAllTickets,
  createTicket,
  updateTicket,
  deleteTicket,
  getTicketByUser,
  getTicketCount,
  toggleTicketStatus,
};
