module.exports = (app) => {
  const Book = require("../controllers/book.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new Book
  router.post("/books/",[authenticateRoute], Book.create);
  // Retrieve all Books
  router.get("/books/", Book.findAll);
  // Retrieve a single Book with bookId
  router.get("/books/:id", Book.findOne);
  // Update a Book with bookId
  router.put("/books/:id", [authenticateRoute], Book.update);
  // Delete a Book with bookId
  router.delete("/books/:id",[authenticateRoute],  Book.delete);
  // Delete all Books
  router.delete("/books/", [authenticateRoute], Book.deleteAll);

  //  @@@@@@@@@@@@@@@@@@@@@@@@###############################
  //  TESTING:  Get all books with their author(s)
  router.get("/booksWithAuthors/", Book.findAllWithAuthors);

  app.use("/bookwormapi", router);
};
