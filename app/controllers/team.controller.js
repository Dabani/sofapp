const db = require("../models");
// const { user } = require("../models");
const User = db.user;
const Profile = db.profile;
const Competition = db.competition;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: teams } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, teams, totalPages, currentPage };
};

// Create and Save a new Team
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Team
  const team = {
    leagueId: req.body.leagueId,
    name: req.body.name,
    slug: req.body.slug,
    description: req.body.description,
    colors: req.body.colors,
    telephone: req.body.telephone,
    email: req.body.email,
    webUrl: req.body.webUrl,
    location: req.body.location,
    logoUrl: req.body.logoUrl,
    published: req.body.published ? req.body.published : false
  };

  // Save Team in the database
  db.team.create(team)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Team."
      });
    });

};

// Retrieve all Teams from the database.
exports.findAll = (req, res) => {

  const { page, size, name } = req.query;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  db.team.findAndCountAll({
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "username", "email", "state"],
        through: {
          attributes: [],
        }
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
          err.message || "Some error occurred while retrieving teams."
      });
    });

};

// Find a single Team with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  db.team.findByPk(id, {
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "username", "email", "state"],
        through: {
          attributes: [],
        },
        include: {
          model: Profile
        }
      }
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Team with id=" + id
      });
    });

};

// Update a Team by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  db.team.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Team was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Team with id=${id}. Maybe Team was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Team with id=" + id
      });
    });
};

// Delete a Team with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  db.team.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Team was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Team with id=${id}. Maybe Team was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Team with id=" + id
      });
    });
};

// Delete all Teams from the database.
exports.deleteAll = (req, res) => {
  db.team.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Teams were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all teams."
      });
    });

};

// Find all published Teams
exports.findAllPublished = (req, res) => {

  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  db.team.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving teams."
      });
    });

};

// Add a User to a Team
exports.addUser = (teamId, userId) => {
  return db.team.findByPk(teamId)
    .then((team) => {
      if (!team) {
        console.log("Team not found!");
        return null;
      }
      return db.user.findByPk(userId).then((user) => {
        if (!user) {
          console.log("User not found!");
          return null;
        }

        team.addUser(user);
        console.log(`>> added User id=${user.id} to Team id=${team.id}`);
        return team;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding User to Team: ", err);
    });
};