const BaseRepository = require("./repository");
const { User } = require("../models");

class UserRepository extends BaseRepository {
  constructor(model) {
    super(model);
    this.model = model;
  }
}

module.exports = new UserRepository(User);
