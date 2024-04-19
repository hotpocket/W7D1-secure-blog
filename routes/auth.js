// Route for user login
// routes/auth.js

const { verifyToken } = require("../middleware/auth");


const express = require("express");
const router = express.Router();
// const { verifyToken } = require("../controllers/auth");

// Import the User model for database operations
const User = require("../models/user");
const userController = require("../controllers/user");

// Route for user login
router.post("/login", userController.Login);

// Route for user registration
router.post("/register", userController.Register);

module.exports = router;
