const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Middlewares
const { authCheck } = require("../middlewares/auth");

// Controllers
const { signup, login } = require("../controllers/auth");

// Routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
