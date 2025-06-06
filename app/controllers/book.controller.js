const db = require("../models");
const Book = db.book;
const BookAuthor = db.bookAuthor;
const Author = db.author;

// Create a new book
exports.create = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.send(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get all books
exports.findAll = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.send(books);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get a single book by ID
exports.findOne = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).send({ message: "Book not found" });
    res.send(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update a book by ID
exports.update = async (req, res) => {
  try {
    const rows = await Book.update(req.body, {
      where: { id: req.params.id }
    });
    if (rows[0] === 0) return res.status(404).send({ message: "Book not found or unchanged" });
    res.send({ message: "Book updated" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete a book by ID
exports.delete = async (req, res) => {
  try {
    const rows = await Book.destroy({ where: { id: req.params.id } });
    if (rows === 0) return res.status(404).send({ message: "Book not found" });
    res.send({ message: "Book deleted" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete all books
exports.deleteAll = async (req, res) => {
  try {
    const count = await Book.destroy({ where: {}, truncate: false });
    res.send({ message: `${count} books were deleted.` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#############################
//  TESTING:  Get all books with their authors
//  BOOK REVIEWS needs the AUTHOR with the BOOK.
exports.findAllWithAuthors = (req, res) => {
  Book.findAll({
    //  Get all the books = no where clause.
    //  where: {},
    include: [
      {
        model: BookAuthor,
        as: "bookAuthor",
        required: false,
        include: [
          {
            model:  Author,
            as: "author",
            required: false,
          }
        ],
      },
    ],
    order: [
      ["title", "ASC"],
      [Author, "name", "ASC"],
    ],
  }).then((data) => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find BOOKS.`,
      });
    }
  }).catch((error) => {
    res.status(500).send({
      message: error.message || "Error retrieving BOOKS."
    });
  })
};
