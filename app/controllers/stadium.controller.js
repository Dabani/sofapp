const db = require("../models");
// const { user } = require("../models");
const User = db.user;
const Profile = db.profile;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: stadiums } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, stadiums, totalPages, currentPage };
};

// Create and Save a new Stadium
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Stadium
  const stadium = {
    federationId: req.body.federationId,
    name: req.body.name,
    slug: req.body.slug,
    description: req.body.description,
    location: req.body.location,
    seats: req.body.seats,
    dateOfConstruction: req.body.dateOfConstruction,
    dateOfRehabilitation: req.body.dateOfRehabilitation,
    groundType: req.body.groundType,
    groundWidth: req.body.groundWidth,
    groundLength: req.body.groundLength,
    dressRoom: req.body.dressRoom,
    pressRoom: req.body.pressRoom,
    washRoom: req.body.washRoom,
    controlRoom: req.body.controlRoom,
    scorePanel: req.body.scorePanel,
    stadiumLights: req.body.stadiumLights,
    state: req.body.state,
    imageUrl: req.body.imageUrl,
    published: req.body.published ? req.body.published : false
  };

  // Save Stadium in the database
  db.stadium.create(stadium)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Stadium."
      });
    });

};

// Retrieve all Stadiums from the database.
exports.findAll = (req, res) => {

  const { page, size, name } = req.query;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  db.stadium.findAndCountAll({
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
          err.message || "Some error occurred while retrieving stadiums."
      });
    });

};

// Find a single Stadium with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  db.stadium.findByPk(id, {
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
        message: "Error retrieving Stadium with id=" + id
      });
    });

};

// Update a Stadium by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  db.stadium.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Stadium was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Stadium with id=${id}. Maybe Stadium was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Stadium with id=" + id
      });
    });
};

// Delete a Stadium with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  db.stadium.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Stadium was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Stadium with id=${id}. Maybe Stadium was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Stadium with id=" + id
      });
    });
};

// Delete all Stadiums from the database.
exports.deleteAll = (req, res) => {
  db.stadium.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Stadiums were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all stadiums."
      });
    });

};

// Find all published Stadiums
exports.findAllPublished = (req, res) => {

  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  db.stadium.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stadiums."
      });
    });

};

// Add a User to a Stadium
exports.addUser = (stadiumId, userId) => {
  return db.stadium.findByPk(stadiumId)
    .then((stadium) => {
      if (!stadium) {
        console.log("Stadium not found!");
        return null;
      }
      return db.user.findByPk(userId).then((user) => {
        if (!user) {
          console.log("User not found!");
          return null;
        }

        stadium.addUser(user);
        console.log(`>> added User id=${user.id} to Stadium id=${stadium.id}`);
        return stadium;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding User to Stadium: ", err);
    });
};