const BaseRepository = require("./repository");
const ticketModel = require("../models").Ticket;
class TicketRepository extends BaseRepository {
  constructor(model) {
    super(model);
    this.model = model;
  }
}

module.exports = new TicketRepository(ticketModel);
