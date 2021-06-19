const express = require("express");
const router = express.Router();

// controllers
const { signup, login } = require("../controllers/auth");

// routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/user", (req, res) => res.send(req.user));

module.exports = router;
