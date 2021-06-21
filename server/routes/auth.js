const express = require("express");
const router = express.Router();
const passport = require("passport");
// Middlewares
const { authCheck, googleLoggedIn } = require("../middlewares/auth");

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
  passport.authenticate("google", { scope: ["profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/login/failure",
  }),
  function (req, res) {
    res.redirect("http://localhost:3000/login");
  }
);

// Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/user/dashboard", googleLoggedIn, (req, res) => {
  res.send("<h1>User Dashboard</h1>");
});
router.get("/login/failure", (req, res) => {
  res.send("<h1>Login Failed</h1>");
});

module.exports = router;
