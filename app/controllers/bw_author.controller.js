const db = require("../models");

//  const BwBook = db.bw_book;
const BwAuthor = db.bw_author;
const Op = db.Sequelize.Op;

//  Create and Save a new BwAuthor
exports.create = (req, res) => {

  //  Validate request -- for required fields
  if (req.body.name === undefined) {
    const error = new Error("NAME cannot be empty for AUTHOR.");
    error.statusCode = 400;
    throw error;
  }

  // Create a bw_author
  const aBwAuthor = {
    name: req.body.name,
    description: req.body.description,
  };

  //  Save aBwAutho in the database
  Recipe.create(aBwAuthor)
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

//  Find all AUTHORS
exports.findAll = (req, res) => {

  BwAuthor.findAll({
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

// Find a single AUTHOR with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  BwAuthor.findAll({
    where: { id: id },
  })
    .then((data) => {
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
