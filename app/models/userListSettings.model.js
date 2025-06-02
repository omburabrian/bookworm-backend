module.exports = (sequelize, Sequelize) => {
  return sequelize.define("userListSettings", {
    listId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    listType: {
      type: Sequelize.STRING(25),
      allowNull: false,
    },
    isShared: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    listName: {
      type: Sequelize.STRING(255),
    },
  });
};
