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
