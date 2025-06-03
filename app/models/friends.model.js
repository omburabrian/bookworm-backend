module.exports = (sequelize, Sequelize) => {
  const Friends = sequelize.define("friends", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    friendId: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
