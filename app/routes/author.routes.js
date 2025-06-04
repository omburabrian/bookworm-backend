module.exports = (app) => {
  const Author = require("../controllers/author.controller.js");
  const router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new Author
  router.post("/authors/", [authenticateRoute], Author.create);

  // Retrieve all Authors
  router.get("/authors/", Author.findAll);

  // Retrieve a single Author with authorId
  router.get("/authors/:id", Author.findOne);

  // Update an Author with authorId
  router.put("/authors/:id", [authenticateRoute], Author.update);

  // Delete an Author with authorId
  router.delete("/authors/:id", [authenticateRoute], Author.delete);

  // Delete all Authors
  router.delete("/authors/", [authenticateRoute], Author.deleteAll);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //  Dev tools
    router.post("/authors/bulkCreate", [authenticateRoute], Author.bulkCreate);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  app.use("/bookwormapi", router);
};
