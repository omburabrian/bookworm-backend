const db = require("../models");
const BookAuthor = db.bookAuthor;
const Book = db.book;
const Author = db.author;

// Link a book to an author
exports.link = async (req, res) => {
  const { bookId, authorId } = req.body;
  try {
    const result = await BookAuthor.create({ bookId, authorId });
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Remove the link between a book and an author
exports.unlink = async (req, res) => {
  const { bookId, authorId } = req.body;
  try {
    const count = await BookAuthor.destroy({ where: { bookId, authorId } });
    if (count === 0) return res.status(404).send({ message: "Link not found" });
    res.send({ message: "Association removed" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get all authors for a specific book
exports.findAuthorsByBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.bookId, {
      include: [{ model: db.author, through: { attributes: [] } }]
    });
    if (!book) return res.status(404).send({ message: "Book not found" });
    res.send(book.authors);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get all books for a specific author
exports.findBooksByAuthor = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.authorId, {
      include: [{ model: db.book, through: { attributes: [] } }]
    });
    if (!author) return res.status(404).send({ message: "Author not found" });
    res.send(author.books);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
