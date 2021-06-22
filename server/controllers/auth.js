const { validateEmail, validatePassword } = require("../utils/validations");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Sign up an user
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate the input fields
  const validationErrors = [];

  // Empty email
  if (!email) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "email",
      message: "Please enter an email",
    });
  }

  // Check valid email
  const isValidEmail = email && validateEmail(email);
  if (email && !isValidEmail) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "email",
      message: "Please enter a valid email",
    });
  }

  // Empty password
  if (!password) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "password",
      message: "Please enter a password",
    });
  }

  // Check valid password
  const isValidPassword = password && validatePassword(password);
  if (password && !isValidPassword) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "password",
      message:
        "Password must be min 8 chars, with a symbol, upper & lower case, and a number",
    });
  }

  // Sends the validation error message
  if (validationErrors.length) {
    const errorObject = {
      error: true,
      type: validationErrors,
    };
    res.json(errorObject);
    return;
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const errorObject = {
        error: true,
        type: [
          {
            code: "VALIDATION_ERROR",
            field: "email",
            message: "Email already exists, please login to continue",
          },
        ],
      };
      res.json(errorObject);

      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    // Create the user
    let newUser = await new User({ name, email, password: hashedPassword });
    newUser.save().then((user) => {
      res.json(user);
    });
  } catch (error) {
    console.log(error);
  }
};

// Login a user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate the input fields
  const validationErrors = [];

  // Empty email
  if (!email) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "email",
      message: "Please enter an email",
    });
  }

  // Check valid email
  const isValidEmail = email && validateEmail(email);
  if (email && !isValidEmail) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "email",
      message: "Please enter a valid email",
    });
  }

  // Empty password
  if (!password) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "password",
      message: "Please enter a password",
    });
  }

  // Check valid password
  const isValidPassword = password && validatePassword(password);
  if (password && !isValidPassword) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "password",
      message: "Password is incorrect",
    });
  }

  // Sends the validation error message
  if (validationErrors.length) {
    const errorObject = {
      error: true,
      type: validationErrors,
    };
    res.json(errorObject);
    return;
  }

  // Use passport to authenticate
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.send(info);
    } else {
      // If user is authenticated, then create JWT
      const userObject = user.toObject();
      // Use only the user ID to create JWT token
      const idObject = { _id: userObject._id };
      // Access token is the JWT token
      const accessToken = jwt.sign(idObject, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: 1800,
      });

      // Send the access token to the client
      res.json({
        token: accessToken,
        user: userObject,
      });
      return;
    }
  })(req, res, next);
};
