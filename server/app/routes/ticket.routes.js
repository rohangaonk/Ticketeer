const express = require("express");
const router = express.Router();
const ticket = require("../controllers/ticket.controller");
const catchAsync = require("../helpers/catchAsync.helper");
const queryBuilderFromParams = require("../middleware/queryBuilderFromParams");

router.get("/test", queryBuilderFromParams, (req, res, next) => {
  console.log(req.query.filter);

  res.status(200).json({
    message: "success",
  });
});

router.get("/user", catchAsync(ticket.getTicketByUser));
router.get("/count", catchAsync(ticket.getTicketCount));
router.get("/:ticketId", catchAsync(ticket.getTicket));
router.get("/", queryBuilderFromParams, catchAsync(ticket.getAllTickets));
router.post("/", catchAsync(ticket.createTicket));
router.post("/:ticketId/toggle-status", catchAsync(ticket.toggleTicketStatus));
router.post("/:ticketId", catchAsync(ticket.updateTicket));
router.delete("/:ticketId", catchAsync(ticket.deleteTicket));

module.exports = router;
