module.exports = (sequelize, Sequelize) => {
  const Subscription = sequelize.define("subscriptions", {
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
        model: "competitions",
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
    teamId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false,
      references: {
        model: "teams",
        key: "id"
      }
    },
    state: {
      type: Sequelize.ENUM,
      values: ["pending", "approved", "rejected"],
      default: "pending"
    },
    published: {
      type: Sequelize.BOOLEAN,
      default: false
    }
  });

  return Subscription;
};
