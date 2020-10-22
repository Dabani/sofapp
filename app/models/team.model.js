module.exports = (sequelize, Sequelize) => {
  const Team = sequelize.define("teams", attributes, {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    name: {
      type: Sequelize.STRING(191),
      allowNull: false
    },
    slug: {
      type: Sequelize.STRING(191),
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT("medium")
    },
    colors: {
      type: Sequelize.STRING(191),
      allowNull: false
    },
    telephone: {
      type: Sequelize.STRING(191)
    },
    email: {
      type: Sequelize.STRING(191)
    },
    webUrl: {
      type: Sequelize.STRING(191)
    },
    location: {
      type: Sequelize.STRING(191)
    },
    logoUrl: {
      type: Sequelize.STRING(191)
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Team;
};
