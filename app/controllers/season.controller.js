const db = require("../models");
const User = db.user;
const Profile = db.profile;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: seasons } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, seasons, totalPages, currentPage };
};

// Create and Save a new Season
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Season
  const season = {
    federationId: req.body.federationId,
    name: req.body.name,
    slug: req.body.slug,
    description: req.body.description,
    seasonStart: req.body.seasonStart,
    seasonEnd: req.body.seasonEnd,
    state: req.body.state,
    published: req.body.published ? req.body.published : false
  };

  // Save Season in the database
  db.season.create(season)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Season."
      });
    });

};

// Retrieve all Seasons from the database.
exports.findAll = (req, res) => {

  const { page, size, name } = req.query;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  db.season.findAndCountAll({
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
    where: condition, limit, offset
  })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving seasons."
      });
    });

};

// Find a single Season with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  db.season.findByPk(id, {
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
        message: "Error retrieving Season with id=" + id
      });
    });

};

// Update a Season by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  db.season.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Season was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Season with id=${id}. Maybe Season was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Season with id=" + id
      });
    });
};

// Delete a Season with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  db.season.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Season was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Season with id=${id}. Maybe Season was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Season with id=" + id
      });
    });
};

// Delete all Seasons from the database.
exports.deleteAll = (req, res) => {
  db.season.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Seasons were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all seasons."
      });
    });

};

// Find all published Seasons
exports.findAllPublished = (req, res) => {

  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  db.season.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving seasons."
      });
    });

};

// Add a User to a Season
exports.addUser = (seasonId, userId) => {
  return db.season.findByPk(seasonId)
    .then((season) => {
      if (!season) {
        console.log("Season not found!");
        return null;
      }
      return db.user.findByPk(userId).then((user) => {
        if (!user) {
          console.log("User not found!");
          return null;
        }

        season.addUser(user);
        console.log(`>> added User id=${user.id} to Season id=${season.id}`);
        return season;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding User to Season: ", err);
    });
};