module.exports = app => {
  const fixtures = require("../controllers/fixture.controller");
  //const fixtures = app.db.models.fixtures;
  var router = require("express").Router();

  // Create a new Fixture
  router.post("/", fixtures.create);

  // Retrieve all Fixtures
  router.get("/", fixtures.findAll);

  // Retrieve all published Fixtures
  router.get("/published", fixtures.findAllPublished);

  // Retrieve a single Fixture with id
  router.get("/:id", fixtures.findOne);

  // Update a Fixture with id
  router.put("/:id", fixtures.update);

  // Delete a Fixture with id
  router.delete("/:id", fixtures.delete);

  // Delete all Fixtures
  router.delete("/", fixtures.deleteAll);

  app.use('/api/fixtures', router);
};