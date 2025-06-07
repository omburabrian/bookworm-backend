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

//  TESTING:  @@@@@@@@@@@@@@@@@@@@@@@@@@################################
db.bw_book = require("./bw_book.model.js")(sequelize, Sequelize);
db.bw_author = require("./bw_author.model.js")(sequelize, Sequelize);

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
//  TEST  @@@@@@@@@@@@@@@@@@@@###################  TEST WITH BW BOOKS AND AUHTORS
/*
db.user.hasMany(db.review, { foreignKey: "userId" });
db.book.hasMany(db.review, { foreignKey: "bookId" });
db.review.belongsTo(db.user, { foreignKey: "userId" });
db.review.belongsTo(db.book, { foreignKey: "bookId" });
//  */

//  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@################################
//  Need to associate Review model to users and books.  (... the new book model, BwBook)
db.user.hasMany(db.review, { foreignKey: "userId" });
db.bw_book.hasMany(db.review, { foreignKey: "bwBookId" });
db.review.belongsTo(db.user, { foreignKey: "userId" });
db.review.belongsTo(db.bw_book, { foreignKey: "bwBookId" });


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

// Friends (self-referencing many-to-many)
db.user.belongsToMany(db.user, {
  through: db.friends,
  as: "sentFriends",
  foreignKey: "userId",
  otherKey: "friendId",
});
db.user.belongsToMany(db.user, {
  through: db.friends,
  as: "receivedFriends",
  foreignKey: "friendId",
  otherKey: "userId",
});

//  ##############################################################
//  Testing many-to-many relationship definitions with Sequelize
//  https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/

//  Specify the [bridge | junction] table so can OMIT the timestamps.
//  (Actual table name will be *plural*, e.g. "bw_book_authors").
const BwBookAuthor = sequelize.define('bw_book_author', {}, { timestamps: false });

//  BwBook.belongsToMany(BwAuthor, { through: 'BwBook_BwAuthor' });
db.bw_book.belongsToMany(db.bw_author, { through: 'bw_book_author' });

//  BwAuthor.belongsToMany(BwBook, { through: 'BwBook_BwAuthor' });
db.bw_author.belongsToMany(db.bw_book, { through: 'bw_book_author' });

//  ##############################################################
/*
Test setup new BOOK-REVIEW table ~= bridge table with attributes
between users and books.
//  */

/*
const BwBookReviewUser = sequelize.define(
  'bw_book_review_user',
  {
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    reviewText: {
      type: Sequelize.STRING(3000),
      allowNull: false,
    },
  },
  { timestamps: false }
);
//  */

//  NOTE:  See "models/review.model.js" for definition of "bw_book_review_user" table.
db.user.belongsToMany(db.bw_book, { through: 'bw_book_review_user' });
db.bw_book.belongsToMany(db.user, { through: 'bw_book_review_user' });
//  ##############################################################

module.exports = db;
