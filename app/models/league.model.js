module.exports = (sequelize, Sequelize) => {
  const League = sequelize.define("leagues", {
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
      type: Sequelize.BOOLEAN,
      default: false
    }
  });

  return League;
};
