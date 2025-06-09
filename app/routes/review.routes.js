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
  router.get("/reviews/users/:userId/books/:bwBookId", Review.findOne);

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

  // Update a Review with id
  router.put("/reviews/:id", [authenticateRoute], Review.update);

  //  ToDo:  Revise this route to accept both, book id and user id
  //          (It's a bridge table.  Model after delete recipe ingreedient. see below)
  //          See the get() above.
  // Delete a Review with id
  router.delete("/reviews/:id", [authenticateRoute], Review.delete);
  /*
  // Delete a Recipe Ingredient with id
  router.delete(
    "/recipes/:recipeId/recipeIngredients/:id",
    [authenticateRoute],
    RecipeIngredient.delete
  );
  //  */

  // Delete all Reviews
  router.delete("/reviews", [authenticateRoute], Review.deleteAll);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //  Dev tools
  router.post("/reviews/bulkCreate", [authenticateRoute], Review.bulkCreate);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  app.use("/bookwormapi", router);
};
