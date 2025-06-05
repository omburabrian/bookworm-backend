module.exports = (app) => {
  const BookAuthor = require("../controllers/bookAuthor.controller.js");
  const router = require("express").Router();

  // Create a new BookAuthor link
  router.post("/bookAuthors/", BookAuthor.link); // expects { bookId, authorId }

  // Unlink a book from an author
  router.delete("/bookAuthors/", BookAuthor.unlink); // expects { bookId, authorId }

  // Get all authors for a book
  router.get("/bookAuthors/byBook/:bookId", BookAuthor.findAuthorsByBook);

  // Get all books for an author
  router.get("/bookAuthors/byAuthor/:authorId", BookAuthor.findBooksByAuthor);

  app.use("/bookwormapi", router);
};
