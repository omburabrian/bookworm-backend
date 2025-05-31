module.exports = (app) => {

  const Review = require("../controllers/review.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //  PUBLIC ROUTES

  // Retrieve all Reviews
  router.get(
    "/reviews",
    Review.getAll
  );

  // Retrieve a single Review with id
  router.get("/reviews/:id", Review.getOne);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //  AUTHENTICATED ROUTES

  // Retrieve all reviews for user
  router.get(
    "/reviews/user/:userId",
    [authenticateRoute],
    Review.getAllForUser
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
  app.use("/bookwormapi", router);
};
