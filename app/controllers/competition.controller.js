const db = require("../models");
const { user } = require("../models");
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: competitions } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, competitions, totalPages, currentPage };
};

// Create and Save a new Competition
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Competition
  const competition = {
    federationId: req.body.federationId,
    name: req.body.name,
    slug: req.body.slug,
    description: req.body.description,
    logoUrl: req.body.logoUrl,
    published: req.body.published ? req.body.published : false
  };

  // Save Competition in the database
  db.competition.create(competition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Competition."
      });
    });

};

// Retrieve all Competitions from the database.
exports.findAll = (req, res) => {

  const { page, size, name } = req.query;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  db.competition.findAndCountAll({
    include: [
      {
        model: db.user,
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
          err.message || "Some error occurred while retrieving competitions."
      });
    });

};

// Find a single Competition with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  db.competition.findByPk(id, {
    include: [
      {
        model: db.user,
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
        message: "Error retrieving Competition with id=" + id
      });
    });

};

// Update a Competition by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  db.competition.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Competition was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Competition with id=${id}. Maybe Competition was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Competition with id=" + id
      });
    });
};

// Delete a Competition with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  db.competition.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Competition was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Competition with id=${id}. Maybe Competition was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Competition with id=" + id
      });
    });
};

// Delete all Competitions from the database.
exports.deleteAll = (req, res) => {
  db.competition.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Competitions were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all competitions."
      });
    });

};

// Find all published Competitions
exports.findAllPublished = (req, res) => {

  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  db.competition.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving competitions."
      });
    });

};

// Add a User to a Competition
exports.addUser = (competitionId, userId) => {
  return db.competition.findByPk(competitionId)
    .then((competition) => {
      if (!competition) {
        console.log("Competition not found!");
        return null;
      }
      return db.user.findByPk(userId).then((user) => {
        if (!user) {
          console.log("User not found!");
          return null;
        }

        competition.addUser(user);
        console.log(`>> added User id=${user.id} to Competition id=${competition.id}`);
        return competition;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding User to Competition: ", err);
    });
};