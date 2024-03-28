const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { blacklist } = require("../blacklist");

// Controller for user registration
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(201).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({
      message: `${username} registration is successful`,
      registerdata: req.body,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for user login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid || password.length < 6) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    var token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.SECRET_KEY
    );

    res.status(200).json({ token, msg: "Login successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to authenticate" });
  }
};

exports.logoutuser = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    blacklist.push(token);
    res.status(200).json({ msg: "The user has been logged out" });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};
