const mongoose = require("mongoose");

const RegistrationSchema = mongoose.Schema({
  user_type: String,
  fname: String,
  lname: String,
  email: String,
  password: String,
  address: String,
  dob: Date,
  postal: Number,
  contact: Number,
  company: String,
  updated_at: Date,
  created_at: Date,
});

module.exports = mongoose.model("Registration", RegistrationSchema);
