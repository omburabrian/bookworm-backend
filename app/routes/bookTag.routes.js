module.exports = (app) => {
  const BookTag = require("../controllers/bookTag.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new BookTag link
  router.post("/bookTags/" ,[authenticateRoute], BookTag.linkMultiple); // expects { bookId, tagId }

  // Unlink a book from an tag
  router.delete("/bookTags/",BookTag.unlink); // expects { bookId, tagId }

  // Get all tags for a book
  router.get("/bookTags/byBook/:bookId", BookTag.findTagsByBook);

  // Get all books for an tag
  router.get("/bookTags/byTag/:tagId", BookTag.findBooksByTag);

  // Unlink all tags from a book
  router.delete("/bookTags/byBook/:bookId", BookTag.unlinkByBook);
  // Unlink all books from an tag
  router.delete("/bookTags/byTag/:tagId", BookTag.unlinkByTag);

  app.use("/bookwormapi", router);
};