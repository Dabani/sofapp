module.exports = (sequelize, Sequelize) => {
  const Competition = sequelize.define("competitions", {
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
      type: Sequelize.STRING,
      allowNull: false
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT("medium")
    },
    logoUrl: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN,
      default: false
    }
  });

  return Competition;
};
