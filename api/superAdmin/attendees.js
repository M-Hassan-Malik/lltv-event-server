const router = require("express").Router();
const Controller = require("../../controllers");


router.get(
    `/getAttendees`,
    Controller.Attendee.getAttendees
  );
  

module.exports = router;
 