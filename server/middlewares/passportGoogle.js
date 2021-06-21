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
        // Check if user exists in DB
        User.findOne({ email: profile.emails[0].value }, async (err, doc) => {
          if (err) {
            return done(err, null);
          }
          // If user doesn't exist, save to db
          if (!doc) {
            const newUser = new User({
              email: profile.emails[0].value,
            });
            await newUser.save();
          }
        });
        console.log(profile.emails);
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
