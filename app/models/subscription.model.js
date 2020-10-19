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
    teamId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false
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
