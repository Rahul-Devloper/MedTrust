const { validateEmail, validatePassword } = require("../utils/validations");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

/**********************************
  Sign up & send email verification
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
    res.status(400).json(errorObject);
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
            code: "GLOBAL_ERROR",
            field: "user",
            message: "Email already exists, please login to continue",
          },
        ],
      };
      res.status(409).json(errorObject);
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
        : ${process.env.CORS_ORIGIN}/account/activate?token=${verificationToken}
      </b>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, async function (error, info) {});

    res.status(201).json({
      message: "Check your email, and verify your account",
      user: User.toClientObject(newUser),
    });
  } catch (error) {
    console.log("SERVER_SIGNUP_ERROR", error);
  }
};

/**********************************
  Email Verification, acc. activation
***********************************/
exports.accountActivate = async (req, res, next) => {
  // Get the token from client body
  const { token } = req.body;

  try {
    // If token exists
    if (token) {
      jwt.verify(token, process.env.JWT_EMAIL_SECRET, async (err, user) => {
        // If the token provided is not valid
        if (err) {
          return res.json({
            error: true,
            type: [
              {
                code: "GLOBAL_ERROR",
                message:
                  "Token is not valid or expired, enter email to resend verification",
              },
            ],
          });
        }
        const { email } = user;
        const updatedUser = await User.findOneAndUpdate(
          { email },
          { activated: true },
          { new: true }
        ).exec();
        return res.status(200).json({
          message: "Email verified, please login to continue",
          user: User.toClientObject(updatedUser),
        });
      });
    }
  } catch (error) {
    console.log("ACCOUNT_VERIFY_ERROR", error);
  }
};

/**********************************
  Resend Account Email Verification
***********************************/
exports.accountReverify = async (req, res) => {
  // Get the email from client
  const { email } = req.body;

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

  // Sends the validation error message
  if (validationErrors.length) {
    const errorObject = {
      error: true,
      type: validationErrors,
    };
    res.status(400).json(errorObject);
    return;
  }

  if (email) {
    try {
      // Check if activated is false for the user
      const existingUser = await User.findOne({ email });

      // Check if the user is already activated
      if (existingUser.activated === true) {
        return res.json({
          error: true,
          type: [
            {
              code: "GLOBAL_ERROR",
              field: "user",
              message: "Email already activated, login to continue",
            },
          ],
        });
      }

      // Generate JWT and mail the user
      const payload = { email: email };

      // Generate JWT token for email verification, expires in 30 mins
      const verificationToken = jwt.sign(
        payload,
        process.env.JWT_EMAIL_SECRET,
        {
          expiresIn: 1800,
        }
      );

      // Update activation token sent at in the user model
      await User.findOneAndUpdate(
        { email },
        {
          activationToken: verificationToken,
          activationTokenSentAt: Date.now(),
        },
        { new: true }
      ).exec();

      // Re Send verification to the user email
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
          : ${process.env.CORS_ORIGIN}/account/activate?token=${verificationToken}
        </b>`,
      };

      // Send the email
      transporter.sendMail(mailOptions, function (error, info) {});

      return res.json({
        message:
          "Verification email sent, check your email to activate account",
        user: User.toClientObject(existingUser),
      });
    } catch (error) {
      console.log("AUTH_REVERIFY_ERROR", error);
    }
  } else {
    return res.json({ message: "Please enter a valid email" });
  }
};

/**********************************
  Password Reset Email
***********************************/
exports.passwordResetEmail = async (req, res, next) => {
  // Get the email from client body
  const { email } = req.body;

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

  // Sends the validation error message
  if (validationErrors.length) {
    const errorObject = {
      error: true,
      type: validationErrors,
    };
    res.status(400).json(errorObject);
    return;
  }

  try {
    // Check if the user exists
    const existingUser = await User.findOne({ email });

    // If the user doesn't exist, don't send
    if (!existingUser) {
      return res.json({
        error: true,
        type: [
          {
            code: "GLOBAL_ERROR",
            field: "user",
            message: "Your email doesn't exist, please sign up to continue",
          },
        ],
      });
    }

    // If user exists
    // Generate JWT and mail the user
    const payload = { email: email };

    // Generate JWT token for password reset, expires in 30 mins
    const resetToken = jwt.sign(payload, process.env.JWT_EMAIL_SECRET, {
      expiresIn: 1800,
    });

    // Send password reset email to the user
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
      subject: "SaaS - Password Reset",
      html: `<b>Hi, here is your password reset link 
          : ${process.env.CORS_ORIGIN}/new-password?token=${resetToken}
        </b>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {});

    return res.status(200).json({
      message: "Password reset link sent to your email",
      user: User.toClientObject(existingUser),
    });
  } catch (error) {
    console.log("PASSWORD_RESET_EMAIL_ERROR", error);
  }
};

