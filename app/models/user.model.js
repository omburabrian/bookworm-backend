const { saltSize, keySize } = require("../authentication/crypto");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.BLOB, // long enough for hex string
      allowNull: false,
    },
    salt: {
      type: Sequelize.BLOB, // 16 bytes in hex = 32 chars (safe with 40)
      allowNull: false,
    },
    
  });

  return User;
};
