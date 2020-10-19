"use-strict";
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
// const UserRole = db.user_role;
const Profile = db.profile;
const Federation = db.federation;
// const UserFederation = db.user_federation;
const League = db.league;
const Competition = db.competition;
const Team = db.team;
const Season = db.season;
const Stadium = db.stadium;


db.sequelize.sync({ force: true }).then(() => {
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

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
  User.create({
    id: 1,
    username: "admin1",
    email: "admin1@sofapp.com",
    password: "$2a$08$o3qb.QcoChxsstZsO/aJI.auES3eRvL0CY3l3vttcjL4W1p740D5a",
    state: true
  });

  User.create({
    id: 2,
    username: "staff1",
    email: "staff1@sofapp.com",
    password: "$2a$08$0DwOceC0lFw1QlGdDua38uJNaWDTYaaaUnaYvx/0BLXnLybVZZUzK",
    state: true
  });

  User.create({
    id: 3,
    username: "referee1",
    email: "referee1@sofapp.com",
    password: "$2a$08$WZZt6qj0A0VN1kYecY8BAuFWphgT7kwCd1YEAJRCpqCBe/wgNhPUW",
    state: true
  });

  User.create({
    id: 4,
    username: "executive1",
    email: "executive1@sofapp.com",
    password: "$2a$08$KyXnOEgfiNKc/izXVuxJkO7icfz86j0SIpgLR.ASzcOo21MY6/BpC",
    state: true
  });

  User.create({
    id: 5,
    username: "manager1",
    email: "manager1@sofapp.com",
    password: "$2a$08$eewq5/LOR.mfjPJUkDT/reDDk3sFCoes8lNFFAdcTlr3NSOUFQw1S",
    state: true
  });

  User.create({
    id: 6,
    username: "agent1",
    email: "agent1@sofapp.com",
    password: "$2a$08$272yv1lVP9i4RSxku7hTZe6ESKHejWg0QIVv35SZClCzRU77GcfR6",
    state: true
  });

  User.create({
    id: 7,
    username: "player1",
    email: "player1@sofapp.com",
    password: "$2a$08$EhizVI0AA4GKU8pFQgsjK.RpLUdEx3GiB9hNd70qeLNUbCD94J/le",
    state: true
  });

  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "player"
  });

  Role.create({
    id: 3,
    name: "agent"
  });
  Role.create({
    id: 4,
    name: "manager"
  });

  Role.create({
    id: 5,
    name: "executive"
  });

  Role.create({
    id: 6,
    name: "referee"
  });
  Role.create({
    id: 7,
    name: "staff"
  });

  Role.create({
    id: 8,
    name: "admin"
  });

  Profile.create({
    id: 1,
    userId: 1,
    firstName: "Robert",
    lastName: "Makuta",
    otherName: "Dabani",
    gender: "male",
    dateOfBirth: "1973-06-17",
    placeOfBirth: "Goma",
    nationalityAtBirth: "Congo",
    nationalityCurrent: "Rwanda",
    biography: "Amazing",
    telephone: "+250788554939",
    webUrl: "dabani.github.io",
    imageUrl: "dabani.png",
    state: "private",
    published: true
  });

  Profile.create({
    id: 2,
    userId: 2,
    firstName: "Joseph",
    lastName: "Harelimana",
    otherName: "Yayi",
    gender: "male",
    dateOfBirth: "2000-10-10",
    placeOfBirth: "Kigali",
    nationalityAtBirth: "Rwanda",
    nationalityCurrent: "Rwanda",
    biography: "Exciting application!",
    telephone: "+250788554939",
    webUrl: "yayi.github.io",
    imageUrl: "yayi.png",
    state: "public",
    published: true
  });

  Profile.create({
    id: 3,
    userId: 6,
    firstName: "Aurore",
    lastName: "Irakoze",
    otherName: "Poule",
    gender: "female",
    dateOfBirth: "2002-02-02",
    placeOfBirth: "Kigali",
    nationalityAtBirth: "Rwanda",
    nationalityCurrent: "Rwanda",
    biography: "Interesting stuff!",
    telephone: "+250788554939",
    webUrl: "irakoze.com",
    imageUrl: "poule.png",
    state: "relative",
    published: true
  });

  Profile.create({
    id: 4,
    userId: 4,
    firstName: "Happy Rola Mary",
    lastName: "Sanganizwimpundu",
    otherName: "Sanga",
    gender: "female",
    dateOfBirth: "1998-09-18",
    placeOfBirth: "Bujumbura",
    nationalityAtBirth: "Burundi",
    nationalityCurrent: "Burundi",
    biography: "Professional experience",
    telephone: "+257788554939",
    webUrl: "sanga.com",
    imageUrl: "sanga.png",
    state: "private",
    published: true
  });

  Profile.create({
    id: 5,
    userId: 5,
    firstName: "Laetitia",
    lastName: "Gusenga",
    otherName: "Tante",
    gender: "female",
    dateOfBirth: "1985-08-22",
    placeOfBirth: "Kamonyi",
    nationalityAtBirth: "Rwanda",
    nationalityCurrent: "Rwanda",
    biography: "Professional",
    telephone: "+250788403562",
    webUrl: "gusenga.com",
    imageUrl: "tante.png",
    state: "private",
    published: true
  });

  Profile.create({
    id: 6,
    userId: 7,
    firstName: "Prince",
    lastName: "Muhoza",
    otherName: "Arsene",
    gender: "male",
    dateOfBirth: "1996-05-12",
    placeOfBirth: "Gitega",
    nationalityAtBirth: "Rwanda",
    nationalityCurrent: "Rwanda",
    biography: "Work experience",
    telephone: "+250788665544",
    webUrl: "muhoza.com",
    imageUrl: "arsene.png",
    state: "public",
    published: true
  });

  Profile.create({
    id: 7,
    userId: 3,
    firstName: "Eric",
    lastName: "Sebera",
    otherName: "Seberic",
    gender: "male",
    dateOfBirth: "1981-12-06",
    placeOfBirth: "Nyarugenge",
    nationalityAtBirth: "Rwanda",
    nationalityCurrent: "Rwanda",
    biography: "Research",
    telephone: "+250788798917",
    webUrl: "seberic.com",
    imageUrl: "seberic.png",
    state: "private",
    published: true
  });
