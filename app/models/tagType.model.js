module.exports = (sequelize, Sequelize) => {
  return sequelize.define("tagType", {
    tagTypeId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
};
