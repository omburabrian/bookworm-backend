// controllers/readingScheduleController.js
const db = require("../models");
const UserBooks = db.userBooks;
const Book = db.book;
const { Op } = db.Sequelize;

//create a reading schedule
exports.createSchedule = async (req, res) => {
  const { userId, bookId } = req.params;
  const {
    startDate,
    stopDate,
    listType = "Reading", //set defaults
    currentPage = 0,
  } = req.body;

  try {
    const existing = await UserBooks.findOne({
      where: { userId, bookId },
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "This book is already in your schedule." });
    }

    const newEntry = await UserBooks.create({
      userId,
      bookId,
      listType,
      startDate,
      stopDate,
      currentPage,
    });

    res.status(201).json(newEntry);
  } catch (err) {
    console.error("Error creating reading schedule:", err);
    res.status(500).send({ message: "Error creating reading schedule" });
  }
};
//compute a reading schedule for a reader
exports.computeSchedule = async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const { startDate, stopDate } = req.body;
    if (!startDate) {
      return res.status(400).send({ message: "start date required" });
    }
    if (!stopDate) {
      return res.status(400).send({ message: "stop date required" });
    }
    // fetch the readers's book information from books
    const userBook = await UserBooks.findOne({
      where: { userId, bookId },
      include: [
        {
          model: Book,
          attributes: ["id", "title", "pageCount"],
        },
      ],
    });
    if (!userBook) {
      return res.status(404).send({ message: "Book not found!" });
    }
    if (!userBook.book) {
      return res
        .status(404)
        .send({ message: "Book not found in books record." });
    }
    // math stuff
    const start = new Date(startDate);
    const stop = new Date(stopDate);
    const daysLeft = Math.ceil((stop - start) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 0) {
      return res
        .status(400)
        .send({ message: "stop date has to be after start date" });
    }
    const pagesLeft = userBook.book.pageCount - userBook.currentPage;
    const dailyPages = Math.ceil(pagesLeft / daysLeft);

    res.send({
      bookId,
      bookTitle: userBook.book.title,
      currentPage: userBook.currentPage,
      totalPages: userBook.book.pageCount,
      pagesLeft,
      daysLeft,
      dailyPages,
      startDate: startDate,
      endDate: stopDate,
    });
  } catch (err) {
    res.status(500).send({
      message: "cannot calculate schedule " + err.message,
    });
  }
};

//Update reader's reading progress
exports.updateReadingProgress = async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const { currentPage, notes, listType } = req.body;

    // Get reader's book information
    const userBook = await UserBooks.findOne({
      where: { userId, bookId },
      include: {
        model: Book,
        attributes: ["id", "title", "description", "pageCount"],
      },
    });

    if (!userBook) {
      return res.status(404).send({ message: "Book not found!" });
    }

    // Update reading progress
    userBook.listType = listType;
    userBook.currentPage = currentPage;
    userBook.notes = notes || userBook.notes;

    // Mark as completed if reached the end of the book
    if (userBook.book.pageCount && currentPage >= userBook.book.pageCount) {
      userBook.listType = "Finished";
      userBook.stopDate = new Date();
    }

    await userBook.save();

    res.send({ data: userBook, message: "Reading progress updated" });
  } catch (err) {
    res.status(500).send({
      message: "Failed to update progress: " + err.message,
    });
  }
};

//get reading stats for a book
exports.getReadingStatsForOne = async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    const readingStats = await Promise.all([
      UserBooks.count({ where: { userId, bookId, listType: "planned" } }),
      UserBooks.count({ where: { userId, bookId, listType: "reading" } }),
      UserBooks.count({ where: { userId, bookId, listType: "finished" } }),

      // Average reading time for completed books
      UserBooks.findOne({
        where: {
          userId,
          listType: "finished",
          startDate: { [db.Sequelize.Op.ne]: null },
          stopDate: { [db.Sequelize.Op.ne]: null },
        },
        attributes: [
          [
            db.sequelize.fn(
              "AVG",
              db.sequelize.literal("DATEDIFF(stopDate, startDate)")
            ),
            "avgDaysToComplete",
          ],
        ],
        raw: true,
      }),
    ]);

    res.send({
      plannedReading: readingStats[0],
      currentReading: readingStats[1],
      finishedReading: readingStats[2],
      totalBooks: readingStats[0] + readingStats[1] + readingStats[2],
      estimatedDaysToComplete: readingStats[3]?.avgDaysToComplete
        ? Math.round(readingStats[3].avgDaysToComplete)
        : 0,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Failed to get reading stats: " + err.message,
    });
  }
};
// Delete a reading schedule
exports.removeSchedule = (req, res) => {
  const { userId, bookId } = req.params;
  UserBooks.destroy({
    where: { userId, bookId },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Record was deleted successfully!",
        });
      } else {
        res.send({
          message: `Record not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete record",
      });
    });
};
exports.getOwnedBooks = (req, res) => {
  const { userId } = req.params;

  UserBooks.findAll({
    where: { userId, isOwned:true },
    include: [
      {
        model: Book,
        attributes: [
          "id",
          "isbn",
          "title",
          "date",
          "description",
          "pageCount",
          
        ],
      },
    ],
  })
    .then((userBooks) => {
      if (userBooks.length===0) {
        return res.status(404).send({ message: "User book not found" });
      }
      res.send(userBooks);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.getUserBookDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const userBooks = await UserBooks.findAll({
      where: { userId },
      include: [
        {
          model: Book,
          attributes: [
            "id",
            "isbn",
            "title",
            "date",
            "description",
            "pageCount",
            "cover",
          ],
        },
      ],
    });

    if (!userBooks || userBooks.length === 0) {
      return res.status(404).send({ message: "No books found for this user." });
    }

    res.send(userBooks);
  } catch (err) {
    res.status(500).send({
      message: "Failed to fetch user books: " + err.message,
    });
  }
};
