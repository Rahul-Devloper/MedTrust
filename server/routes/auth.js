const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Middlewares
const { authCheck } = require("../middlewares/auth");

// Controllers
const { signup, login } = require("../controllers/auth");

// Google auth routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  function (req, res) {
    // If user is authenticated, then create JWT
    // Use only the EMAIL ID to create JWT token
    const idObject = { _id: req.user._json.email };
    // Access token is the JWT token
    const accessToken = jwt.sign(idObject, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: 1800,
    });
    res.redirect("http://localhost:3000/user/dashboard?token=" + accessToken);
  }
);

// Routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
