const db = require("../models");
const BookTag = db.bookTag;
const Book = db.book;
const Tag = db.tag;

// Link a book to an tag (accepts and array of bookId and tagId))
exports.linkMultiple = async (req, res) => {
  const { bookId, tagIds } = req.body;
  try {
    const links = tagIds.map(tagId => ({ bookId, tagId }));
    const result = await BookTag.bulkCreate(links);
    res.send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// Remove the link between a book and an tag
exports.unlink = async (req, res) => {
  const { bookId, tagId } = req.body;
  try {
    const count = await BookTag.destroy({ where: { bookId, tagId } });
    if (count === 0) return res.status(404).send({ message: "Link not found" });
    res.send({ message: "Association removed" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Unlink all tags from a specific book
exports.unlinkByBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const rows = await BookTag.destroy({ where: { bookId } });
    res.send({ message: `${rows} tag(s) unlinked from book ${bookId}` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Unlink all books from a specific tag
exports.unlinkByTag = async (req, res) => {
  try {
    const tagId = req.params.tagId;
    const rows = await BookTag.destroy({ where: { tagId } });
    res.send({ message: `${rows} book(s) unlinked from tag ${tagId}` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// Get all tags for a specific book
exports.findTagsByBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.bookId, {
      include: [{ model: db.tag, through: { attributes: [] } }]
    });
    if (!book) return res.status(404).send({ message: "Book not found" });
    res.send(book.tags);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get all books for a specific tag
exports.findBooksByTag = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.tagId, {
      include: [{ model: db.book, through: { attributes: [] } }]
    });
    if (!tag) return res.status(404).send({ message: "Tag not found" });
    res.send(tag.books);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
