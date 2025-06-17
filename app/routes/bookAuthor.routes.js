module.exports = (app) => {
  const BookAuthor = require("../controllers/bookAuthor.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new BookAuthor link
  router.post("/bookAuthors/" ,[authenticateRoute], BookAuthor.linkMultiple); // expects { bookId, authorId }

  // Unlink a book from an author
  router.delete("/bookAuthors/",BookAuthor.unlink); // expects { bookId, authorId }

  // Get all authors for a book
  router.get("/bookAuthors/byBook/:bookId", BookAuthor.findAuthorsByBook);

  // Get all books for an author
  router.get("/bookAuthors/byAuthor/:authorId", BookAuthor.findBooksByAuthor);

  // Unlink all authors from a book
  router.delete("/bookAuthors/byBook/:bookId", BookAuthor.unlinkByBook);
  // Unlink all books from an author
  router.delete("/bookAuthors/byAuthor/:authorId", BookAuthor.unlinkByAuthor);

  app.use("/bookwormapi", router);
};
