const db = require("../models");
const Tag = db.tag;

// Create a new tag
exports.create = async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.send(tag);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get all tags
exports.findAll = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.send(tags);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get a single tag by ID
exports.findOne = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).send({ message: "Tag not found" });
    res.send(tag);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// Get all tags for a specific tagType
exports.findByTagType = async (req, res) => {
  try {
    const tags = await Tag.findAll({ where: { tagTypeId: req.params.tagTypeId } });
    if (tags.length === 0) return res.status(404).send({ message: "No tags found for this tag type" });
    res.send(tags);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update a tag by ID
exports.update = async (req, res) => {
  try {
    const rows = await Tag.update(req.body, {
      where: { tagId: req.params.id }
    });
    if (rows[0] === 0) return res.status(404).send({ message: "Tag not found or unchanged" });
    res.send({ message: "Tag updated" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete a tag by ID
exports.delete = async (req, res) => {
  try {
    const rows = await Tag.destroy({ where: { tagId: req.params.id } });
    if (rows === 0) return res.status(404).send({ message: "Tag not found" });
    res.send({ message: "Tag deleted" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete all tags
exports.deleteAll = async (req, res) => {
  try {
    const count = await Tag.destroy({ where: {}, truncate: false });
    res.send({ message: `${count} tags were deleted.` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
