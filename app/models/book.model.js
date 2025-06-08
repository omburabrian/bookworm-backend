
module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define("book", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    isbn: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          notEmpty: {
             msg: "Title cannot be empty",
          },
      },
      unique: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "ISBN cannot be empty",
        },
      },
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    cover: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  });

  return Book;
};