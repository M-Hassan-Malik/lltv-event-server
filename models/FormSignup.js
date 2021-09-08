const mongoose = require("mongoose");

const FormSignupSchema = mongoose.Schema({
  fname: String,
  lname: String,
  email: String,

  countryphonecode: String,
  phone: Number,
  companyname: String,
  companydiscription: String,
  networkimportance: String,
  requirements: String,
});

module.exports = mongoose.model("FormSignup", FormSignupSchema);
