const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ------------------------------------------------------------
//  Include the models for the database tables.
db.ingredient = require("./ingredient.model.js")(sequelize, Sequelize);
db.recipe = require("./recipe.model.js")(sequelize, Sequelize);
db.recipeStep = require("./recipeStep.model.js")(sequelize, Sequelize);
db.recipeIngredient = require("./recipeIngredient.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.author = require("./author.model.js")(sequelize, Sequelize); //register author model in index.js
db.review = require("./review.model.js")(sequelize, Sequelize);
db.book = require("./book.model.js")(sequelize, Sequelize);
db.bookAuthor = require("./bookAuthor.model.js")(sequelize, Sequelize);
db.bookTag = require("./bookTag.model.js")(sequelize, Sequelize);
db.friends = require("./friends.model.js")(sequelize, Sequelize);
db.tag = require("./tag.model.js")(sequelize, Sequelize);
db.tagType = require("./tagType.model.js")(sequelize, Sequelize);
db.userBooks = require("./userBooks.model.js")(sequelize, Sequelize);
db.userListSettings = require("./userListSettings.model.js")(sequelize, Sequelize);

// ------------------------------------------------------------
//  Define the foreign keys for the various models/tables.

// - - - - - - - - - - - - - - - - - - - - - - - - -
// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// - - - - - - - - - - - - - - - - - - - - - - - - -
// foreign key for recipe
db.user.hasMany(
  db.recipe,
  { as: "recipe" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.recipe.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);

// - - - - - - - - - - - - - - - - - - - - - - - - -
// foreign key for recipeStep
db.recipe.hasMany(
  db.recipeStep,
  { as: "recipeStep" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.recipeStep.belongsTo(
  db.recipe,
  { as: "recipe" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// - - - - - - - - - - - - - - - - - - - - - - - - -
// foreign keys for recipeIngredient
db.recipeStep.hasMany(
  db.recipeIngredient,
  { as: "recipeIngredient" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.recipe.hasMany(
  db.recipeIngredient,
  { as: "recipeIngredient" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.ingredient.hasMany(
  db.recipeIngredient,
  { as: "recipeIngredient" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.recipeIngredient.belongsTo(
  db.recipeStep,
  { as: "recipeStep" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.recipeIngredient.belongsTo(
  db.recipe,
  { as: "recipe" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.recipeIngredient.belongsTo(
  db.ingredient,
  { as: "ingredient" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//  ############################################################
//  ToDo:   Finish foreign keys for book review
//          Test without them first.

// - - - - - - - - - - - - - - - - - - - - - - - - -
//  Foreign key for book review
db.user.hasMany(db.review, { foreignKey: "userId" });
db.book.hasMany(db.review, { foreignKey: "bookId" });
db.review.belongsTo(db.user, { foreignKey: "userId" });
db.review.belongsTo(db.book, { foreignKey: "bookId" });

// BookAuthor
db.book.belongsToMany(db.author, {
  through: db.bookAuthor,
  foreignKey: "bookId",
  otherKey: "authorId",
});
db.author.belongsToMany(db.book, {
  through: db.bookAuthor,
  foreignKey: "authorId",
  otherKey: "bookId",
});

// BookTag
db.book.belongsToMany(db.tag, {
  through: db.bookTag,
  foreignKey: "bookId",
  otherKey: "tagId",
});
db.tag.belongsToMany(db.book, {
  through: db.bookTag,
  foreignKey: "tagId",
  otherKey: "bookId",
});

db.tag.belongsTo(db.tagType, { foreignKey: "tagTypeId" });
db.tagType.hasMany(db.tag, { foreignKey: "tagTypeId" });

// UserBooks
db.user.hasMany(db.userBooks, { foreignKey: "userId" });
db.book.hasMany(db.userBooks, { foreignKey: "bookId" });
db.userBooks.belongsTo(db.user, { foreignKey: "userId" });
db.userBooks.belongsTo(db.book, { foreignKey: "bookId" });

// UserListSettings
db.user.hasMany(db.userListSettings, { foreignKey: "userId" });
db.userListSettings.belongsTo(db.user, { foreignKey: "userId" });

// Friends
// Self-referencing many-to-many
db.user.belongsToMany(db.user, {
  as: "friends",
  through: db.friends,
  foreignKey: "userId",
  otherKey: "friendId",
});
//  ############################################################

module.exports = db;
