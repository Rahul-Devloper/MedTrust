const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Middlewares
const { authCheck } = require("../middlewares/auth");

// Controllers
const {
  signup,
  login,
  googleCreateOrLogin,
  accountActivate,
  accountReverify,
  passwordResetEmail,
  passwordVerify,
} = require("../controllers/auth");

// Routes
router.post("/signup", signup);
router.post("/account/activate", accountActivate);
router.post("/account/reverify", accountReverify); // Resend account verification email
router.post("/password/reset", passwordResetEmail);
router.post("/password/reset/verify", passwordVerify);
router.post("/login", login);
router.post("/googleAuth", googleCreateOrLogin);

module.exports = router;
