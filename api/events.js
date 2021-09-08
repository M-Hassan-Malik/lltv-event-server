const router = require("express").Router();
const Controller = require("../controllers");

router.get(`/all/getEvents`, Controller.Events.getEvents);
router.get(`/all/getOnlyEventsIDs`, Controller.Events.getOnlyEventsIDs);
router.get(
  `/getEventsByOrganizerId/:org_id`,
  Controller.Events.getEventsByOrganizerId
);
router.get(
  `/getRandomEvents`,
  Controller.Events.getRandomEvents
);
router.get(
  `/getEventsByEventId/:eventId`,
  Controller.Events.getEventsByEventId
);
router.get(
  `/getEventsByAttendeeId/:attendee_id`,
  Controller.Events.getEventsByAttendeeId
);
router.delete(`/deleteEventById/:event_id`, Controller.Events.deleteEventById);
router.get(
  `/getSiteSocialsByOrganizerID/:org_id`,
  Controller.Events.getSiteSocialsByOrganizerID
);
router.get( 
  `/SiteDataSocialsByOrganizerID/:org_id`,
  Controller.Events.SiteDataSocialsByOrganizerID
);

module.exports = router;
 