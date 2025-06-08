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
      validate: {
        notEmpty: {
          msg: "Tag name cannot be empty",
        },
      },
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    tagTypeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Tag type ID cannot be empty",
        },
      },
    },
  });
};
