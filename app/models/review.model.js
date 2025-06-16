module.exports = (sequelize, Sequelize) => {

  const Review = sequelize.define("review", {
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "RATING is required",
        },
        min: {
          args: 1,
          msg: "RATING value range is [1 to 5]",
        },
        max: {
          args: 5,
          msg: "RATING value range is [1 to 5]",
        },
      },
    },
    reviewText: {
      type: Sequelize.STRING(3000),
      allowNull: false,
            validate: {
          notEmpty: {
             msg: "REVIEW's TEXT cannot be empty",
          },
      },
    },
  });

  //  ToDo:  Will this ID be created if leave off this statement?
  //  Review.removeAttribute("id");

  return Review;
};
