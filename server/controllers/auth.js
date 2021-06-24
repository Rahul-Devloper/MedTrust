const { validateEmail, validatePassword } = require("../utils/validations");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

/**********************************
  Sign up an user and send email verification
***********************************/
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
    // Create payload to create JWT token
    const payload = { email: email };
    // Generate JWT token for email verification, expires in 30 mins
    const verificationToken = jwt.sign(payload, process.env.JWT_EMAIL_SECRET, {
      expiresIn: 1800,
    });

    // Create a new user, but keep the activation field to false
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    // Create the user
    let newUser = new User({
      name,
      email,
      password: hashedPassword,
      activated: false,
      activationToken: verificationToken,
      activationTokenSentAt: Date.now(),
    });
    await newUser.save();

    // Send verification to the user email
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    // Configure the message
    var mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "SaaS - Verification",
      html: `<b>Hi, thank you for registering. Here is your verification link 
        : ${verificationToken}
      </b>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json({
      message: "Please verify your email",
      user: User.toClientObject(newUser),
    });
  } catch (error) {
    console.log("SERVER_SIGNUP_ERROR", error);
  }
};

/**********************************
  Login a user
***********************************/
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
      const accessToken = jwt.sign(idObject, process.env.JWT_SECRET_KEY, {
        expiresIn: 1800,
      });

      // Send the access token to the client
      return res.json({
        user: User.toClientObject(user),
        token: accessToken,
      });
    }
  })(req, res, next);
};

/**********************************
  Google login/sign up save to local
***********************************/
exports.googleCreateOrLogin = async (req, res) => {
  try {
    const { name, email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      let user = await new User({
        name: name,
        email: email,
        accountType: "google",
        activated: true,
      });
      user.save();
    }

    // Generate JWT for the Google ID
    // Use only the user ID to create JWT token
    const idObject = { _id: user._id };
    // Access token is the JWT token
    const accessToken = jwt.sign(idObject, process.env.JWT_SECRET_KEY, {
      expiresIn: 1800,
    });

    // Send the access token to the client
    return res.json({
      user: user, // We don't use this user obj on the client, we use google user obj
      token: accessToken,
    });
  } catch (error) {
    console.log("SERVER_GOOGLE_LOGIN_ERROR", error);
  }
};
