module.exports = (sequelize, Sequelize) => {
  const Federation = sequelize.define("federations", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: true
    },
    slug: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: true
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
    country: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: true
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

  return Federation;
};
