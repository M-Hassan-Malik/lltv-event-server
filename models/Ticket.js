const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  organizer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Registration" }, // use to find "number of total sold tickts" (we get it with response event data )
  attendee_id: { type: mongoose.Schema.Types.ObjectId, ref: "Registration" }, // use to find attendee (we get it when user sign's in)
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: "Event" }, // matches event_id and findAndUpdate the 'ticket_no'
  ticket_no: String,
  country: {},
  month: Number,
  created_at: Date,
});

module.exports = mongoose.model("Ticket", ticketSchema);
