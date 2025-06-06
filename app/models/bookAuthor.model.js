module.exports = (sequelize, Sequelize) => {

  const BookAuthor = sequelize.define(
    "bookAuthor",
    {
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  BookAuthor.removeAttribute("id");
  return BookAuthor;
};
