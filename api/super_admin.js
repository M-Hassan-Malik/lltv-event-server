const router = require("express").Router();
const Controller = require("../controllers");

router.get(
  `/getSuperAdmins`,
  Controller.Super.getSuperAdmins
);


module.exports = router;
 