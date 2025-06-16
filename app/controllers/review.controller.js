const db = require("../models");
const Review = db.review;

const Book = db.book;
const Author = db.author;

const Op = db.Sequelize.Op;

//  These functions must match those mapped from review.routes.js
//  ToDo:  No "await"s used.  Should it be?

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Create and Save a new Review
exports.create = (req, res) => {

  // Validate request
  if (req.body.rating === undefined) {
    const error = new Error("Book rating is required");
    error.statusCode = 400;
    throw error;
  } else if (req.body.reviewText === undefined) {
    const error = new Error("Book review text is required");
    error.statusCode = 400;
    throw error;
  }

  // Create a Review
  const review = {
    rating: req.body.rating,
    reviewText: req.body.reviewText,
    userId: req.body.userId,
    bookId: req.body.bookId
  };

  // Save Review in the database
  Review.create(review)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while creating the book review.",
      });
    });
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Get all reviews for a user
exports.findAllForUser = (req, res) => {

  const userId = req.params.userId;

  Review.findAll({
    where: { userId: userId },
    include: [
      {
        model: Book,
        required: true,
        include: [
          {
            model: Author,
            required: false,
          },
        ],
      },
    ],
    order: [
      [Book, "title", "ASC"],
      //   Or by review date?
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find book reviews for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving book reviews for user with id=" + userId,
      });
    });
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Get all reviews
exports.findAll = (req, res) => {
  Review.findAll({
    include: [
      {
        model: Book,
        required: true,
        include: [
          {
            model: Author,
            required: false,
          },
        ],
      },
    ],
    order: [
      [Book, "title", "ASC"],
      //   Or by review date?  Or author?
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find book reviews.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving book reviews.",
      });
    });
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Get a single review with the id
exports.findOne = (req, res) => {

  const userId = req.params.userId;
  const bookId = req.params.bookId;

  Review.findAll({
    where: {
      userId: userId,
      bookId: bookId
    },
    include: [
      {
        model: Book,
        required: true,
        include: [
          {
            model: Author,
            required: false,
          },
        ],
      },
    ],
    //  There should only be 1 review with this
    //  user / book combination, so order not needed.
    /*
    order: [
      [Book, "title", "ASC"],
      //   Or by review date?  Or author?
    ],
    //  */
  })
    .then((data) => {
      //  ToDo:  If *the* REVIEW is found, then return as object, not array.
      //  ToDo:  If not found (empty array), then . . . return cannot find, instead.
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find book review with user ID = ${userId}, book ID = ${bookId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving book review with user ID = ${userId}, book ID = ${bookId}.`,
      });
    });
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Update a Review by the id in the request
exports.updateForUserIdBookId = (req, res) => {

  const userId = req.params.userId;
  const bookId = req.params.bookId;

  console.log("Review controller : updateForUserIdBookId(" + userId + ", " + bookId + ")");

  Review.update(req.body, {
    where: [
      {userId: userId},
      {bookId: bookId}
    ]
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Book review was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update book review with user ID = ${userId}, book ID = ${bookId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating boook review with user ID = " + userId + ", book ID = " + bookId,
      });
    });
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Delete a book review with the specified user ID and book ID.
exports.deleteForUserIdBookId = (req, res) => {

  const userId = req.params.userId;
  const bookId = req.params.bookId;

  //  console.log("Review controller: deleteForUserIdBookId(" + userId + ", " + bookId + ")");

  Review.destroy({
    where: [
      {userId: userId},
      {bookId: bookId}
    ]
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Book review was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete book review with user ID = ${userId}, book ID = ${bookId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete book review with user ID = " + userId + ", book ID = " + bookId
      });
    });
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Delete all book reviews from the database.
exports.deleteAll = (req, res) => {

  //  ToDo:  What about using >>>  await Review.truncate(); ?

  Review.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} book reviews were successfully deleted` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while deleting all book reviews.",
      });
    });
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  Create multiple reviews at once (from JSON array)
exports.bulkCreate = (req, res) => {

  //  Create a collection of reviews directly from the JSON array in the body.
  const reviews = req.body;

  console.log(reviews);

  Review.bulkCreate(reviews)
    .then((data) => {
      res.send(data);
      //  - OR ? - res.send({ message: `${number} book reviews were created successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred during bulk creation of reviews.",
      });
    });
};
