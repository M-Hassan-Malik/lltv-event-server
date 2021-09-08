const mongoose = require("mongoose");

const socialsSchema = mongoose.Schema({
	organizer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Registration" },
	facebook: String,
	instagram: String,
	youtube: String,
	twitter: String,
	linkedIn: String,
	

});

module.exports = mongoose.model("Social", socialsSchema);
