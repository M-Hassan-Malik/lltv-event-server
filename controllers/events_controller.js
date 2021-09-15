const mongoose = require("mongoose");
const db = require("../models");

exports.getEvents = (req, res) => {
  try {
    db.Event.find().then((resp) => {
      try {
        res.send(resp);
      } catch (e) {
        console.log("error in getEvents -> resp:", e);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

exports.getOnlyEventsIDs = async (req, res) => {
  try {
    var webURLsAndIDs = [];
    const result = await db.Event.find();
    result.map((data) => {
      let temp = {
        webURL: data.webURL,
        eventId: data._id,
      };
      webURLsAndIDs.push(temp);
    });

    res.status(200).json(webURLsAndIDs);
  } catch (e) {
    console.log("Error at getOnlyEventsIDs @catch:", String(e));
  }
};

exports.getEventsByOrganizerId = (req, res) => {
  try {
    db.Event.find({
      organizer_id: req.params.org_id,
    }).exec((err, result) => {
      if (result) {
        res.status(200).json({ result: result });
      } else if (err) {
        res.status(400).json({ error: err });
      } else res.status(400).json({ error: err });
    });
  } catch (e) {
    res.send(e);
    console.log("Error in getEventsByOrganizerId :", e);
  }
};
exports.getRandomEvents = (req, res) => {
  try {
    db.Event.aggregate([{ $sample: { size: 10 } }]).exec((err, result) => {
      if (result) {
        res.status(200).json({ result: result });
      } else if (err) {
        res.status(400).json({ error: err });
      } else res.status(400).json({ error: err });
    });
  } catch (e) {
    res.send(e);
    console.log("Error in getRandomEvents Catch-Block:", e);
  }
};
exports.getEventsByEventId = (req, res) => {
  try {
    db.Event.findOne({
      _id: req.params.eventId,
    }).then((result) => res.status(200).json(result));
  } catch (e) {
    res.send({ error: String(e) });
  }
};
exports.getEventsByAttendeeId = (req, res) => {
  try {
    const getAttendeesEvents = (event_ids) => {
      db.Event.aggregate(
        [
          // get all Events which contains these IDs
          {
            $match: {
              _id: {
                $in: event_ids,
              },
            },
          },
        ],
        (err, result) => {
          result && res.status(200).json({ result: result });
          err &&
            res.status(400).json({
              error: `Error getting YAttendee's Events at getAttendeesEvents: ${err}`,
            });
        }
      );
    };

    let event_ids = [];
    db.Ticket.find(
      {
        attendee_id: req.params.attendee_id,
      },
      (err, result) => {
        err &&
          res.send({ error: `Error in getEventsByAttendeeId at 1st:${err}` });
        if (result) {
          result.map((data) => event_ids.push(data.event_id));

          getAttendeesEvents(event_ids);
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
};

exports.deleteEventById = (req, res) => {
  try {
    db.Event.deleteOne({ _id: req.params.event_id }).then((result) =>
      res.status(200).json(result)
    );
  } catch (e) {
    console.log(e);
  }
};

exports.getSiteSocialsByOrganizerID = (req, res) => {
  try {
    db.Social.findOne({ organizer_id: req.params.org_id }, (err, result) => {
      if (err) {
        res.status(400).json({ error: `error because: ${err}` });
      }
      if (result) {
        res.status(200).json({ result: result });
      } else {
        res
          .status(404)
          .json({ error: "Socials media's data not retrived or not found" });
      }
    });
  } catch (e) {
    console.log(e);
  }
};
exports.SiteDataSocialsByOrganizerID = (req, res) => {
  try {
    db.Site.findOne({ organizer_id: req.params.org_id }, (err, result) => {
      if (err) {
        res.status(400).json({ error: `error because: ${err}` });
      }
      if (result) {
        res.status(200).json({ result: result });
      } else {
        res
          .status(404)
          .json({ error: "Socials media's data not retrived or not found" });
      }
    });
  } catch (e) {
    console.log(e);
  }
};
