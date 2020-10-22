const db = require("../models");
const User = db.user;
const Profile = db.profile;
const Federation = db.federation;
const League = db.league;
const Competition = db.competition;
const Season = db.season;
const Team = db.team;
const Day = db.day;
const Stadium = db.stadium;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: fixtures } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, fixtures, totalPages, currentPage };
};

// Create and Save a new Fixture
exports.create = (req, res) => {
  // Validate request
  if ((!req.body.federationId) || (!req.body.leagueId) || (!req.body.competitionId) || (!req.body.seasonId) || (!req.body.dayId) || (!req.body.homeTeamId) || (!req.body.awayTeamId)) {
    res.status(400).send({
      message: `None of the following fields can not be empty:
      - Federation
      - League
      - Competition
      - Season
      - Home Team
      - Away Team
      - Match Day
      - Stadium`
    });
    return;
  }

  // Create a Fixture
  const fixture = {
    federationId: req.body.federationId,
    leagueId: req.body.leagueId,
    competitionId: req.body.competitionId,
    seasonId: req.body.seasonId,
    dayId: req.body.dayId,
    homeTeamId: req.body.homeTeamId,
    awayTeamId: req.body.awayTeamId,
    stadiumId: req.body.stadiumId,
    gameDate: req.body.gameDate,
    gameTime: req.body.gameTime,
    homeScore: req.body.homeScore,
    awayScore: req.body.awayScore,
    state: req.body.state,
    published: req.body.published ? req.body.published : false
  };

  // Save Fixture in the database
  db.fixture.create(fixture)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Fixture."
      });
    });

};

// Retrieve all Fixtures from the database.
exports.findAll = (req, res) => {
  db.fixture.findAll({
    include: [
      {
        model: User,
        as: "users",
        attributes: ["username", "email"],
        through: {
          attributes: [],
        },
        include: {
          model: Profile,
          attributes: ["firstName", "lastName"]
        }
      },
/* 
      {
        model: Federation,
        attributes: ["name"]
      },
      {
        model: League,
        attributes: ["name"]
      },
      {
        model: Competition,
        attributes: ["name"]
      },
      {
        model: Season,
        attributes: ["name"]
      },
      {
        model: Day,
        attributes: ["name"]
      },

      {
        model: Team,
        as: "HomeTeam",
        attributes: ["name"],
        through: {
          attributes: [],
        }
      },
      {
        model: Team,
        as: "AwayTeam",
        attributes: ["name"],
        through: {
          attributes: [],
        }
      },
      
      {
        model: Stadium,
        attributes: ["name"]
      }
       */
    ],
    where: {}
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(">> Some error occurred while retrieving fixtures", err);
    });

};

// Find a single Fixture with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  db.fixture.findByPk(id, {
    include: [
      {
        model: User,
        as: "users",
        attributes: ["username", "email"],
        through: {
          attributes: [],
        },
        include: {
          model: Profile,
          attributes: ["firstName", "lastName"]
        }
      },
      /* 
      {
        model: Federation,
        attributes: ["name"]
      },
      {
        model: League,
        attributes: ["name"]
      },
      {
        model: Competition,
        attributes: ["name"]
      },
      {
        model: Season,
        attributes: ["name"]
      },
      {
        model: Day,
        attributes: ["name"]
      },

      {
        model: Team,
        as: "HomeTeam",
        attributes: ["name"],
        through: {
          attributes: [],
        }
      },
      {
        model: Team,
        as: "AwayTeam",
        attributes: ["name"],
        through: {
          attributes: [],
        }
      },
      
      {
        model: Stadium,
        attributes: ["name"]
      }
 */
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error retrieving Fixture with id=" + id
      });
    });

};

// Update a Fixture by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  db.fixture.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Fixture was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Fixture with id=${id}. Maybe Fixture was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error updating Fixture with id=" + id
      });
    });
};

// Delete a Fixture with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  db.fixture.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Fixture was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Fixture with id=${id}. Maybe Fixture was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Could not delete Fixture with id=" + id
      });
    });
};

// Delete all Fixtures from the database.
exports.deleteAll = (req, res) => {
  db.fixture.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Fixtures were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all fixtures."
      });
    });

};

// Find all published Fixtures
exports.findAllPublished = (req, res) => {

  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  db.fixture.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving fixtures."
      });
    });

};

// Add a User to a Fixture
exports.addUser = (fixtureId, userId) => {
  return db.fixture.findByPk(fixtureId)
    .then((fixture) => {
      if (!fixture) {
        console.log("Fixture not found!");
        return null;
      }
      return db.user.findByPk(userId).then((user) => {
        if (!user) {
          console.log("User not found!");
          return null;
        }

        fixture.addUser(user);
        console.log(`>> added User id=${user.id} to Fixture id=${fixture.id}`);
        return fixture;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding User to Fixture: ", err);
    });
};