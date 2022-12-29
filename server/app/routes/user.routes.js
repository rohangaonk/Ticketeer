const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");
const catchAsync = require("../helpers/catchAsync.helper");

router.get("/", catchAsync(user.getAllUsers));

module.exports = router;
