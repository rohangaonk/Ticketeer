const express = require("express");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./app/models");
const initDb = require("./app/init/initialiseDb");
const ApiError = require("./app/helpers/error.helper");
const { TokenExpiredError } = require("jsonwebtoken");

db.sequelize.sync().then(() => {
  console.log("drop and resync db");
  initDb();
});

// var corsOptions = {
//   origin: "http://localhost:8081",
// };
app.use(cors({ origin: true }));

//parse incoming cookies
app.use(cookieParser());

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// test route

//load routes

require("./app/routes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
  app.get("*", (req, res) => {
    console.log("*********hit");
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof ApiError || err instanceof TokenExpiredError)
    res.status(400).json({
      message: err.message,
    });
  else
    res.status(500).json({
      message: "something went wrong",
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
