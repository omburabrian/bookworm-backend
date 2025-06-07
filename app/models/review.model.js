module.exports = (sequelize, Sequelize) => {

  //  TEST: @@@@@@@@@@@@###################  change table name?
  //  . . . to: "bw_book_review_users", with an 's'?
  //  const Review = sequelize.define("review", {
  const Review = sequelize.define("bw_book_review_user", {
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    reviewText: {
      type: Sequelize.STRING(3000),
      allowNull: false,
    },
  });

  return Review;
};
