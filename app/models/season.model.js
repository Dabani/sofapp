module.exports = (sequelize, Sequelize) => {
  const Season = sequelize.define("seasons", {
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
    seasonStart: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    seasonEnd: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    state: {
      type: Sequelize.ENUM,
      values: ["archive", "current", "upcoming", "suspended", "delayed"],
      default: "upcoming"
    },
    published: {
      type: Sequelize.BOOLEAN,
      default: false
    }
  });

  return Season;
};
