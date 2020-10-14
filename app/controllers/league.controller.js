const db = require("../models");
// const { user } = require("../models");
const User = db.user
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: leagues } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, leagues, totalPages, currentPage };
};

// Create and Save a new League
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a League
  const league = {
    federationId: req.body.federationId,
    name: req.body.name,
    slug: req.body.slug,
    description: req.body.description,
    telephone: req.body.telephone,
    email: req.body.email,
    webUrl: req.body.webUrl,
    location: req.body.location,
    logoUrl: req.body.logoUrl,
    published: req.body.published ? req.body.published : false
  };

  // Save League in the database
  db.league.create(league)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the League."
      });
    });

};

// Retrieve all Leagues from the database.
exports.findAll = (req, res) => {

  const { page, size, name } = req.query;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  db.league.findAndCountAll({
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "username"],
        through: {
          attributes: [],
        }
      },
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
          err.message || "Some error occurred while retrieving leagues."
      });
    });

};

// Find a single League with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  db.league.findByPk(id, {
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "username"],
        through: {
          attributes: [],
        }
      },
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving League with id=" + id
      });
    });

};

// Update a League by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  db.league.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "League was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update League with id=${id}. Maybe League was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating League with id=" + id
      });
    });
};

// Delete a League with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  db.league.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "League was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete League with id=${id}. Maybe League was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete League with id=" + id
      });
    });
};

// Delete all Leagues from the database.
exports.deleteAll = (req, res) => {
  db.league.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Leagues were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all leagues."
      });
    });

};

// Find all published Leagues
exports.findAllPublished = (req, res) => {

  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  db.league.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving leagues."
      });
    });

};

// Add a User to a League
exports.addUser = (leagueId, userId) => {
  return db.league.findByPk(leagueId)
    .then((league) => {
      if (!league) {
        console.log("League not found!");
        return null;
      }
      return db.user.findByPk(userId).then((user) => {
        if (!user) {
          console.log("User not found!");
          return null;
        }

        league.addUser(user);
        console.log(`>> added User id=${user.id} to League id=${league.id}`);
        return league;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding User to League: ", err);
    });
};