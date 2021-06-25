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
  accountVerify,
  accountReverify,
  passwordResetEmail,
  passwordVerify,
} = require("../controllers/auth");

// Routes
router.post("/signup", signup);
router.post("/account/verify", accountVerify);
router.post("/account/reverify", accountReverify);
router.post("/password/reset", passwordResetEmail);
router.post("/password/reset/verify", passwordVerify);
router.post("/login", login);
router.post("/googleAuth", googleCreateOrLogin);

module.exports = router;
