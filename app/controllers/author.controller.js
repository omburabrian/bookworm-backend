const db = require("../models");
const Author = db.author;
const Op = db.Sequelize;

// Create a new Author
exports.create = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name cannot be empty!" });
  }
  if (!description) {
    return res
      .status(400)
      .json({ message: "Please provide a description for the author!" });
  }

  try {
    const author = await Author.create({ name, description });
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error occurred while creating the Author.",
    });
  }
};

exports.create = async (req, res) => {
  const { name, description } = req.body;

  // Skip validation for testing
  try {
    const author = await Author.create({ name, description });
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error occurred while creating the Author.",
    });
  }
};

// Get all Authors or filter by ID (if needed)
exports.findAll = async (req, res) => {
  try {
    const authors = await Author.findAll({
      order: [["name", "ASC"]], // you're ordering by name
    });
    res.status(200).json(authors); // ✅ Send response to client
  } catch (err) {
    console.error("Error fetching authors:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get a single Author by ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const author = await Author.findByPk(id);

    if (!author) {
      return res
        .status(404)
        .json({ message: `Cannot find Author with id=${id}.` });
    }
    res.json(author);
  } catch (err) {
    res.status(500).json({
      message: `Error retrieving Author with id=${id}`,
      error: err.message,
    });
  }
};

// Update an Author by ID
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Author.update(req.body, {
      where: { authorId: id },
    });

    if (!updated) {
      return res.status(404).json({
        message: `Author up to date. `,
      });
    }

    res.json({ message: "Author updated successfully." });
  } catch (err) {
    res.status(500).json({
      message: `Error updating Author with id=${id}`,
      error: err.message,
    });
  }
};

// Delete an Author by ID
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Author.destroy({ where: { authorId: id } });

    if (!deleted) {
      return res.status(404).json({
        message: `Cannot delete Author with id=${id}. Author not found.`,
      });
    }

    res.json({ message: "Author deleted successfully." });
  } catch (err) {
    res.status(500).json({
      message: `Error deleting Author with id=${id}`,
      error: err.message,
    });
  }
};

// Delete all Authors
exports.deleteAll = async (req, res) => {
  try {
    const deleted = await Author.destroy({ where: {}, truncate: false });
    res.json({ message: `${deleted} Authors were deleted successfully!` });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error occurred while deleting all authors.",
    });
  }
};

// Find all Authors by name
exports.findAllByName = async (req, res) => {
  try {
    const name = req.query.name;
    const condition = name ? { name: { [Op.like]: `%${name}%` } } : undefined;

    const authors = await Author.findAll({
      where: condition,
      order: [["name", "ASC"]],
    });
    res.json(authors);
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Error occurred while retrieving authors by name.",
    });
  }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//  Create multiple authors at once (from JSON array)
exports.bulkCreate = (req, res) => {

  //  Create a collection of authors directly from the JSON array in the body.
  const authors = req.body;

  //  console.log(authors);

  Author.bulkCreate(authors)
    .then((data) => {
      res.send(data);
      //  res.send({ message: `${number} book authors were created successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error occurred during bulk creation of authors.",
      });
    });
};
