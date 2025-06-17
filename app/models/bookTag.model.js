module.exports = (sequelize, Sequelize) => {
  const BookTag = sequelize.define("bookTag", {
    bookId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    tagId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Tag ID cannot be empty",
        },
      },
    },
  }, {
    timestamps: false,
  });

  BookTag.removeAttribute("id");
  return BookTag;
};
