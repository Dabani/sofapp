module.exports = app => {
  const subscriptions = require("../controllers/subscription.controller");
  //const subscriptions = app.db.models.subscriptions;
  var router = require("express").Router();

  // Create a new Subscription
  router.post("/", subscriptions.create);

  // Retrieve all Subscriptions
  router.get("/", subscriptions.findAll);

  // Retrieve all published Subscriptions
  router.get("/published", subscriptions.findAllPublished);

  // Retrieve a single Subscription with id
  router.get("/:id", subscriptions.findOne);

  // Update a Subscription with id
  router.put("/:id", subscriptions.update);

  // Delete a Subscription with id
  router.delete("/:id", subscriptions.delete);

  // Delete all Subscriptions
  router.delete("/", subscriptions.deleteAll);

  app.use('/api/subscriptions', router);
};