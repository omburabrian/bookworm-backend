module.exports = (app) => {

  const BwBook = require("../controllers/bw_book.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new BwBook
  router.post("/bwbooks/",[authenticateRoute], BwBook.create);

  // Retrieve all Books
  router.get("/bwbooks/", BwBook.findAll);

  // Retrieve a single BwBook with bookId
  router.get("/bwbooks/:id", BwBook.findOne);

    // Update a BwBook with bookId
  router.put("/bwbooks/:id", [authenticateRoute], BwBook.update);

  // Delete a BwBook with bookId
  router.delete("/bwbooks/:id",[authenticateRoute],  BwBook.delete);

  // Delete all Books
  router.delete("/bwbooks/", [authenticateRoute], BwBook.deleteAll);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //  Dev tools
  router.post("/bwbooks/bulkCreate", [authenticateRoute], BwBook.bulkCreate);


  app.use("/bookwormapi", router);
};
