const userService = require("../services/user.service");

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json({
    message: "users retrieved",
    data: {
      users,
    },
  });
};
module.exports = {
  getAllUsers,
};
