module.exports = (sequelize, Sequelize) => {

  const Review = sequelize.define("review", {
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
