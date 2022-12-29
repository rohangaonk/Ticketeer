const authService = require("../services/auth.service");
const authConfig = require("../config/auth.config");
const ApiError = require("../helpers/error.helper");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const savedUser = await authService.signup({ name, email, password });
  res.status(200).json({
    message: "Signup success",
    data: savedUser,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.signin({ email, password });
  const refreshToken = user.refreshToken;

  //save refreshToken in httpOnly cookie
  res.cookie("refresh_token", refreshToken, {
    maxAge: authConfig.refresh_token_cookie_ms,
    // httpOnly:true
  });

  res.status(200).json({
    message: "Signin success",
    data: {
      username: user.user.email,
      accessToken: user.accessToken,
    },
  });
};

const getNewAccessToken = async (req, res) => {
  const refreshToken = req.cookies["refresh_token"];
  if (!refreshToken) throw new ApiError("refresh token missing", 400);
  const accessToken = await authService.getNewAccessToken(refreshToken);
  res.status(200).json({
    message: "access token success",
    data: {
      accessToken,
    },
  });
};

module.exports = {
  signin,
  signup,
  getNewAccessToken,
};
