const User = require("../models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Google Strategy
module.exports = function (passport) {
  // Local Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_OAUTH_CID,
        clientSecret: process.env.GOOGLE_OAUTH_SECRET,
        callbackURL: process.env.GOOGLE_OAUTH_CBACKURL,
      },
      // This function is called on successful authentication
      function (accessToken, refreshToken, profile, done) {
        // Insert user into database
        console.log(profile);
        done(null, profile);
      }
    )
  );
  // Stores a cookie(with user id) inside of the browser
  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
};
