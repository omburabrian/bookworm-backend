module.exports = (sequelize, Sequelize) => {
  const UserBooks = sequelize.define("userBooks", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "User ID cannot be empty",
        },
      },
    },
    bookId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Book ID cannot be empty",
        },
      },
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
    currentPage: {
      type: Sequelize.DATE,
    },    
  }, {
    timestamps: false,
  });

  UserBooks.removeAttribute("id");
  return UserBooks;
};
