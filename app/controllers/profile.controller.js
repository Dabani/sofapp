const db = require("../models");
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: profiles } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, profiles, totalPages, currentPage };
};

// Create and Save a new Profile
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Profile
  const profile = {
    userId:req.body.userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    otherName: req.body.otherName,
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
    placeOfBirth: req.body.placeOfBirth,
    nationalityAtBirth: req.body.nationalityAtBirth,
    nationalityCurrent: req.body.nationalityCurrent,
    biography: req.body.biography,
    telephone: req.body.telephone,
    webUrl: req.body.webUrl,
    state: req.body.state,
    published: req.body.published ? req.body.published : false
  };

  // Save Profile in the database
  db.profile.create(profile)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Profile."
      });
    });

};

// Retrieve all Profiles from the database.
exports.findAll = (req, res) => {

  const { page, size, firstName } = req.query;
  var condition = firstName ? { firstName: { [Op.like]: `%${firstName}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  db.profile.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving profiles."
      });
    });

};

// Find a single Profile with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  db.profile.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Profile with id=" + id
      });
    });

};

// Update a Profile by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  db.profile.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Profile was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Profile with id=${id}. Maybe Profile was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Profile with id=" + id
      });
    });
};

// Delete a Profile with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  db.profile.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Profile was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Profile with id=${id}. Maybe Profile was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Profile with id=" + id
      });
    });
};

// Delete all Profiles from the database.
exports.deleteAll = (req, res) => {
  db.profile.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Profiles were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all profiles."
      });
    });

};

// Find all published Profiles
exports.findAllPublished = (req, res) => {

  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  db.profile.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving profiles."
      });
    });

};