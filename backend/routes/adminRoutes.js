const express = require("express");
const router = express.Router();
const Admin = require("../models/admin"); // your model
const jwt = require("jsonwebtoken");

// ✅ Admin Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: { id: admin._id, username: admin.username },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Create Admin (one-time use)
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing = await Admin.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = new Admin({ username, password });
    await admin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
