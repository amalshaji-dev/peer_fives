const User = require("../model/user.model");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Validation
    if (!name) {
      throw new Error("Name is required");
    }

    const user = await User.findByIdAndUpdate(id, { name }, { new: true });
    if (!user) {
      throw new Error("User not found");
    }
    res.json({ message: "User edited", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ message: "Users fetched", users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
