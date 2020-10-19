module.exports = (sequelize, Sequelize) => {
  const Stadium = sequelize.define("stadiums", {
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
    location: {
      type: Sequelize.STRING(191),
      allowNull: false
    },
    seats: {
      type: Sequelize.INTEGER,
      allowNull: false,
      default: 0
    },
    dateOfConstruction: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    dateOfRehabilitation: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    groundType: {
      type: Sequelize.ENUM,
      values: ["Firm", "Soft", "Artificial", "Hybrid", "Hard", "Indoor", "Turf", "Street"],
      allowNull: false,
      default: "Firm"
    },
    groundWidth: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    groundLength: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    dressRoom: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false
    },
    pressRoom: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    washRoom: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    controlRoom: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    scorePanel: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    stadiumLights: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    state: {
      type: Sequelize.ENUM,
      values: ["excellent", "good", "fair", "poor", "damaged"],
      allowNull: false
    },
    imageUrl: {
      type: Sequelize.STRING(191),
      allowNull: true
    },
    published: {
      type: Sequelize.BOOLEAN,
      default: false
    }
  });

  return Stadium;
};
