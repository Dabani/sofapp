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
const Role = db.role;
const User = db.user;
const UserRole = db.user_role;
const Profile = db.profile;
const Federation = db.federation;
const UserFederation = db.user_federation;

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


  // Show all Users
  const users = UserController.findAll();
  console.log(">> users", JSON.stringify(users, null, 2));

  // Show all Federations
  const federations = FederationController.findAll();
  console.log(">> federations", JSON.stringify(federations, null, 2));

  // Show all Profiles
  const profiles = ProfileController.findAll();
  console.log(">> profiles", JSON.stringify(profiles, null, 2));

  // Show all Leagues
  const leagues = LeagueController.findAll();
  console.log(">> leagues", JSON.stringify(leagues, null, 2));

  // Show all Competitions
  const competitions = CompetitionController.findAll();
  console.log(">> competitions", JSON.stringify(competitions, null, 2));
}

/* 
// Show all Users
const users = UserController.findAll();
console.log(">> users", JSON.stringify(users, null, 2));

// Show all Federations
const federations = FederationController.findAll();
console.log(">> federations", JSON.stringify(federations, null, 2));

// Show all Profiles
const profiles = ProfileController.findAll();
console.log(">> profiles", JSON.stringify(profiles, null, 2));

// Show all Leagues
const leagues = LeagueController.findAll();
console.log(">> leagues", JSON.stringify(leagues, null, 2));

// Show all Competitions
const competitions = CompetitionController.findAll();
console.log(">> competitions", JSON.stringify(competitions, null, 2));

 */