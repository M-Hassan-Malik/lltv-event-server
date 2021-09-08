const mongoose = require("mongoose");

const eventsSchema = mongoose.Schema({
  organizer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Registration" },
  title: String,
  hostingPlatform: String,
  category: String,
  webURL: String,
  eventType: String,
  description: String,
  moreinfo: String,
  start_date: Date,
  end_date: Date,
  start_time: String,
  end_time: String,
  venue: String,
  venue_address: String, 
  city: String,
  state: String,
  zipcode: Number,
  country: String,
  images: [],
  tickets_sold: String,
  updated_at: Date
});

module.exports = mongoose.model("Event", eventsSchema);
