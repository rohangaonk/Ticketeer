const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");
const catchAsync = require("../helpers/catchAsync.helper");

router.post("/signup", catchAsync(auth.signup));

router.post("/signin", catchAsync(auth.signin));

router.post("/refreshtoken", catchAsync(auth.getNewAccessToken));

module.exports = router;
