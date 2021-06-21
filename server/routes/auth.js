const express = require("express");
const router = express.Router();
const passport = require("passport");
// Middlewares
const { authCheck, googleLoggedIn } = require("../middlewares/auth");

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
    res.redirect("http://localhost:3000/user/dashboard");
  }
);

// Routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
