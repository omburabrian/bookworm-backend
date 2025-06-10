const db = require("../models");
const User = db.user;
const Session = db.session;
const Op = db.Sequelize.Op;
const { encrypt, getSalt, hashPassword } = require("../authentication/crypto");

// Create and Save a new User
exports.create = async (req, res) => {
  try {
    const { id, firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ message: "Email is already in use" });
    }

    const salt = await getSalt();
    const hash = await hashPassword(password, salt);

    const newUser = await User.create({
      id,
      firstName,
      lastName,
      email,
      password: hash,
      salt,
    });

    const expireTime = new Date();
    expireTime.setDate(expireTime.getDate() + 1);

    const session = await Session.create({
      email,
      userId: newUser.id,
      expirationDate: expireTime,
    });

    const token = await encrypt(session.id);

    res.send({
      id: newUser.id,
      email,
      firstName,
      lastName,
      token,
    });
  } catch (err) {
    console.error("Create user error:", err);
    res.status(500).send({ message: "Server error" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const computedHash = await hashPassword(password, user.salt);
    if (computedHash !== user.password) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const expireTime = new Date();
    expireTime.setDate(expireTime.getDate() + 1);

    const session = await Session.create({
      email,
      userId: user.id,
      expirationDate: expireTime,
    });

    const token = await encrypt(session.id);

    res.send({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send({ message: "Server error" });
  }
};

// Find all users
exports.findAll = (req, res) => {
  const id = req.query.id;
  const condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  User.findAll({ where: condition })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Find user by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `User not found with id = ${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Find user by email
exports.findByEmail = (req, res) => {
  const email = req.params.email;
  User.findOne({ where: { email } })
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `User not found with email = ${email}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Update user
exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) res.send({ message: "User updated successfully." });
      else res.send({ message: `Cannot update user with id = ${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};
exports.search = (req, res) => {
  const query = req.query.query;

  if (!query || query.trim() === "") {
    return res.status(400).send({ message: "Search query is required." });
  }

  User.findAll({
    where: {
      [Op.or]: [
        { email: { [Op.like]: `%${query}%` } },
        { firstName: { [Op.like]: `%${query}%` } },
        { lastName: { [Op.like]: `%${query}%` } },
      ],
    },
  })
    .then(data => res.send(data))
    .catch(err => {
      console.error("Search error:", err);
      res.status(500).send({ message: "Error while searching users." });
    });
};


// Delete user
exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({ where: { id } })
    .then(num => {
      if (num == 1) res.send({ message: "User deleted successfully!" });
      else res.send({ message: `Cannot delete user with id = ${id}` });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Delete all users
exports.deleteAll = (req, res) => {
  User.destroy({ where: {}, truncate: false })
    .then(num => res.send({ message: `${num} users were deleted successfully!` }))
    .catch(err => res.status(500).send({ message: err.message }));
};
