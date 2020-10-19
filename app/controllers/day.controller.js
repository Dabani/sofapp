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
  const { count: totalItems, rows: days } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, days, totalPages, currentPage };
};

// Create and Save a new Day
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Day
  const day = {
    matchDay: req.body.matchDay,
    name: req.body.name,
    slug: req.body.slug,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Day in the database
  db.day.create(day)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Day."
      });
    });

};

// Retrieve all Days from the database.
exports.findAll = (req, res) => {

  const { page, size, name } = req.query;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  db.day.findAndCountAll({
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
          err.message || "Some error occurred while retrieving days."
      });
    });

};

// Find a single Day with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  db.day.findByPk(id, {
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
      }
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Day with id=" + id
      });
    });

};

// Update a Day by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  db.day.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Day was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Day with id=${id}. Maybe Day was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Day with id=" + id
      });
    });
};

// Delete a Day with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  db.day.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Day was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Day with id=${id}. Maybe Day was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Day with id=" + id
      });
    });
};

// Delete all Days from the database.
exports.deleteAll = (req, res) => {
  db.day.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Days were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all days."
      });
    });

};

// Find all published Days
exports.findAllPublished = (req, res) => {

  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  db.day.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving days."
      });
    });

};

// Add a User to a Day
exports.addUser = (dayId, userId) => {
  return db.day.findByPk(dayId)
    .then((day) => {
      if (!day) {
        console.log("Day not found!");
        return null;
      }
      return db.user.findByPk(userId).then((user) => {
        if (!user) {
          console.log("User not found!");
          return null;
        }

        day.addUser(user);
        console.log(`>> added User id=${user.id} to Day id=${day.id}`);
        return day;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding User to Day: ", err);
    });
};