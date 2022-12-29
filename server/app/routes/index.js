const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const ticketRouter = require("./ticket.routes");
const authMiddleware = require("../middleware/auth");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //auth routes
  app.use("/api/auth", authRouter);

  //verify access token
  app.use(authMiddleware.authorize);
  app.use("/api/tickets", ticketRouter);
  app.use("/api/users", userRouter);
};
