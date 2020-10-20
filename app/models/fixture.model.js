module.exports = (sequelize, Sequelize) => {
  const Fixture = sequelize.define("fixtures", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    federationId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false
    },
    leagueId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false
    },
    competitionId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false
    },
    seasonId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false
    },
    dayId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false
    },
    homeTeamId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false
    },
    awayTeamId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false
    },
    stadiumId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false
    },
    gameDate: {
      type: Sequelize.DATEONLY
    },
    gameTime: {
      type: Sequelize.TIME,
      default: "00:00:00",
      field: "gameTime"
    },
    homeScore: {
      type: Sequelize.INTEGER,
      default: 0
    },
    awayScore: {
      type: Sequelize.INTEGER,
      default: 0
    },
    state: {
      type: Sequelize.ENUM,
      values: ["pending", "playing", "played", "suspended", "postponed"],
      default: "pending"
    },
    published: {
      type: Sequelize.BOOLEAN,
      default: false
    }
  });

  return Fixture;
};
