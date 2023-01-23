const BaseRepository = require("./repository");
const { Ticket } = require("../models");
class tokenRepository extends BaseRepository {
  constructor(model) {
    super(model);
    this.model = model;
  }
}

module.exports = new tokenRepository(Ticket);
