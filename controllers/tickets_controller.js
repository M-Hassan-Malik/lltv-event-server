const db = require("../models");

exports.getBookingData = (req, res) => {
  try {
    db.Ticket.find({ organizer_id: req.params.org_id })
      .populate("attendee_id")
      .populate("event_id")
      .exec((err, result) => {
        if (err) {
          res.status(400).json({ error: err });
        } else if (result) {
          res.status(200).json({ result: result });
        } else {
          res.status(400).json({ error: err });
        }
      });
  } catch (e) {
    console.log(e);
  }
};

exports.getTicketByID = (req, res) => {
  try {
    db.Ticket.findOne({ _id: req.params.id })
      .populate("attendee_id")
      .populate("event_id")
      .exec((err, result) => {
        if (err) {
          res.status(400).json({ error: err });
        } else if (result) {
          res.status(200).json({ result: result });
        } else {
          res.status(400).json({ error: err });
        }
      });
  } catch (e) {
    console.log(e);
  }
};
exports.deleteTicket = (req, res) => {
  try {
    db.Ticket.deleteOne({ _id: req.params.id }).exec((err, result) => {
      if (err) {
        res.status(400).json({ error: err });
      } else if (result) {
        res.status(200).json({ result: result });
      } else {
        res.status(400).json({ error: err });
      }
    });
  } catch (e) {
    console.log(e);
  }
};
