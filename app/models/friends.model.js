module.exports = (sequelize, Sequelize) => {
  const Friends = sequelize.define("friends", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "User ID cannot be empty",
        },
      },
    },
    friendId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Friend ID cannot be empty",
        },
      },
    },
    status: {
      type: Sequelize.STRING,
    },
  }, {
    timestamps: false,
  });

  Friends.removeAttribute("id");
  return Friends;
};
