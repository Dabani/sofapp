/* 
const db = require("../models");
const Federation = db.federation;
const League = db.league;
const Competition = db.competition;
const Season = db.season;
const Day = db.day;
const Stadium = db.stadium;
const Op = db.Sequelize.Op;
 */
module.exports = (sequelize, Sequelize) => {
  const Team = sequelize.define("teams", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    leagueId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      allowNull: false,
      references: {
        model: "leagues",
        key: "id"
      }
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
    colors: {
      type: Sequelize.STRING(191),
      allowNull: false
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
      type: Sequelize.BOOLEAN
    },
/* 
    getPlayedAttribute: function(homeTeamId, awayTeamId){
      return {
        where: {
          id: {
            [Op.or]:[
              {
                [Op.eq]: homeTeamId,
                [Op.eq]: awayTeamId
              }
            ]
          },
        }
      }
    }
 */
  });

  return Team;
};
