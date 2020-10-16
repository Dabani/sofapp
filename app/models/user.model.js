module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING(191),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(191)
    },
    state: {
      type: Sequelize.BOOLEAN,
      default: false
    }
  });

  return User;
};