/* 
  UserRole.create({
    roleId: 8,
    userId: 1
  });

  UserRole.create({
    roleId: 7,
    userId: 2
  });

  UserRole.create({
    roleId: 6,
    userId: 3
  });

  UserRole.create({
    roleId: 5,
    userId: 4
  });

  UserRole.create({
    roleId: 4,
    userId: 5
  });

  UserRole.create({
    roleId: 3,
    userId: 6
  });

  UserRole.create({
    roleId: 2,
    userId: 7
  });
 */
  Federation.create({
    id: 1,
    name: "FERWAFA",
    slug: "ferwafa",
    description: "Federation Rwandaise de Football Amateur",
    telephone: "+250788554939",
    email: "ferwafa@sofapp.com",
    webUrl: "ferwafa.rw",
    country: "Rwanda",
    location: "Kigali",
    logoUrl: "ferwafa.png",
    published: true
  });

  Federation.create({
    id: 2,
    name: "FEBUFA",
    slug: "febufa",
    description: "Federation Burundaise de Football Amateur",
    telephone: "+257788554939",
    email: "febufa@sofapp.com",
    webUrl: "febufa.com",
    country: "Burundi",
    location: "Bujumbura",
    logoUrl: "febufa.png",
    published: true
  });

  Federation.create({
    id: 3,
    name: "FECOFA",
    slug: "fecofa",
    description: "Federation Congolaise de Football Amateur",
    telephone: "+243788554939",
    email: "fecofa@sofapp.com",
    webUrl: "fecofa.cd",
    country: "Congo",
    location: "Kinshasa",
    logoUrl: "fecofa.png",
    published: true
  });

  Federation.create({
    id: 4,
    name: "FOFA",
    slug: "fofa",
    description: "Federation Ougandaise de Football Amateur",
    telephone: "+256788554939",
    email: "fofa@sofapp.com",
    webUrl: "fofa.ug",
    country: "Ouganda",
    location: "Kampala",
    logoUrl: "fofa.png",
    published: true
  });

  Federation.create({
    id: 5,
    name: "FEKEFA",
    slug: "fekefa",
    description: "Federation Kenyane de Football Amateur",
    telephone: "+254788554939",
    email: "fekefa@sofapp.com",
    webUrl: "fekefa.ke",
    country: "Kenya",
    location: "Nairobi",
    logoUrl: "fekefa.png",
    published: true
  });

  Federation.create({
    id: 6,
    name: "FETAFA",
    slug: "fetafa",
    description: "Federation Tanzanienne de Football Amateur",
    telephone: "+255788554939",
    email: "fetafa@sofapp.com",
    webUrl: "fetafa.tz",
    country: "Tanzania",
    location: "Dar-el-Salam",
    logoUrl: "fetafa.png",
    published: true
  });

  Federation.create({
    id: 7,
    name: "FESSOFA",
    slug: "fessofa",
    description: "Federation Sud Soudanaise de Football Amateur",
    telephone: "+253788554939",
    email: "fesofa@sofapp.com",
    webUrl: "fessofa.ssu",
    country: "South Sudan",
    location: "Djouba",
    logoUrl: "fessofa.png",
    published: true
  });

  Federation.create({
    id: 8,
    name: "FEFA",
    slug: "fefa",
    description: "Federation Ethiopienne de Football Amateur",
    telephone: "+251788554939",
    email: "fefa@sofapp.com",
    webUrl: "fefa.com",
    country: "Ethiopia",
    location: "Addis Abbaba",
    logoUrl: "fefa.png",
    published: true
  });
