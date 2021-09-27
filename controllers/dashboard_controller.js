const mongoose = require("mongoose");
const db = require("../models");
const ObjectId = mongoose.Types.ObjectId;

exports.getAllPerchasedTickets = async (req, res) => {
  try {
    db.Ticket.aggregate([
      {
        $sort: { month: 1 },
      },
      {
        $match: { organizer_id: ObjectId(req.params.org_id) },
      },
      {
        $group: {
          _id: "$month",
          purchases: { $sum: 1 },
        },
      },
    ]).then((result) => {
       console.log("result is", result);
      res.status(200).json(result);
    });
  } catch (e) {
    console.log("Error at catch-block @getAllPerchasedTickets:", String(e));
  }
};

exports.getSecondDataOfSecondRow = async (req, res) => {
  try {
    const NoOfBookings = await db.Ticket.find({
      organizer_id: req.params.org_id,
    }).countDocuments();
    const NoOfEvents = await db.Event.find({
      organizer_id: req.params.org_id,
    }).countDocuments();

    //const NoOfAttendees = await db.Ticket.find({ organizer_id: req.params.org_id }).count();
    res.status(200).json({ NoOfBookings, NoOfEvents });
  } catch (e) {
    console.log("Error at catch-block @getSecondDataOfSecondRow:", String(e));
  }
};

exports.getManagementTableData = (req, res) => {
  try {
    db.Ticket.find({ organizer_id: req.params.org_id })
      .populate("attendee_id")
      .then((data) => {
        res.status(200).json(data);
      });
  } catch (e) {
    console.log("Error at catch-block @getManagementTableData:", String(e));
  }
};

exports.getFellowAttendeesByAttendeeID = (req, res) => {
  try {
    let attendee_id = String(req.params.attendee_id);
    const getDataOfAttendeesFromRegistrations = (attendee_ids) => {
      db.Registration.aggregate(
        [
          // get all collection which contains these IDs
          {
            $match: {
              _id: {
                $in: attendee_ids,
              },
            },
          },
        ],
        (err, result) => {
          if (result) {
            // console.log("all attendees", result);
            res.status(200).json({ response: result });
          } else if (err) {
            res.status(400).json({
              error: `Error getting Fellow Attendees at getFellowAttendeesByAttendeeID: ${err}`,
            });
          }
        }
      );
    };

    const getDataOfAttendees = (event_ids) => {
      let attendee_ids = [];
      db.Ticket.aggregate(
        [
          // get all collection which contains these IDs
          {
            $match: {
              event_id: {
                $in: event_ids,
              },
            },
          },
        ],
        (err, result) => {
          if (result) {
            result.map((data) => attendee_ids.push(data.attendee_id)); //an array of Tickets o extract attendee_id and get their data
            getDataOfAttendeesFromRegistrations(attendee_ids);
          } else if (err) {
            console.log(err);
          }
        }
      );
    };

    db.Ticket.find({ attendee_id: attendee_id }, (err, result) => {
      // get all tickets collection in DB
      let event_ids = [];
      if (err) {
        res.send({ error: `Error getting Fellow Attendees: ${err}` });
      } else if (result === null) {
        res.send({ error: "Result is null" });
      } else if (result !== null) {
        result.map((data) => event_ids.push(data.event_id)); // get all events_id in DB f this ATTENDEE

        getDataOfAttendees(event_ids);
      }
    });
  } catch (e) {
    console.log(
      "Error at catch-block @getFellowAttendeesByAttendeeID:",
      String(e)
    );
  }
};
