const db = require("../models");

const BwAuthor = db.bw_author;
const BwBook = db.bw_book;
const Op = db.Sequelize.Op;

//-----------------------------------------------------------------
//  Create and Save a new BwAuthor
exports.create = (req, res) => {

  //  Validate request -- for required fields
  if (req.body.name === undefined) {
    const error = new Error("Author's NAME is required");
    error.statusCode = 400;
    throw error;
  }

  // Create a bw_author
  const aBwAuthor = {
    name: req.body.name,
    description: req.body.description,
  };

  //  Save aBwAutho in the database
  BwAuthor.create(aBwAuthor)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while creating the AUTHOR.",
      });
    });
};

//-----------------------------------------------------------------
//  Find all AUTHORS
exports.findAll = (req, res) => {

  /*
  ?????????????????????????????????????????????
  ToDo:  Why plural relationship name?

  "bw_book" is the related model name in "bw_book.model.js",
  but the relationship must be defined as plural: "bw_books".

  Why?
  Because the relationship ~= bw_author.belongsToMany(bw_book),
  or
  because the db table name == "bw_books"?
  ?????????????????????????????????????????????
  //  */

  BwAuthor.findAll({
    include: [
      {
        model: BwBook,
        as: "bw_books",
        required: false
      }
    ],
    order: [
      ["name", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find AUTHORS.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving AUTHORS.",
      });
    });
};

//-----------------------------------------------------------------
// Find a single AUTHOR with an id
exports.findOne = (req, res) => {

  const id = req.params.id;

  BwAuthor.findAll({
    where: { id: id },
    include: [
      {
        model: BwBook,
        as: "bw_books",
        required: false
      }
    ],
  })
    .then((data) => {
      //  ToDo: check empty array for finding bw_author with id
      //  data == an array.  Check if empty, not whether exists.
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find AUTHOR with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving AUTHOR with id=" + id,
      });
    });
};

//-----------------------------------------------------------------
//  Update a BwAuthor by ID
exports.update = (req, res) => {

  const id = req.params.id;

  BwAuthor.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "AUTHOR was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update AUTHOR with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating AUTHOR with id=" + id,
      });
    });
};

//-----------------------------------------------------------------
//  Delete an AUTHOR with the ID
exports.delete = (req, res) => {

  const id = req.params.id;

  BwAuthor.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "AUTHOR was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete AUTHOR with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete AUTHOR with id=" + id,
      });
    });
};

//-----------------------------------------------------------------
//  Delete all AUTHORS from the database
exports.deleteAll = (req, res) => {

  BwAuthor.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} ALL AUTHORS were deleted successfully.` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred while deleting all AUTHORS.",
      });
    });
};

//-----------------------------------------------------------------
//  Create multiple AUTHORS at once (from JSON array)
exports.bulkCreate = (req, res) => {

  //  Create a collection of AUTHORS directly from the JSON array in the body.
  const authors = req.body;

  //  console.log(authors);

  BwAuthor.bulkCreate(authors)
    .then((data) => {
      res.send(data);
      //  res.send({ message: `${number} book authors were created successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred during bulk creation of AUTHORS.",
      });
    });
};
