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
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    otherName: {
      type: Sequelize.STRING
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
      type: Sequelize.STRING,
      allowNull: false
    },
    nationalityAtBirth: {
      type: Sequelize.STRING,
      allowNull: false
    },
    nationalityCurrent: {
      type: Sequelize.STRING,
      allowNull: false
    },
    biography: {
      type: Sequelize.TEXT("long")
    },
    telephone: {
      type: Sequelize.STRING
    },
    webUrl: {
      type: Sequelize.STRING
    },
    imageUrl: {
      type: Sequelize.STRING
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