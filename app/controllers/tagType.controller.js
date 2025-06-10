const db = require("../models");
const TagType = db.tagtype;

// Create a new tagtype
exports.create = async (req, res) => {
  try {
    const tagtype = await TagType.create(req.body);
    res.send(tagtype);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get all tagtypes
exports.findAll = async (req, res) => {
  try {
    const tagtypes = await TagType.findAll();
    res.send(tagtypes);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Get a single tagtype by ID
exports.findOne = async (req, res) => {
  try {
    const tagtype = await TagType.findByPk(req.params.id);
    if (!tagtype) return res.status(404).send({ message: "TagType not found" });
    res.send(tagtype);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// Update a tagtype by ID
exports.update = async (req, res) => {
  try {
    const rows = await TagType.update(req.body, {
      where: { id: req.params.id }
    });
    if (rows[0] === 0) return res.status(404).send({ message: "TagType not found or unchanged" });
    res.send({ message: "TagType updated" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete a tagtype by ID
exports.delete = async (req, res) => {
  try {
    const rows = await TagType.destroy({ where: { id: req.params.id } });
    if (rows === 0) return res.status(404).send({ message: "TagType not found" });
    res.send({ message: "TagType deleted" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete all tagtypes
exports.deleteAll = async (req, res) => {
  try {
    const count = await TagType.destroy({ where: {}, truncate: false });
    res.send({ message: `${count} tagtypes were deleted.` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
