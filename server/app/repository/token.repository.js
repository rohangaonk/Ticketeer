const BaseRepository = require("./repository");
const { Token } = require("../models");
class tokenRepository extends BaseRepository {
  constructor(model) {
    super(model);
    this.model = model;
  }
}

module.exports = new tokenRepository(Token);
