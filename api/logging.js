const router = require("express").Router();
const Controller = require("../controllers");

router.get(`/:org_id`, Controller.Sign.getOrganizer); 
router.post(`/verify`, Controller.Sign.verify);
router.post(`/registration`, Controller.Sign.registration);
router.post(`/signin`, Controller.Sign.signIn);
router.patch(`/updateUserProfile/:id`, Controller.Sign.updateUserProfile);
router.post(`/logout`, Controller.Sign.logout);
router.get(`/getToken/authCheck/:cookies`, Controller.Sign.authCheck);
 

module.exports = router;
