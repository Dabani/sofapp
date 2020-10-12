module.exports = (sequelize, Sequelize) => {
  const Federation = sequelize.define("federations", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: Sequelize.TEXT("medium")
    },
    telephone: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    webUrl: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    location: {
      type: Sequelize.STRING
    },
    logoUrl: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Federation;
};
