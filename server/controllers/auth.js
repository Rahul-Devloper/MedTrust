const { validateEmail, validatePassword } = require("../utils/validations");
const User = require("../models/user");

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
    res.send(errorObject);
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

    // Save the user to the database
    let newUser = await new User({ email, password }).save();
    res.json(newUser);
  } catch (error) {
    console.log(error);
  }
};
