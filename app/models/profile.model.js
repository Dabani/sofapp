module.exports = (sequelize, Sequelize) => {
  const Profile = sequelize.define("profiles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: Sequelize.STRING(191),
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING(191),
      allowNull: false
    },
    otherName: {
      type: Sequelize.STRING(191)
    },
    gender: {
      type: Sequelize.ENUM,
      values: ["female", "male"]
    },
    dateOfBirth: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    placeOfBirth: {
      type: Sequelize.STRING(191),
      allowNull: false
    },
    nationalityAtBirth: {
      type: Sequelize.STRING(191),
      allowNull: false
    },
    nationalityCurrent: {
      type: Sequelize.STRING(191),
      allowNull: false
    },
    biography: {
      type: Sequelize.TEXT("long")
    },
    telephone: {
      type: Sequelize.STRING(191)
    },
    webUrl: {
      type: Sequelize.STRING(191)
    },
    imageUrl: {
      type: Sequelize.STRING(191)
    },
    state: {
      type: Sequelize.ENUM,
      values: ["public", "private", "relative"],
      default: "private"
    },
    published: {
      type: Sequelize.BOOLEAN,
      default: false
    }
  });

  return Profile;
};

/*
Displaying enum values

console.log(Profile.rawAttributes.state.values);
// logs ['public', 'private', 'relative'] in console

*/