/**********************************
  Password Reset Verification
***********************************/
exports.passwordVerify = async (req, res, next) => {
  // Get the token from client body
  const { token, newPassword } = req.body;

  // Validate the input fields
  const validationErrors = [];

  // Empty password
  if (!newPassword) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "password",
      message: "Please enter a password",
    });
  }

  // Check valid password
  const isValidPassword = newPassword && validatePassword(newPassword);
  if (newPassword && !isValidPassword) {
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
    res.status(400).json(errorObject);
    return;
  }

  try {
    // If token exists
    if (token) {
      jwt.verify(token, process.env.JWT_EMAIL_SECRET, async (err, user) => {
        // If the token provided is not valid
        if (err) {
          return res.status(401).json({
            error: true,
            type: [
              {
                code: "GLOBAL_ERROR",
                field: "token",
                message:
                  "Token is not valid or expired, enter email to resend reset link",
              },
            ],
          });
        }
        const { email } = user;

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        const updatedUser = await User.findOneAndUpdate(
          { email },
          { password: hashedPassword },
          { new: true }
        ).exec();

        return res.status(200).json({
          message: "Password updated, please login to continue",
          user: User.toClientObject(updatedUser),
        });
      });
    }
  } catch (error) {
    console.log("NEW_PASSWORD_VERIFY_ERROR", error);
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
    res.status(401).json(errorObject);
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
      // Generate the access token
      const accessToken = jwt.sign(idObject, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_TTL,
      });
      // Generate the refresh token
      const refreshToken = jwt.sign(idObject, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "1y",
      });

      // Set a http only cookie for refresh token
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      // Send the access token to the client
      return res.status(200).json({
        user: User.toClientObject(user),
        accessToken: accessToken,
        message: "Login Success",
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
      let user = new User({
        name: name,
        email: email,
        accountType: "google",
        activated: true,
      });
      await user.save().then((user) => {
        // Generate JWT for the Google ID
        // Use only the user ID to create JWT token
        const idObject = { _id: user._id };
        // Access token is the JWT token
        const accessToken = jwt.sign(idObject, process.env.JWT_ACCESS_SECRET, {
          expiresIn: process.env.JWT_ACCESS_TOKEN_TTL,
        });
        // Generate the refresh token
        const refreshToken = jwt.sign(
          idObject,
          process.env.JWT_REFRESH_SECRET,
          {
            expiresIn: "1y",
          }
        );

        // Set a http only cookie for refresh token
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          path: "/api/refresh_token",
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        // Send the access token to the client
        return res.status(200).json({
          user: User.toClientObject(user),
          accessToken: accessToken,
          message: "Login Success",
        });
      });
    } else {
      // Generate JWT for the Google ID
      // Use only the user ID to create JWT token
      const idObject = { _id: user._id };
      // Access token is the JWT token
      const accessToken = jwt.sign(idObject, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_TTL,
      });
      // Generate the refresh token
      const refreshToken = jwt.sign(idObject, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "1y",
      });

      // Set a http only cookie for refresh token
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      // Send the access token to the client
      return res.status(200).json({
        user: User.toClientObject(user),
        accessToken: accessToken,
        message: "Login Success",
      });
    }
  } catch (error) {
    console.log("SERVER_GOOGLE_LOGIN_ERROR", error);
  }
};

/********************************************
  Generate new access token for refresh token
*********************************************/
exports.newAccessToken = async (req, res) => {
  try {
    const refToken = req.cookies.refreshToken;

    // If refresh token is not provided, return error
    if (!refToken) {
      return res.status(401).json({
        error: true,
        type: [
          {
            code: "REFRESH_TOKEN_NOT_AVAILABLE",
            field: "refreshToken",
            message: "Please login again",
          },
        ],
      });
    }

    // Get the user from the refresh token
    const decodedToken = jwt.verify(refToken, process.env.JWT_REFRESH_SECRET);

    // Get the user from the refresh token
    const user = await User.findById(decodedToken._id);
    if (!user) {
      return res.status(401).json({
        error: true,
        type: [
          {
            code: "GLOBAL_ERROR",
            field: "refreshToken",
            message: "Refresh token is not valid, please log in again",
          },
        ],
      });
    }

    // If the current access token is not expired, return the current access token
    const currentAccessToken =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (currentAccessToken) {
      // Function to check if the current access token is expired
      const isTokenExpired = (token) => {
        // Split the JWT by "." and get the payload (middle part)
        const payloadBase64 = token.split(".")[1];
        const decodedJson = Buffer.from(payloadBase64, "base64").toString();
        const decoded = JSON.parse(decodedJson);
        const exp = decoded.exp;
        const expired = Date.now() >= exp * 1000;
        return expired;
      };

      // If the current access token is not expired, return the current access token
      if (!isTokenExpired(currentAccessToken)) {
        return res.status(200).json({
          accessToken: currentAccessToken,
          user: User.toClientObject(user),
        });
      }
    }

    // Get the ID to generate new access token
    const idObject = { _id: user._id };
    // Generate new access token with the user ID
    const accessToken = jwt.sign(idObject, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_TTL,
    });

    return res.status(200).json({
      accessToken: accessToken,
      user: User.toClientObject(user),
    });
  } catch (error) {
    console.log("SERVER_NEW_TOKEN_ERROR", error);
  }
};

/********************************************
  Logout user by deleting refresh token cookie
*********************************************/
exports.logout = async (req, res) => {
  try {
    // Clear the set-cookie refresh token
    res.clearCookie("refreshToken", { path: "/api/refresh_token" });

    return res.status(200).json({ message: "Logged out" });
  } catch (error) {
    console.log("SERVER_LOGOUT_ERROR", error);
  }
};
