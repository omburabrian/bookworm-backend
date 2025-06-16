module.exports = (app) => {
  const UserBooks = require("../controllers/userBooks.controller.js");
  var router = require("express").Router();

    // Create a new UserBook entry
    router.post("/userBooks/", UserBooks.add);      
    // Retrieve all books for a specific user
    router.get("/userBooks/:userId", UserBooks.findByUser);
    // Remove a book from a user's list
    router.delete("/userBooks/", UserBooks.remove); 
    //check if a book is in a user's list
    router.get("/userBooks/check/:userId/:bookId", UserBooks.checkBookInUserList);
    //Update a UserBook entry
    router.put("/userBooks/update/:userId/:bookId", UserBooks.updateUserBook);



  app.use("/bookwormapi", router);
};
