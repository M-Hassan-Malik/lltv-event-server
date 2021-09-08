const router = require("express").Router();
const Controller = require("../controllers");

router.get(
  `/getBookingDetailsByOrg_id/:org_id`,
  Controller.Ticket.getBookingData
);
router.get(
  `/getTicket/:id`,
  Controller.Ticket.getTicketByID
);
router.delete(
  `/deleteTicket/:id`,
  Controller.Ticket.deleteTicket
);

module.exports = router;
 