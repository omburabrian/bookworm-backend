module.exports = (app) => {
  const BookAuthor = require("../controllers/bookAuthor.controller.js");
  const router = require("express").Router();

  // Create a new BookAuthor link
  router.post("/bookAuthors/" ,[authenticateRoute], BookAuthor.linkMultiple); // expects { bookId, authorId }

  // Unlink a book from an author
  router.delete("/bookAuthors/",[authenticateRoute], BookAuthor.unlink); // expects { bookId, authorId }

  // Get all authors for a book
  router.get("/bookAuthors/byBook/:bookId", BookAuthor.findAuthorsByBook);

  // Get all books for an author
  router.get("/bookAuthors/byAuthor/:authorId", BookAuthor.findBooksByAuthor);

  // Unlink all authors from a book
  router.delete("/bookAuthors/byBook/:bookId",[authenticateRoute], BookAuthor.unlinkByBook);
  // Unlink all books from an author
  router.delete("/bookAuthors/byAuthor/:authorId",[authenticateRoute], BookAuthor.unlinkByAuthor);

  app.use("/bookwormapi", router);
};
