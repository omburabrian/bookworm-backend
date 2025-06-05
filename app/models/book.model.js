module.exports = (sequelize, Sequelize) => {
  return sequelize.define("book", {
    bookId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          notEmpty: {
             msg: "Title cannot be empty",
          },
      },
    },
    ISBN: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "ISBN cannot be empty",
        },
      },
    },
    publicationDate: {
      type: Sequelize.DATE,
    },
    cover: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
  });
};

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
      unique: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
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