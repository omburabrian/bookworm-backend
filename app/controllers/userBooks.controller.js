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
      include: [{ model: Book, through: { model: UserBooks } }]
    });
    if (!user) return res.status(404).send({ message: "User not found" });
    res.send(user.books);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
