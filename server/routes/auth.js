const express = require("express");
const router = express.Router();

// controllers
const { register } = require("../controllers/auth");

// routes
router.post("/register", register);

module.exports = router;
