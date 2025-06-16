const db = require("../models");
const UserBooks = db.userBooks;
const Book = db.book;
const User = db.user;

// Add a book to a user's list
exports.add = async (req, res) => {
  try {
    const entry = await UserBooks.create(req.body);
    res.send(entry);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Remove a book from a user's list
exports.remove = async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    const count = await UserBooks.destroy({ where: { userId, bookId } });
    if (count === 0) return res.status(404).send({ message: "Entry not found" });
    res.send({ message: "Book removed from user list" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get all books for a specific user
exports.findByUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId, {
  include: [
    {
      model: Book,
      through: {
        model: UserBooks,
        attributes: [
          'listType',
          'notes',
          'isOwned',
          'startDate',
          'stopDate',
          'currentPage'
        ]
      },
      include: [
        {model: db.author,through: { attributes: [] }},
        {model: db.tag,through: { attributes: [] }}
      ]
    }
  ]
});
;
    if (!user) return res.status(404).send({ message: "User not found" });
    res.send(user.books);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get user and book to confirm if a book is in a user's list
exports.checkBookInUserList = async (req, res) => {
  const { userId, bookId } = req.params;
  try {
    const entry = await UserBooks.findOne({
      where: { userId, bookId },
    });
    if (!entry) return res.status(404).send({ message: "Entry not found" });
    res.send(entry);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateUserBook = async (req, res) => {
  const { userId, bookId } = req.params;
  try {
    const [updated] = await UserBooks.update(req.body, {
      where: { userId, bookId }
    });
    if (updated === 0) return res.status(404).send({ message: "Entry not found or unchanged" });
    res.send({ message: "User book updated" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}