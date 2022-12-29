module.exports = {
  secret: "trytoguessme",
  jwt_expiry: 1 * 60 * 60, //1 hour
  refresh_token_expiry: 24 * 60 * 60, //24 hours
  refresh_token_cookie_ms: 1000 * 24 * 60 * 60, //24 hours
};
