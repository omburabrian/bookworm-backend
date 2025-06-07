const db = require("../models");
const Review = db.review;

//  TEST @@@@@@@@@@@@@@@@@@@##################### Change relation to these other tables
const BwBook = db.bw_book;
const BwAuthor = db.bw_author;
//  const Book = db.book;
//  const Author = db.author;

const Op = db.Sequelize.Op;

//  These functions must match those mapped from review.routes.js

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Create and Save a new Review
exports.create = (req, res) => {

  // Validate request
  if (req.body.rating === undefined) {
    const error = new Error("Book rating value must be selected!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.reviewText === undefined) {
    const error = new Error("Book review text cannot be empty!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Review
  const review = {
    rating: req.body.rating,
    reviewText: req.body.reviewText,
    userId: req.body.userId
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
    //  ToDo: Add BOOK to REVIEW
    //  /*
    include: [
      {
        model: BwBook,
        as: "bw_book",
        required: true,
        include: [
          {
            model: BwAuthor,
            //  This is the table name and it must be *plural*.
            as: "bw_authors",
            required: false,
          },
        ],
      },
    ],
    order: [
      //  ["name", "ASC"],
      [BwBook, "title", "ASC"],
      //   Or by review date?
    ],
    //  */
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
    //  /*
    include: [
      {
        model: BwBook,
        as: "bw_book",
        required: true,
        include: [
          {
            model: BwAuthor,
            //  This is the table name and it must be *plural*.
            as: "bw_authors",
            required: false,
          },
        ],
      },
    ],
    order: [
      //  ["name", "ASC"],
      [BwBook, "title", "ASC"],
      //   Or by review date?  Or author?
    ],
    //  */
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

  const id = req.params.id;

  Review.findAll({
    where: { id: id },
    //  /*
    include: [
      {
        model: BwBook,
        as: "bw_book",
        required: false,
        include: [
          {
            model: BwAuthor,
            //  This is the table name and it must be *plural*.
            as: "bw_authors",
            required: false,
          },
        ],
      },
    ],
    order: [
      //  But there should only be 1 review with this id,
      //  so ... don't need this?
      //  ["name", "ASC"],
      [BwBook, "title", "ASC"],
      //   Or by review date?  Or author?
    ],
    //  */
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find book review with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving book review with id=" + id,
      });
    });
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Update a Review by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;

  Review.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Book review was updated successfully.",
        });
      } else {
        res.send({
          //  ToDo:  Change this error message.  User does not know what "req.body" means.
          message: `Cannot update book review with id=${id}. Maybe the book review was not found or req.body is empty?`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating boook review with id=" + id,
      });
    });
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Delete a book review with the specified ID in the request.
exports.delete = (req, res) => {

  const id = req.params.id;

  Review.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Book review was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete book review with id=${id}. Maybe the book review was not found?`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete book review with id=" + id,
      });
    });
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Delete all book reviews from the database.
exports.deleteAll = (req, res) => {
  Review.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} book reviews were deleted successfully!` });
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
      //  res.send({ message: `${number} book reviews were created successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred during bulk creation of reviews.",
      });
    });
};
