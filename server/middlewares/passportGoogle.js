const User = require("../models/user");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
      callbackURL: process.env.GOOGLE_OAUTH_CBACKURL,
      passReqToCallback: true,
    },
    // This function is called on successful authentication
    function (accessToken, refreshToken, profile, done) {
      // Insert user into database
      console.log(profile);
      done(err, profile);
    }
  )
);

// Stores a cookie(with user id) inside of the browser
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
