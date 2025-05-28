module.exports = (app) => {
  const Author = require("../controllers/author.controller.js");
  const router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new Author
  router.post("/authors/", Author.create);

  // Retrieve all Authors
  router.get("/authors/", Author.findAll);

  // Retrieve a single Author with authorId
  router.get("/authors/:id", Author.findOne);

  // Update an Author with authorId
  router.put("/authors/:id", Author.update);

  // Delete an Author with authorId
  router.delete("/authors/:id", Author.delete);

  // Delete all Authors
  router.delete("/authors/",  Author.deleteAll);

  app.use("/bookwormapi", router);
};
