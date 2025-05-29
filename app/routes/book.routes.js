module.exports = (app) => {
  const books = require("../controllers/book.controller.js");
  var router = require("express").Router();

  // Create a new Book
  router.post("/books", books.create);

  // Retrieve all Books
  router.get("/books", books.findAll);

  // Retrieve a single Book with id
  router.get("/books/:id", books.findOne);

  // Update a Book with id
  router.put("/books/:id", books.update);

  // Delete a Book with id
  router.delete("/books/:id", books.delete);

  // Delete all Books
  router.delete("/books", books.deleteAll);

  app.use("/bookwormapi", router);
};