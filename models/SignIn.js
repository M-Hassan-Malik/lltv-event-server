const mongoose = require("mongoose");

const signInSchema = mongoose.Schema({
	email: String,
	phone: Number,
});

module.exports = mongoose.model("SignIn", signInSchema);
