const BaseRepository = require("./repository");
const userModel = require("../models").User;

class UserRepository extends BaseRepository {
  constructor(model) {
    super(model);
    this.model = model;
  }
}

module.exports = new UserRepository(userModel);
