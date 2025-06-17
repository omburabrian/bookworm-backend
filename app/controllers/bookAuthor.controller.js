const db = require("../models");
const BookAuthor = db.bookAuthor;
const Book = db.book;
const Author = db.author;

// Link a book to an author (accepts and array of bookId and authorId))
exports.linkMultiple = async (req, res) => {
  const { bookId, authorIds } = req.body;
  try {
    const links = authorIds.map(authorId => ({ bookId, authorId }));
    const result = await BookAuthor.bulkCreate(links);
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

// Unlink all authors from a specific book
exports.unlinkByBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const rows = await BookAuthor.destroy({ where: { bookId } });
    res.send({ message: `${rows} author(s) unlinked from book ${bookId}` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Unlink all books from a specific author
exports.unlinkByAuthor = async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const rows = await BookAuthor.destroy({ where: { authorId } });
    res.send({ message: `${rows} book(s) unlinked from author ${authorId}` });
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
