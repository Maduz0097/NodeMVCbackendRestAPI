const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const PORT = process.env.PORT || 8082;

// create express app
const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});

require("./app/routes/political.routes.js")(app);
require("./app/routes/art.routes.js")(app);
require("./app/routes/loan.routes.js")(app);
// listen for requests
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT.toString());
});
