const tokenRepository = require("../repository/token.repository");

const saveRefreshToken = async ({ token, expireAt, userId }) => {
  return await tokenRepository.create({ token, userId, expireAt });
};

const getRefreshToken = async (token) => {
  return await tokenRepository.findOne({ token: token });
};

module.exports = {
  getRefreshToken,
  saveRefreshToken,
};
