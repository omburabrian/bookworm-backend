module.exports = (app) => {
  const Tag = require("../controllers/tag.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

    // Create a new tag
  router.post("/tags/",[authenticateRoute], Tag.create);
    // Retrieve all tags
  router.get("/tags/", Tag.findAll);
    // Retrieve a single tag with id
  router.get("/tags/:id", Tag.findOne);
// Retrieve all tags for a tag type
    router.get("/tags/byTagType/:tagTypeId", Tag.findByTagType);
    // Update a tag with id
  router.put("/tags/:id", [authenticateRoute], Tag.update);
    // Delete a tag with id
  router.delete("/tags/:id",[authenticateRoute],  Tag.delete);
    // Delete all tags
  router.delete("/tags/", [authenticateRoute], Tag.deleteAll);
  
  app.use("/bookwormapi", router);
};