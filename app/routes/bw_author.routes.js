module.exports = (app) => {

  const BwAuthor = require("../controllers/bw_author.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new BwAuthor
  router.post("/bwauthors/",[authenticateRoute], BwAuthor.create);

  // Retrieve all Authors
  router.get("/bwauthors/", BwAuthor.findAll);

  // Retrieve a single BwAuthor with bookId
  router.get("/bwauthors/:id", BwAuthor.findOne);

    // Update a BwAuthor with bookId
  router.put("/bwauthors/:id", [authenticateRoute], BwAuthor.update);

  // Delete a BwAuthor with bookId
  router.delete("/bwauthors/:id",[authenticateRoute],  BwAuthor.delete);

  // Delete all Authors
  router.delete("/bwauthors/", [authenticateRoute], BwAuthor.deleteAll);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //  Dev tools
  router.post("/bwauthors/bulkCreate", [authenticateRoute], BwAuthor.bulkCreate);


  app.use("/bookwormapi", router);
};
