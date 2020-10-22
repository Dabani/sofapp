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
      allowNull: false,
      references: {
        model: "federations",
        key: "id"
      }
    },
    leagueId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false,
      references: {
        model: "leagues",
        key: "id"
      }
    },
    competitionId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false,
      references: {
        model: "federations",
        key: "id"
      }
    },
    seasonId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false,
      references: {
        model: "seasons",
        key: "id"
      }
    },
    dayId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false,
      references: {
        model: "days",
        key: "id"
      }
    },
    homeTeamId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false,
      references: {
        model: "teams",
        key: "id"
      }
    },
    awayTeamId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false,
      references: {
        model: "teams",
        key: "id"
      }
    },
    stadiumId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false,
      references: {
        model: "stadiums",
        key: "id"
      }
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
