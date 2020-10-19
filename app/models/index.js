const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.profile = require("../models/profile.model.js")(sequelize, Sequelize);
db.federation = require("../models/federation.model.js")(sequelize, Sequelize);
db.league = require("../models/league.model.js")(sequelize, Sequelize);
db.competition = require("../models/competition.model.js")(sequelize, Sequelize);
db.team = require("../models/team.model.js")(sequelize, Sequelize);
db.season = require("../models/season.model.js")(sequelize, Sequelize);
db.stadium = require("../models/stadium.model.js")(sequelize, Sequelize);
db.subscription = require("../models/subscription.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.federation.belongsToMany(db.user, {
  through: "user_federations",
  as: "users",
  foreignKey: "federationId",
  otherKey: "userId"
});
db.user.belongsToMany(db.federation, {
  through: "user_federations",
  as: "federations",
  foreignKey: "userId",
  otherKey: "federationId"
});

db.profile.belongsTo(db.user);
db.user.hasOne(db.profile, {
  foreignKey: "userId"
});

db.federation.hasMany(db.league, {
  foreignKey: "federationId"
});
db.league.belongsTo(db.federation);

db.league.belongsToMany(db.user, {
  through: "user_leagues",
  as: "users",
  foreignKey: "leagueId",
  otherKey: "userId"
});
db.user.belongsToMany(db.league, {
  through: "user_leagues",
  as: "leagues",
  foreignKey: "userId",
  otherKey: "leagueId"
});

db.competition.belongsTo(db.league);
db.league.hasMany(db.competition, {
  foreignKey: "leagueId"
});

db.competition.belongsToMany(db.user, {
  through: "user_competitions",
  as: "users",
  foreignKey: "competitionId",
  otherKey: "userId"
});
db.user.belongsToMany(db.competition, {
  through: "user_competitions",
  as: "competitions",
  foreignKey: "userId",
  otherKey: "competitionId"
});

db.team.belongsTo(db.league);
db.league.hasMany(db.team, {
  foreignKey: "leagueId"
});

db.team.belongsToMany(db.user, {
  through: "user_teams",
  as: "users",
  foreignKey: "teamId",
  otherKey: "userId"
});
db.user.belongsToMany(db.team, {
  through: "user_teams",
  as: "teams",
  foreignKey: "userId",
  otherKey: "teamId"
});

db.season.belongsTo(db.federation);
db.federation.hasMany(db.season, {
  foreignKey: "federationId"
});

db.season.belongsToMany(db.user, {
  through: "user_seasons",
  as: "users",
  foreignKey: "seasonId",
  otherKey: "userId"
});
db.user.belongsToMany(db.season, {
  through: "user_seasons",
  as: "seasons",
  foreignKey: "userId",
  otherKey: "seasonId"
});

db.stadium.belongsTo(db.federation);
db.federation.hasMany(db.stadium, {
  foreignKey: "federationId"
});

db.stadium.belongsToMany(db.user, {
  through: "user_stadiums",
  as: "users",
  foreignKey: "stadiumId",
  otherKey: "userId"
});
db.user.belongsToMany(db.stadium, {
  through: "user_stadiums",
  as: "stadiums",
  foreignKey: "userId",
  otherKey: "stadiumId"
});

db.subscription.belongsTo(db.federation);
db.federation.hasMany(db.subscription, {
  foreignKey: "federationId"
});

db.subscription.belongsTo(db.league);
db.league.hasMany(db.subscription, {
  foreignKey: "leagueId"
});

db.subscription.belongsTo(db.competition);
db.competition.hasMany(db.subscription, {
  foreignKey: "competitionId"
});

db.subscription.belongsTo(db.season);
db.season.hasMany(db.subscription, {
  foreignKey: "seasonId"
});

db.subscription.belongsTo(db.team);
db.team.hasMany(db.subscription, {
  foreignKey: "teamId"
});

db.subscription.belongsToMany(db.user, {
  through: "user_subscriptions",
  as: "users",
  foreignKey: "subscriptionId",
  otherKey: "userId"
});
db.user.belongsToMany(db.subscription, {
  through: "user_subscriptions",
  as: "subscriptions",
  foreignKey: "userId",
  otherKey: "subscriptionId"
});


db.ROLES = ["user", "player", "agent", "manager", "executive", "referee", "staff", "admin"];

module.exports = db;

/**
 * SequelizeBaseError:
 * Specified key was too long; max key length is 767 bytes
 * ==================================
 * This error happens in MySql 5.6+, due to utf8mb64 charset.
 * To fix it you have to set the size of STRING to 191-.
 */