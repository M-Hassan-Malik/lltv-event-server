const router = require("express").Router();
const Controller = require("../controllers");

router.get(
  `/getAttendeesDataForManagementTable/:org_id`,
  Controller.Dashboard.getManagementTableData
);
router.get( 
  `/getTicketsPerchased/:org_id`,
  Controller.Dashboard.getAllPerchasedTickets
);
router.get(
  `/getSecondDataOfSecondRow/:org_id`,
  Controller.Dashboard.getSecondDataOfSecondRow
);

router.get(
  `/getFellowAttendeesByAttendeeID/:attendee_id`,
  Controller.Dashboard.getFellowAttendeesByAttendeeID
);



module.exports = router;
 