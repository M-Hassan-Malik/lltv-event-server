const mongoose = require("mongoose");

const faqSchema = mongoose.Schema({
  organizer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Registration" },
  questions: [],
  answers: [],
  updated_at: Date,
});

module.exports = mongoose.model("FAQ", faqSchema);
