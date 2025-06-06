const db = require("../models");

const BwBook = db.bw_book;
//  const BwAuthor = db.bw_author;
const Op = db.Sequelize.Op;

//  Create and Save a new BwBook
exports.create = (req, res) => {

  //  Validate request -- for required fields
  if (req.body.isbn === undefined) {
    const error = new Error("ISBN cannot be empty for BOOK.");
    error.statusCode = 400;
    throw error;
  } else if (req.body.title === undefined) {
    const error = new Error("TITLE cannot be empty for BOOK.");
    error.statusCode = 400;
    throw error;
  }

  // Create a bw_book
  const aBwBook = {
    isbn: req.body.isbn,
    title: req.body.title,
    publishDate: req.body.publishDate,
    cover: req.body.cover,
    description: req.body.description,
  };

  //  Save aBwBook in the database
  Recipe.create(aBwBook)
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

//  Find all BOOKS
exports.findAll = (req, res) => {

  BwBook.findAll({
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

// Find a single BOOK with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  BwBook.findAll({
    where: { id: id },
  })
    .then((data) => {
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

