module.exports = app => {
  const competitions = require("../controllers/competition.controller");
  //const competitions = app.db.models.competitions;
  var router = require("express").Router();

  // Create a new Competition
  router.post("/", competitions.create);

  // Retrieve all Competitions
  router.get("/", competitions.findAll);

  // Retrieve all published Competitions
  router.get("/published", competitions.findAllPublished);

  // Retrieve a single Competition with id
  router.get("/:id", competitions.findOne);

  // Update a Competition with id
  router.put("/:id", competitions.update);

  // Delete a Competition with id
  router.delete("/:id", competitions.delete);

  // Delete all Competitions
  router.delete("/", competitions.deleteAll);

  app.use('/api/competitions', router);
};