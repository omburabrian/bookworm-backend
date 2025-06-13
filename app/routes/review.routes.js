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
  //  router.get("/reviews/:id", Review.findOne);

  //  Retrieve a single Review with user ID and book ID
  //  This is a bridge table.  Need 2 IDs.
  router.get("/reviews/users/:userId/books/:bookId", Review.findOne);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //  AUTHENTICATED ROUTES

  // Retrieve all reviews for user
  router.get(
    "/reviews/users/:userId",
    [authenticateRoute],
    Review.findAllForUser
  );

  // Create a new Review
  router.post("/reviews", [authenticateRoute], Review.create);

  // Update a Review with user ID and book ID
  router.put(
    "/reviews/users/:userId/books/:bookId",
    [authenticateRoute],
    Review.updateForUserIdBookId
  );
  
  // Update a Review with id
  //  ToDo:  Remove this route.  Does not use its own ID field.
  router.put("/reviews/:id", [authenticateRoute], Review.update);

  //  ToDo:  Remove this route.  Does not use its own ID field.
  // Delete a Review with id
  router.delete("/reviews/:id", [authenticateRoute], Review.delete);

  // Delete a Review with user ID and book ID
  router.delete(
    "/reviews/users/:userId/books/:bookId",
    [authenticateRoute],
    Review.deleteForUserIdBookId
  );

  // Delete all Reviews
  router.delete("/reviews", [authenticateRoute], Review.deleteAll);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //  Dev tools
  router.post("/reviews/bulkCreate", [authenticateRoute], Review.bulkCreate);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  app.use("/bookwormapi", router);
};
