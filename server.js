const express = require("express");
require("path");
const app = express();
var cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const originURL = [
  `http://localhost:3000`,
  `https://lltv-event-client.netlify.app`,
];
app.use(
  cors({
    origin: originURL,
    credentials: true,
  })
);


app.use(express.static(__dirname + "/public/uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req,res) => { 
  res.json({
    message: "running"
  })
})

app.post('/', (req,res) => { 
 res.json({
   message: "running"
 })
})

app.use("/api/logging/", require("./api/logging.js"));

app.use("/api/generate/", require("./api/generate.js"));

app.use("/api/events/", require("./api/events.js"));

app.use("/api/dashboard/", require("./api/dashboard.js"));

app.use("/api/tickets/", require("./api/tickets.js"));

app.use("/api/blogs/", require("./api/blog"));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on http://localhost:5000 and ${originURL[1]}`);
});

//  - - - LIVE APIs - - -

//https://lltv-event-server.herokuapp.com/api/events/all/getEvents

//  - - - LOCAL APIs - - -
// http://localhost:5000/api/super/getSuperAdmins

// http://localhost:5000/api/logging/registration
// http://localhost:5000/api/logging/logout

// http://localhost:5000/api/events/getEvents
// http://localhost:5000/api/:org_id
// http://localhost:5000/api/generate/form
// http://localhost:5000/api/generate/genTicket
// http://localhost:5000/api/generate/getTicket
// http://localhost:5000/api/generate/genEvent
// http://localhost:5000/api/events/getEventsByOrganizerId/:org_id
