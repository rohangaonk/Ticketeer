const userRepository = require("../repository/user.repository");
const tokenService = require("../services/token.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiError = require("../helpers/error.helper");
const dayjs = require("dayjs");
const { v4: uuidv4 } = require("uuid");
const authConfig = require("../config/auth.config");

const signup = async ({ name, email, password }) => {
  const duplicateUser = await userRepository.findOne({ email });
  if (duplicateUser) throw new ApiError("Email already in Use", 404);
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.create({
    name,
    email,
    password: hashedPassword,
  });
  return user;
};

const signin = async ({ email, password }) => {
  const verifiedUser = await verifySignin(email, password);
  const accessToken = getAccessToken(verifiedUser);
  const refreshToken = await getRefreshToken(verifiedUser);
  return { user: verifiedUser, accessToken, refreshToken };
};

const verifySignin = async (email, password) => {
  const user = await userRepository.findOne({ email });
  if (!user) throw new ApiError("Invalid Credentials", 400);
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new ApiError("Invalid Credentials", 400);
  return user;
};

const getAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, authConfig.secret, {
    expiresIn: authConfig.jwt_expiry,
  });
};

const getRefreshToken = async (user) => {
  const token = uuidv4();
  const expireAt = dayjs()
    .add(authConfig.refresh_token_expiry, "seconds")
    .toDate();
  await tokenService.saveRefreshToken({ token, expireAt, userId: user.id });
  return token;
};

const getNewAccessToken = async (refreshToken) => {
  console.log(refreshToken);
  const refreshTokenData = await tokenService.getRefreshToken(refreshToken);

  if (refreshTokenData.expireAt.getTime() < new Date().getTime())
    throw new ApiError("Refresh token expired", 400);
  return getAccessToken({ id: refreshTokenData.userId });
};

module.exports = {
  signin,
  signup,
  getNewAccessToken,
};
