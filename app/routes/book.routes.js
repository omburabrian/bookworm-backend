module.exports = (app) => {
  const Book = require("../controllers/book.controller.js");
  var router = require("express").Router();

  router.post("/books/", Book.create);
  router.get("/books/", Book.findAll);
  router.get("/books/:id", Book.findOne);
  router.put("/books/:id", Book.update);
  router.delete("/books/:id", Book.delete);
  router.delete("/books/", Book.deleteAll);

  app.use("/bookwormapi", router);
};
