module.exports = (sequelize, Sequelize) => {

  const BwAuthor = sequelize.define("bw_author", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  return BwAuthor;
};
