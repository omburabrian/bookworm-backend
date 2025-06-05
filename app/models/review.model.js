module.exports = (sequelize, Sequelize) => {

  const Review = sequelize.define("review", {
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Rating cannot be empty",
        },
        min: {
          args: 1,
          msg: "Rating must be at least 1",
        },
        max: {
          args: 5,
          msg: "Rating must be at most 5",
        },
      },
    },
    reviewText: {
      type: Sequelize.STRING(3000),
      allowNull: false,
            validate: {
          notEmpty: {
             msg: "Review cannot be empty",
          },
      },
    },
  });

  return Review;
};
