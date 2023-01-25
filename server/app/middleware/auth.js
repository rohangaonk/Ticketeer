const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
const ApiError = require("../helpers/error.helper");

const authorize = (req, res, next) => {
  try {
    console.log("authorized");
    const token = req.headers["x-access-token"];
    if (!token) throw new ApiError("No token provided", 400);
    const decodedToken = jwt.verify(token, authConfig.secret);
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authorize,
};
