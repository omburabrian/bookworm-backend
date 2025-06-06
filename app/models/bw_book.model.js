
module.exports = (sequelize, Sequelize) => {

  const BwBook = sequelize.define("bw_book", {
    isbn: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    publishDate: {
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

  return BwBook;
};