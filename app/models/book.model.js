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
    },
    ISBN: {
      type: Sequelize.STRING,
      allowNull: false,
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
