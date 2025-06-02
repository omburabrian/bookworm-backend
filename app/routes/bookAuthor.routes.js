module.exports = (app) => {
  const BookAuthor = require("../controllers/bookAuthor.controller.js");
  var router = require("express").Router();

  router.post("/bookAuthors/", BookAuthor.create);
  router.get("/bookAuthors/", BookAuthor.findAll);
  router.get("/bookAuthors/:id", BookAuthor.findOne);
  router.put("/bookAuthors/:id", BookAuthor.update);
  router.delete("/bookAuthors/:id", BookAuthor.delete);
  router.delete("/bookAuthors/", BookAuthor.deleteAll);

  app.use("/bookwormapi", router);
};
