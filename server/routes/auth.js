const express = require("express");
const router = express.Router();

// Controllers
const {
  signup,
  login,
  googleCreateOrLogin,
  accountActivate,
  accountReverify,
  passwordResetEmail,
  passwordVerify,
  newAccessToken,
} = require("../controllers/auth");

// Routes
router.post("/signup", signup);
router.post("/account/activate", accountActivate);
router.post("/account/reverify", accountReverify); // Resend account verification email
router.post("/password/reset", passwordResetEmail);
router.post("/password/reset/verify", passwordVerify);
router.post("/login", login);
router.post("/googleAuth", googleCreateOrLogin);
router.post("/newAccessToken", newAccessToken); // Generate new access token for user

module.exports = router;
