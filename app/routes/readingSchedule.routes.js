module.exports = (app) => {
  const ReadingSchedule = require("../controllers/readingSchedule.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // create/update a reading schedule for a user and book
  router.post(
    "/readingSchedule/createSchedule/:userId/:bookId",
    [authenticateRoute],
    ReadingSchedule.createSchedule
  );
  // Update a reading progress
  router.put(
    "/readingSchedule/progress/:userId/:bookId/",
    [authenticateRoute],
    ReadingSchedule.updateReadingProgress
  );
  //get user owned books
  router.get(
    "/readingSchedule/owned/:userId",
    ReadingSchedule.getOwnedBooks
  );

  //get reading stats for a single book
  router.get(
    "/readingSchedule/stats/:userId/:bookId",
    ReadingSchedule.getReadingStatsForOne
  );

  //getUser details
  router.get(
    "/readingSchedule/userBooks/:userId",
    ReadingSchedule.getUserBookDetails
  );

  // Delete a reading schedule
  router.delete(
    "/readingSchedule/remove/:userId/:bookId",
    ReadingSchedule.removeSchedule
  );
  app.use("/bookwormapi", router);
};
