module.exports = (app) => {
  const UserBooks = require("../controllers/userBooks.controller.js");
  var router = require("express").Router();

    // Create a new UserBook entry
    router.post("/userBooks/", UserBooks.add);      
    // Retrieve all books for a specific user
    router.get("/userBooks/:userId", UserBooks.findByUser);
    // Remove a book from a user's list
    router.delete("/userBooks/", UserBooks.remove); 


  app.use("/bookwormapi", router);
};
