const express = require("express");
const router = express.Router();

// controllers
const { signup, login } = require("../controllers/auth");

// routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
