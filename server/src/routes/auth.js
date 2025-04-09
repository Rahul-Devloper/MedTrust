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
  verifyOtp,
  logout,
} = require('../controllers/authController');
const { refreshLimiter } = require("../middlewares/auth");

// Routes
router.post('/signup', signup)
router.post('/account/activate', accountActivate)
router.post('/account/reverify', accountReverify) // Resend account verification email
router.post('/password/reset', passwordResetEmail)
router.post('/password/reset/verify', passwordVerify)
router.post('/login', login)
router.post('/verifyOtp', verifyOtp)
router.post("/googleAuth", googleCreateOrLogin);
router.post("/refresh_token",refreshLimiter ,newAccessToken); // Generate new access token for user
router.post("/logout", logout);

module.exports = router;
