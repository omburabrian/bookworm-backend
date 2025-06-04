module.exports = (sequelize, Sequelize) => {
  const Author = sequelize.define(
    "author",
    {
      authorId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
    });

  return Author;
};
