const express = require("express");
const router = express.Router();
const passport = require("passport");
// Middlewares
const { authCheck } = require("../middlewares/auth");

// Controllers
const {
  signup,
  login,
  googleSignup,
  googleSignupCallback,
} = require("../controllers/auth");

// Google auth routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

// Routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