/* 
  UserFederation.create({
    federationId: 1,
    userId: 1
  });

  UserFederation.create({
    federationId: 1,
    userId: 3
  });

  UserFederation.create({
    federationId: 2,
    userId: 6
  });

  UserFederation.create({
    federationId: 3,
    userId: 4
  });

  UserFederation.create({
    federationId: 5,
    userId: 7
  });

  UserFederation.create({
    federationId: 6,
    userId: 1
  });

  UserFederation.create({
    federationId: 7,
    userId: 2
  });

  UserFederation.create({
    federationId: 8,
    userId: 5
  });
 */

  League.create({
    id: 1,
    federationId: 1,
    name: "Rwanda Soccer Men Leagues",
    slug: "rwanda-soccer-men-leagues",
    description: "",
    telephone: "",
    email: "men.leagues@ferwafa.rw",
    webUrl: "men.ferwafa.rw",
    location: "Kigali",
    logoUrl: "men_ferwafa.png",
    published: true
  });

  League.create({
    id: 2,
    federationId: 1,
    name: "Rwanda Soccer Women Leagues",
    slug: "rwanda-soccer-women-leagues",
    description: "",
    telephone: "",
    email: "women.leagues@ferwafa.rw",
    webUrl: "women.ferwafa.rw",
    location: "Kigali",
    logoUrl: "women_ferwafa.png",
    published: false
  });

  League.create({
    id: 3,
    federationId: 1,
    name: "Rwanda Soccer Academy Leagues",
    slug: "rwanda-soccer-academy-leagues",
    description: "",
    telephone: "",
    email: "academy.leagues@ferwafa.rw",
    webUrl: "academies.ferwafa.rw",
    location: "Kigali",
    logoUrl: "academies_ferwafa.png",
    published: false
  });

  Competition.create({
    id: 1,
    leagueId: 1,
    name: "Rwanda Premier League",
    slug: "rwanda-premier-league",
    description: "Rwandan men first division championship",
    logoUrl: "",
    published: true
  });

  Competition.create({
    id: 2,
    leagueId: 1,
    name: "Rwanda Second Division Pool A",
    slug: "rwanda-second-division-pool-a",
    description: "Rwandan men second division championship normal season pool A",
    logoUrl: "",
    published: true
  });

  Competition.create({
    id: 3,
    leagueId: 1,
    name: "Rwanda Second Division Pool B",
    slug: "rwanda-second-division-pool-b",
    description: "Rwandan men second division championship normal season pool B",
    logoUrl: "",
    published: true
  });

  Competition.create({
    id: 4,
    leagueId: 1,
    name: "Rwanda Second Division Play Off",
    slug: "rwanda-second-division-play-off",
    description: "Rwandan men second division championship play off phase. Top two of each second division pool are qualified for!",
    logoUrl: "",
    published: true
  });

  Competition.create({
    id: 5,
    leagueId: 1,
    name: "Rwanda Men Peace Cup",
    slug: "rwanda-men-peace-cup",
    description: "Any team from the Men Leagues can subscribe to the competition.",
    logoUrl: "",
    published: true
  });

  Competition.create({
    id: 6,
    leagueId: 1,
    name: "Heroes Cup",
    slug: "heroes-cup",
    description: "Top four men first division chimpionship",
    logoUrl: "",
    published: true
  });

  Competition.create({
    id: 7,
    leagueId: 1,
    name: "Rwanda Women Leagues",
    slug: "rwanda-women-leagues",
    description: "Rwanda women first division chimpionship",
    logoUrl: "",
    published: true
  });

  Team.create({
    id: 1,
    leagueId: 1,
    name: "Kiyovu SC",
    slug: "kiyovu-sc",
    description: "",
    colors: "Green, White",
    telephone: "",
    email: "kiyovu@sofapp.com",
    webUrl: "kiyovu.sofapp.com",
    location: "Nyamirambo",
    logoUrl: "kiyovu.png",
    published: true
  });

  Team.create({
    id: 2,
    leagueId: 1,
    name: "Etincelles FC",
    slug: "etincelles-fc",
    description: "",
    colors: "Red, White",
    telephone: "",
    email: "etincelles@sofapp.com",
    webUrl: "etincelles.sofapp.com",
    location: "Rubavu",
    logoUrl: "etincelles.png",
    published: true
  });

  Team.create({
    id: 3,
    leagueId: 1,
    name: "APR FC",
    slug: "apr-fc",
    description: "",
    colors: "Black, White",
    telephone: "",
    email: "apr@sofapp.com",
    webUrl: "apr.sofapp.com",
    location: "Kigali",
    logoUrl: "apr.png",
    published: true
  });

  Team.create({
    id: 4,
    leagueId: 1,
    name: "Mukura VSL",
    slug: "mukura-vsl",
    description: "",
    colors: "Yellow, Black",
    telephone: "",
    email: "mukura@sofapp.com",
    webUrl: "mukura.sofapp.com",
    location: "Huye",
    logoUrl: "mukura.png",
    published: true
  });

  Team.create({
    id: 5,
    leagueId: 1,
    name: "Rayon Sports",
    slug: "rayon-sports",
    description: "",
    colors: "Blue, White",
    telephone: "",
    email: "rayon.sports@sofapp.com",
    webUrl: "rayon.sofapp.com",
    location: "Kigali",
    logoUrl: "rayon.png",
    published: true
  });

  Team.create({
    id: 6,
    leagueId: 1,
    name: "Musanze FC",
    slug: "musanze-fc",
    description: "",
    colors: "Red, White",
    telephone: "",
    email: "musanze@sofapp.com",
    webUrl: "musanze.sofapp.com",
    location: "Kigali",
    logoUrl: "musanze.png",
    published: true
  });

  Season.create({
    id: 1,
    federationId: 1,
    name: "2015-2016",
    slug: "2015-2016",
    description: "",
    seasonStart: "2015-09-05",
    seasonEnd: "2016-07-04",
    state: "archive",
    published: true
  });

  Season.create({
    id: 2,
    federationId: 1,
    name: "2016-2017",
    slug: "2016-2017",
    description: "",
    seasonStart: "2016-09-05",
    seasonEnd: "2017-07-04",
    state: "archive",
    published: true
  });

  Season.create({
    id: 3,
    federationId: 1,
    name: "2017-2018",
    slug: "2017-2018",
    description: "",
    seasonStart: "2017-09-05",
    seasonEnd: "2018-07-04",
    state: "archive",
    published: true
  });

  Season.create({
    id: 4,
    federationId: 1,
    name: "2018-2019",
    slug: "2018-2019",
    description: "",
    seasonStart: "2018-09-05",
    seasonEnd: "2019-07-04",
    state: "archive",
    published: true
  });

  Season.create({
    id: 5,
    federationId: 1,
    name: "2019-2020",
    slug: "2019-2020",
    description: "",
    seasonStart: "2019-09-05",
    seasonEnd: "2020-07-04",
    state: "",
    published: true
  });

  Season.create({
    id: 6,
    federationId: 1,
    name: "2020-2021",
    slug: "2020-2021",
    description: "",
    seasonStart: "2020-12-04",
    seasonEnd: "2021-07-04",
    state: "upcoming",
    published: true
  });

  Stadium.create({
    id: 1,
    federationId: 1,
    name: "Amahoro",
    slug: "amahoro",
    description: "",
    location: "Remera",
    seats: 30000,
    dateOfConstruction: "0000-00-00",
    dateOfRehabilitation: "0000-00-00",
    groundType: "Firm Ground",
    groundWidth: 75,
    groundLength: 110,
    dressRoom: true,
    pressRoom: true,
    washRoom: true,
    controlRoom: true,
    scorePanel: true,
    stadiumLights: true,
    state: "Excellent",
    published: true
  });

  Stadium.create({
    id: 2,
    federationId: 1,
    name: "Umumena",
    slug: "umumena",
    description: "",
    location: "Nyamirambo",
    seats: 3000,
    dateOfConstruction: "0000-00-00",
    dateOfRehabilitation: "0000-00-00",
    groundType: "Artificial Grass Surface",
    groundWidth: 64,
    groundLength: 100,
    dressRoom: true,
    pressRoom: true,
    washRoom: true,
    controlRoom: false,
    scorePanel: false,
    stadiumLights: true,
    state: "Fair",
    published: true
  });

  Stadium.create({
    id: 3,
    federationId: 1,
    name: "Kigali Stadium",
    slug: "kigali-stadium",
    description: "",
    location: "Nyamiramo",
    seats: 8000,
    dateOfConstruction: "0000-00-00",
    dateOfRehabilitation: "0000-00-00",
    groundType: "Artificial Grass Surface",
    groundWidth: 68,
    groundLength: 105,
    dressRoom: true,
    pressRoom: true,
    washRoom: true,
    controlRoom: false,
    scorePanel: true,
    stadiumLights: true,
    state: "Good",
    published: true
  });

  Stadium.create({
    id: 4,
    federationId: 1,
    name: "Umuganda",
    slug: "umuganda",
    description: "",
    location: "Rubavu",
    seats: 5000,
    dateOfConstruction: "0000-00-00",
    dateOfRehabilitation: "0000-00-00",
    groundType: "Firm Ground",
    groundWidth: 68,
    groundLength: 105,
    dressRoom: true,
    pressRoom: true,
    washRoom: true,
    controlRoom: false,
    scorePanel: false,
    stadiumLights: true,
    state: "Good",
    published: true
  });

  Stadium.create({
    id: 5,
    federationId: 1,
    name: "Huye",
    slug: "huye",
    description: "",
    location: "Huye",
    seats: 5000,
    dateOfConstruction: "0000-00-00",
    dateOfRehabilitation: "0000-00-00",
    groundType: "Artificial Grass Surface",
    groundWidth: 64,
    groundLength: 100,
    dressRoom: true,
    pressRoom: true,
    washRoom: true,
    controlRoom: false,
    scorePanel: true,
    stadiumLights: true,
    state: "Excellent",
    published: true
  });

/* 
  // Show all Users
  const users = await UserController.findAll();
  console.log(">> users", JSON.stringify(users, null, 2));

  // Show all Federations
  const federations = await FederationController.findAll();
  console.log(">> federations", JSON.stringify(federations, null, 2));

  // Show all Profiles
  const profiles = await ProfileController.findAll();
  console.log(">> profiles", JSON.stringify(profiles, null, 2));

  // Show all Leagues
  const leagues = await LeagueController.findAll();
  console.log(">> leagues", JSON.stringify(leagues, null, 2));

  // Show all Competitions
  const competitions = await CompetitionController.findAll();
  console.log(">> competitions", JSON.stringify(competitions, null, 2));
 */

}
