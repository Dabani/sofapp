module.exports = app => {
  const days = require("../controllers/day.controller");
  //const days = app.db.models.days;
  var router = require("express").Router();

  // Create a new Day
  router.post("/", days.create);

  // Retrieve all Days
  router.get("/", days.findAll);

  // Retrieve all published Days
  router.get("/published", days.findAllPublished);

  // Retrieve a single Day with id
  router.get("/:id", days.findOne);

  // Update a Day with id
  router.put("/:id", days.update);

  // Delete a Day with id
  router.delete("/:id", days.delete);

  // Delete all Days
  router.delete("/", days.deleteAll);

  app.use('/api/days', router);
};