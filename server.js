"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

const db = require("./app/models");
const UserController = require("./app/controllers/user.controller");
const ProfileController = require("./app/controllers/profile.controller");
const FederationController = require("./app/controllers/federation.controller");
const LeagueController = require("./app/controllers/league.controller");
const CompetitionController = require("./app/controllers/competition.controller");
const TeamController = require("./app/controllers/team.controller");
const Role = db.role;
const User = db.user;
const Profile = db.profile;
const Federation = db.federation;
const League = db.league;
const Competition = db.competition;
const Team = db.team;
const Season = db.season;
const Stadium = db.stadium;
const Subscription = db.subscription;
const Day = db.day;
const Fixture = db.fixture;


// db.sequelize.sync({ force: true }).then(() => {
db.sequelize.sync().then(() => {	
  console.log("Drop and Resync Db");
  initial();
});

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Soccer Federation application." });
});
// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/profile.routes")(app);
require("./app/routes/federation.routes")(app);
require("./app/routes/league.routes")(app);
require("./app/routes/competition.routes")(app);
require("./app/routes/team.routes")(app);
require("./app/routes/season.routes")(app);
require("./app/routes/stadium.routes")(app);
require("./app/routes/subscription.routes")(app);
require("./app/routes/day.routes")(app);
require("./app/routes/fixture.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
  console.log(`Dababase populate initial data required!`);  
}
