module.exports = (sequelize, Sequelize) => {
  const BookAuthor = sequelize.define("bookAuthor", {
    bookId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    authorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Author ID cannot be empty",
        },
      },
    },
  }, {
    timestamps: false,
  });

  BookAuthor.removeAttribute("id");
  return BookAuthor;
};
