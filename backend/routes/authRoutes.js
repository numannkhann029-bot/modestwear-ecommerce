const express = require("express");
const router = express.Router();
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// ✅ REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.isAdmin),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN TRY:", email, password); // 🔍 DEBUG

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found ❌");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("User found ✅");
    console.log("DB Password:", user.password);

    const isMatch = await user.matchPassword(password);

    console.log("Password Match:", isMatch); // 🔍 DEBUG

    if (isMatch) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id, user.isAdmin),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;