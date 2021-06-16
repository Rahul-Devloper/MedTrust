const { validateEmail, validatePassword } = require("../utils/validations");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const user = require("../models/user");

// Register a user
exports.register = async (req, res, next) => {
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
    res.status(422).send(errorObject);
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
      res.status(422).send(errorObject);

      return;
    }

    // Create the user
    let newUser = await new User({ email, password });
    // Generate salt to hash the password
    const salt = await bcrypt.genSalt(10);
    // Set user password to hashed password
    newUser.password = await bcrypt.hash(newUser.password, salt);
    newUser.save().then((user) => {
      res.status(201).send(user);
    });
  } catch (error) {
    console.log(error);
  }
};
