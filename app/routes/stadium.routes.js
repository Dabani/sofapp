module.exports = app => {
  const stadiums = require("../controllers/stadium.controller");
  //const stadiums = app.db.models.stadiums;
  var router = require("express").Router();

  // Create a new Stadium
  router.post("/", stadiums.create);

  // Retrieve all Stadiums
  router.get("/", stadiums.findAll);

  // Retrieve all published Stadiums
  router.get("/published", stadiums.findAllPublished);

  // Retrieve a single Stadium with id
  router.get("/:id", stadiums.findOne);

  // Update a Stadium with id
  router.put("/:id", stadiums.update);

  // Delete a Stadium with id
  router.delete("/:id", stadiums.delete);

  // Delete all Stadiums
  router.delete("/", stadiums.deleteAll);

  app.use('/api/stadiums', router);
};