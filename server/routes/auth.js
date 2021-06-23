const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Middlewares
const { authCheck } = require("../middlewares/auth");

// Controllers
const { signup, login, googleCreateOrLogin } = require("../controllers/auth");

// Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/googleAuth", googleCreateOrLogin);
router.get("/protect", authCheck, (req, res) => {
  res.send("<a>Protected Route</a>");
});

module.exports = router;
