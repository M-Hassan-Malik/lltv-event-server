const mongoose = require("mongoose");

//  "mongodb+srv://admin:<password>@cluster0.9oejs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//  "mongodb://localhost:27017/sales"

mongoose.connect(
  "mongodb+srv://eventdb:pass1234@cluster0.bd5or.mongodb.net/eventdb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    // maxPoolSize: 10,
    // socketTimeoutMS: 35000,
    // connectTimeoutMS: 10000,
  }
);

module.exports = {
  Event: require("./Event"),
  FAQ: require("./FAQ"),
  FormSignup: require("./FormSignup"),
  Ticket: require("./Ticket"),
  Site: require("./Site"),
  Registration: require("./Registration"),
  SignIn: require("./SignIn"),
  Social: require("./Social"),
  Blog: require("./Blog"),
};
