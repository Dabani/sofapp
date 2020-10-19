module.exports = (sequelize, Sequelize) => {
  const Day = sequelize.define("days", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    matchDay: {
      type: Sequelize.INTEGER,
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
    published: {
      type: Sequelize.BOOLEAN,
      default: false
    }
  });

  return Day;
};
