const userRepository = require("../repository/user.repository");

const getAllUsers = async () => {
  return userRepository.findAll(null, { attributes: ["name", "email", "id"] });
};

module.exports = {
  getAllUsers,
};
