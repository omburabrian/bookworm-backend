module.exports = (app) => {
  const TagType = require("../controllers/tagType.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // create a tag type
  router.post("/tagTypes/",[authenticateRoute], TagType.create);
    // Retrieve all tag types
  router.get("/tagTypes/", TagType.findAll);
    // Retrieve a single tag type with id
  router.get("/tagTypes/:id", TagType.findOne);
    // update a tag type with id
  router.put("/tagTypes/:id", [authenticateRoute], TagType.update);
    // Delete a tag type with id
  router.delete("/tagTypes/:id",[authenticateRoute],  TagType.delete);
    // Delete all tag types
  router.delete("/tagTypes/", [authenticateRoute], TagType.deleteAll);
  
  app.use("/bookwormapi", router);
};