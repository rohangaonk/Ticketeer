const BaseRepository = require("./repository");
const tokenModel = require("../models").Token;
class tokenRepository extends BaseRepository {
  constructor(model) {
    super(model);
    this.model = model;
  }
}

module.exports = new tokenRepository(tokenModel);
