const db = require("../models");

const BwBook = db.bw_book;
const BwAuthor = db.bw_author;
const Op = db.Sequelize.Op;

//-----------------------------------------------------------------
//  Create and save a new BwBook
exports.create = (req, res) => {

  //  Validate request -- for required fields
  if (req.body.isbn === undefined) {
    const error = new Error("BOOK ISBN is required.");
    error.statusCode = 400;
    throw error;
  } else if (req.body.title === undefined) {
    const error = new Error("BOOK TITLE is required.");
    error.statusCode = 400;
    throw error;
  }

  // Create a bw_book / aBwBook
  const aBwBook = {
    isbn: req.body.isbn,
    title: req.body.title,
    publishDate: req.body.publishDate,
    cover: req.body.cover,
    description: req.body.description,
  };

  //  Save aBwBook in the database
  BwBook.create(aBwBook)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while creating the BOOK.",
      });
    });
};

//-----------------------------------------------------------------
//  Find all BOOKS
exports.findAll = (req, res) => {

  BwBook.findAll({
    include: [
      {
        model: BwAuthor,
        as: "bw_authors",
        required: false
      }
    ],
    order: [
      ["title", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find BOOKS.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving BOOKS.",
      });
    });
};

//-----------------------------------------------------------------
// Find a single BOOK with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  BwBook.findAll({
    where: { id: id },
    include: [
      {
        model: BwAuthor,
        as: "bw_authors",
        required: false
      }
    ],

  })
    .then((data) => {
      //  ToDo: check empty array for finding bw_book with id
      //  data == an array.  Check if empty, not whether exists.
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find BOOK with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving BOOK with id=" + id,
      });
    });
};

//-----------------------------------------------------------------
//  Update a BwBook by ID
exports.update = (req, res) => {

  const id = req.params.id;

  BwBook.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "BOOK was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update BOOK with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating BOOK with id=" + id,
      });
    });
};

//-----------------------------------------------------------------
//  Delete a BOOK with the ID
exports.delete = (req, res) => {

  const id = req.params.id;

  BwBook.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "BOOK was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete BOOK with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete BOOK with id=" + id,
      });
    });
};

//-----------------------------------------------------------------
//  Delete all BOOKS from the database
exports.deleteAll = (req, res) => {

  BwBook.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} ALL BOOKS were deleted successfully.` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while deleting all BOOKS.",
      });
    });
};

//-----------------------------------------------------------------
//  Create multiple BOOKS at once (from JSON array)
exports.bulkCreate = (req, res) => {

  //  Create a collection of BOOKS directly from the JSON array in the body.
  const books = req.body;

  //  console.log(books);

  BwBook.bulkCreate(books)
    .then((data) => {
      res.send(data);
      //  res.send({ message: `${number} book books were created successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred during bulk creation of BOOKS.",
      });
    });
};
