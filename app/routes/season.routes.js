module.exports = app => {
  const seasons = require("../controllers/season.controller");
  //const seasons = app.db.models.seasons;
  var router = require("express").Router();

  // Create a new Season
  router.post("/", seasons.create);

  // Retrieve all Seasons
  router.get("/", seasons.findAll);

  // Retrieve all published Seasons
  router.get("/published", seasons.findAllPublished);

  // Retrieve a single Season with id
  router.get("/:id", seasons.findOne);

  // Update a Season with id
  router.put("/:id", seasons.update);

  // Delete a Season with id
  router.delete("/:id", seasons.delete);

  // Delete all Seasons
  router.delete("/", seasons.deleteAll);

  app.use('/api/seasons', router);
};