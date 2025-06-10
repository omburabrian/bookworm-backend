module.exports = (sequelize, Sequelize) => {
  return sequelize.define("tag", {
    tagId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    tagTypeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};
