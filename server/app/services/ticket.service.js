const ticketRepository = require("../repository/ticket.repository");

const getTicketsByUser = async (userId) => {
  return ticketRepository.findOne({ assigneeId: userId });
};

const getTicket = async (ticketId) => {
  return ticketRepository.findByPk(ticketId);
};

const createTicket = async (ticket) => {
  return ticketRepository.create(ticket);
};

const updateTicket = async (ticket, ticketId) => {
  return ticketRepository.update(ticket, { id: ticketId });
};

const deleteTicket = async (ticketId) => {
  return ticketRepository.destroy({ id: ticketId });
};

const getAllTickets = async (filter, modifier) => {
  return ticketRepository.findAll(filter, modifier);
};

module.exports = {
  getTicketsByUser,
  getTicket,
  getAllTickets,
  createTicket,
  updateTicket,
  deleteTicket,
};
