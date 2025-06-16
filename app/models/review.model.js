module.exports = (sequelize, Sequelize) => {

  //  TEST: @@@@@@@@@@@@###################  change table name?
  //  . . . to: "bw_book_review_users", with an 's'?
  //  const Review = sequelize.define("review", {
  const Review = sequelize.define("bw_book_review_user", {
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

  Review.removeAttribute("id");

  return Review;
};
