const router = require("express").Router();
const Controller = require("../../controllers");

router.get(
  `/getAdmins`,
  Controller.Organizer.getAdmins
);


module.exports = router;
 