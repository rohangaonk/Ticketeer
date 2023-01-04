module.exports = {
  secret: "trytoguessme",
  jwt_expiry: 10 * 60 * 60, //10 hour
  refresh_token_expiry: 24 * 60 * 60, //24 hours
  refresh_token_cookie_ms: 1000 * 24 * 60 * 60, //24 hours
};
