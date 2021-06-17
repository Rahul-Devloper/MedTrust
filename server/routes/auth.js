const express = require("express");
const router = express.Router();

// controllers
const { signup } = require("../controllers/auth");

// routes
router.post("/signup", signup);

module.exports = router;
