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
  // "api" is necessary in route during auth middleware otherwise it hits for any random route which causes
  //error in executing following lines in main server file

  //if (process.env.NODE_ENV === "production") {
  //   app.use(express.static("../client/build"));
  //   app.get("*", (req, res) => {
  //     console.log("*********hit");
  //     res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  //   });
  // }
  app.use("/api", authMiddleware.authorize);

  app.use("/api/tickets", ticketRouter);
  app.use("/api/users", userRouter);
};
