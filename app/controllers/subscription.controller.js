const db = require("../models");
const { federation } = require("../models");
// const { user } = require("../models");
const User = db.user;
const Profile = db.profile;
const Federation = db.federation;
const League = db.league;
const Competition = db.competition;
const Season = db.season;
const Team = db.team;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: subscriptions } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, subscriptions, totalPages, currentPage };
};

// Create and Save a new Subscription
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Subscription
  const subscription = {
    federationId: req.body.federationId,
    leagueId: req.body.leagueId,
    competitionId: req.body.competitionId,
    seasonId: req.body.seasonId,
    teamId: req.body.teamId,
    state: req.body.state,
    published: req.body.published ? req.body.published : false
  };

  // Save Subscription in the database
  db.subscription.create(subscription)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Subscription."
      });
    });

};

// Retrieve all Subscriptions from the database.
exports.findAll = (req, res) => {

  const { page, size, name } = req.query;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  db.subscription.findAndCountAll({
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
        model: Team,
        attributes: ["name"]
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
          err.message || "Some error occurred while retrieving subscriptions."
      });
    });

};

// Find a single Subscription with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  db.subscription.findByPk(id, {
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
        model: Team,
        attributes: ["name"]
      }
    ],
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Subscription with id=" + id
      });
    });

};

// Update a Subscription by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  db.subscription.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Subscription was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Subscription with id=${id}. Maybe Subscription was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Subscription with id=" + id
      });
    });
};

// Delete a Subscription with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  db.subscription.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Subscription was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Subscription with id=${id}. Maybe Subscription was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Subscription with id=" + id
      });
    });
};

// Delete all Subscriptions from the database.
exports.deleteAll = (req, res) => {
  db.subscription.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Subscriptions were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all subscriptions."
      });
    });

};

// Find all published Subscriptions
exports.findAllPublished = (req, res) => {

  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  db.subscription.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving subscriptions."
      });
    });

};

// Add a User to a Subscription
exports.addUser = (subscriptionId, userId) => {
  return db.subscription.findByPk(subscriptionId)
    .then((subscription) => {
      if (!subscription) {
        console.log("Subscription not found!");
        return null;
      }
      return db.user.findByPk(userId).then((user) => {
        if (!user) {
          console.log("User not found!");
          return null;
        }

        subscription.addUser(user);
        console.log(`>> added User id=${user.id} to Subscription id=${subscription.id}`);
        return subscription;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding User to Subscription: ", err);
    });
};