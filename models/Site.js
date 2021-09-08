const mongoose = require("mongoose");

const siteSchema = mongoose.Schema({
	organizer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Registration" },
	name: String,
	slogan: String,
	logo: [],

});

module.exports = mongoose.model("Site", siteSchema);
