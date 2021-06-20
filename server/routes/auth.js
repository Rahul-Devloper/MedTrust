const express = require("express");
const router = express.Router();

// Middlewares
const { authCheck } = require("../middlewares/auth");

// Controllers
const { signup, login } = require("../controllers/auth");

// Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/user", authCheck, (req, res) => {
  res.send("You are accessing a protected route");
});

module.exports = router;
