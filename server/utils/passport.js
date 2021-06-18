const passport = require("passport");
const User = require("../models/user");
LocalStrategy = require("passport-local").Strategy;

// Local login
const localLogin = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) {
        return done(err);
      }
      // No user with that email found
      if (!user) {
        return done(null, null, {
          code: "GLOBAL_ERROR",
          field: "email",
          message: "Your login details could not be verified. Please try again",
        });
      }
      // Proceed to password validation
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }

        if (!isMatch) {
          done(null, null, {
            code: "GLOBAL_ERROR",
            field: "password",
            message:
              "Your login details could not be verified. Please try again",
          });
          return;
        }

        done(null, user);
        return;
      });
    });
  }
);

passport.use(localLogin);
