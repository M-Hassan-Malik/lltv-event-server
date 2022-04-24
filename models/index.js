const mongoose = require("mongoose");

//  "mongodb+srv://admin:<password>@cluster0.9oejs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//  "mongodb://localhost:27017/sales"
    
//"mongodb+srv://eventdb:pass1234@cluster0.bd5or.mongodb.net/eventdb",

//gokulast
//Password123

mongoose
  .connect(
    "mongodb+srv://gokulast:Password123@cluster0.lzcnv.mongodb.net/eventdb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      // socketTimeoutMS: 35000,
      // connectTimeoutMS: 10000,
    }
  )
  .catch((error) => console.log("error connecting to MongoDB:", String(error)));

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
