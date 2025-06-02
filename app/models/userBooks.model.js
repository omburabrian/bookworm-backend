module.exports = (sequelize, Sequelize) => {
  const UserBooks = sequelize.define("userBooks", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    bookId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    listType: {
      type: Sequelize.STRING,
    },
    notes: {
      type: Sequelize.TEXT,
    },
    isOwned: {
      type: Sequelize.BOOLEAN,
    },
    startDate: {
      type: Sequelize.DATE,
    },
    stopDate: {
      type: Sequelize.DATE,
    },
  }, {
    timestamps: false,
  });

  UserBooks.removeAttribute("id");
  return UserBooks;
};
