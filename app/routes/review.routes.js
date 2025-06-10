module.exports = (app) => {

  const Review = require("../controllers/review.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //  PUBLIC ROUTES

  // Retrieve all Reviews
  router.get(
    "/reviews",
    Review.findAll
  );

  // Retrieve a single Review with id
  router.get("/reviews/:id", Review.findOne);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //  AUTHENTICATED ROUTES

  // Retrieve all reviews for user
  router.get(
    "/reviews/user/:userId",
    [authenticateRoute],
    Review.findAllForUser
  );

  // Create a new Review
  router.post("/reviews", [authenticateRoute], Review.create);

  // Update a Review with id
  router.put("/reviews/:id", [authenticateRoute], Review.update);

  // Delete a Review with id
  router.delete("/reviews/:id", [authenticateRoute], Review.delete);

  // Delete all Reviews
  router.delete("/reviews", [authenticateRoute], Review.deleteAll);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //  Dev tools
  router.post("/reviews/bulkCreate", [authenticateRoute], Review.bulkCreate);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  app.use("/bookwormapi", router);
};
