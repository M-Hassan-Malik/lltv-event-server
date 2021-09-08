const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  organizer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Registration" },
  title: String,
  details: String,
  updated_at: Date,
});

module.exports = mongoose.model("Blog", blogSchema);
