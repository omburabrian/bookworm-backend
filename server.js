require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");

//db.sequelize.sync({ force: true });
db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synced");
});

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bookworm backend." });
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/author.routes")(app); // register author routes
require("./app/routes/review.routes")(app);
require("./app/routes/book.routes")(app);
require("./app/routes/userBooks.routes")(app);
require("./app/routes/bookAuthor.routes")(app);
require("./app/routes/bookTag.routes")(app);
require("./app/routes/tag.routes")(app);
require("./app/routes/tagType.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3201;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
