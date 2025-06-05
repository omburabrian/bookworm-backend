module.exports = (app) => {
  const Book = require("../controllers/book.controller.js");
  var router = require("express").Router();

  // Create a new Book
  router.post("/books/", Book.create);
  // Retrieve all Books
  router.get("/books/", Book.findAll);
  // Retrieve a single Book with bookId
  router.get("/books/:id", Book.findOne);
  // Update a Book with bookId
  router.put("/books/:id", Book.update);
  // Delete a Book with bookId
  router.delete("/books/:id", Book.delete);
  // Delete all Books
  router.delete("/books/", Book.deleteAll);
  
  app.use("/bookwormapi", router);
};
