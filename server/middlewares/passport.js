const User = require("../models/user");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;
module.exports = function (passport) {
  // Local Strategy
  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "password" },
      (email, password, done) => {
        User.findOne({ email }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            done(null, false, {
              code: "GLOBAL_ERROR",
              message:
                "Your login credentials could not be verified. Please try again",
            });
            return;
          }

          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false, {
                code: "GLOBAL_ERROR",
                message:
                  "Your login credentials could not be verified. Please try again",
              });
            }
          });
        });
      }
    )
  );
  // Stores a cookie(with user id) inside of the browser
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      cb(err, user);
    });
  });
};
