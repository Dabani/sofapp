const db = require("../models");
// const { user, league, competition, profile } = require("../models");
const User = db.user;
const League = db.league;

const Profile = db.profile;
const Competition = db.competition;
const Team = db.team;

const Season = db.season;
const Stadium = db.stadium;

const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: federations } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, federations, totalPages, currentPage };
};

// Create and Save a new Federation
exports.create = (req, res) => {
  // Validate request
  if ((!req.body.name) || (!req.body.email) || (!req.body.telephone) || (!req.body.country)) {
    res.status(400).send({
      message: `The following fields:
      - Name,
      - Email,
      - Telephone
      - Country

      are MENDATORY and can NOT be empty!"`
    });
    return;
  }

  // Create a Federation
  const federation = {
    name: req.body.name,
    slug: req.body.slug,
    description: req.body.description,
    telephone: req.body.telephone,
    email: req.body.email,
    webUrl: req.body.webUrl,
    country: req.body.country,
    location: req.body.location,
    logoUrl: req.body.logoUrl,
    published: req.body.published ? req.body.published : false
  };

  // Save Federation in the database
  db.federation.create(federation)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Federation."
      });
    });
};

// Retrieve all Federations from the database.
exports.findAll = (req, res) => {

  const { page, size, name } = req.query;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  db.federation.findAndCountAll({ 
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
      {
        model: League,
        attributes: ["name", "location"],
        include: [
          {
            model: Competition,
            attributes: ["name"]
          },
          {
            model: Team,
            attributes: ["name", "colors"]
          }
        ]
      },
      {
        model: Season,
        attributes: ["name"]
      },
      {
        model: Stadium,
        attributes: ["name", "location"]
      }
    ],
    where: condition, limit, offset 
  })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving federations."
      });
    });

};

// Find a single Federation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  db.federation.findByPk(id, {
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
      {
        model: League,
        attributes: ["name", "location"],
        include: [
          {
            model: Competition,
            attributes: ["name"]
          },
          {
            model: Team,
            attributes: ["name", "colors"]
          }
        ]
      },
      {
        model: Season,
        attributes: ["name"]
      },
      {
        model: Stadium,
        attributes: ["name", "location"]
      }    
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Federation with id=" + id
      });
    });

};

// Update a Federation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  db.federation.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Federation was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Federation with id=${id}. Maybe Federation was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Federation with id=" + id
      });
    });
};

// Delete a Federation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  db.federation.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Federation was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Federation with id=${id}. Maybe Federation was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Federation with id=" + id
      });
    });
};

// Delete all Federations from the database.
exports.deleteAll = (req, res) => {
  db.federation.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Federations were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all federations."
      });
    });

};

// Find all published Federations
exports.findAllPublished = (req, res) => {
  
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  db.federation.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving federations."
      });
    });

};

// Add a User to a Federation
exports.addUser = (federationId, userId) => {
  return db.federation.findByPk(federationId)
    .then((federation) => {
      if (!federation) {
        console.log("Federation not found!");
        return null;
      }
      return db.user.findByPk(userId).then((user) => {
        if (!user) {
          console.log("User not found!");
          return null;
        }

        federation.addUser(user);
        console.log(`>> added User id=${user.id} to Federation id=${federation.id}`);
        return federation;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding User to Federation: ", err);
    });
};

/* 
// Add a League to a Federation
exports.addLeague = (federationId, leagueId) => {
  return db.federation.findByPk(federationId)
    .then((federation) => {
      if (!federation) {
        console.log("Federation not found!");
        return null;
      }
      return db.league.findByPk(leagueId).then((league) => {
        if (!league) {
          console.log("League not found!");
          return null;
        }

        federation.addLeague(league);
        console.log(`>> added League id=${league.id} to Federation id=${federation.id}`);
        return federation;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding League to Federation: ", err);
    });
};
 */