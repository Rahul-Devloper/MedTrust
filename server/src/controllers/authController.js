const { emailValidator, passwordValidator } = require("../utils/validations");
const User = require("../models/user");
const UserService = require("../services/userService");
const AdminService = require("../services/adminService");
const SuperAdminService = require("../services/superAdminService");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const PatientRecordService = require('../services/patientRecordService')
const DoctorRecordService = require('../services/doctorRecordService')
const otpGenerator = require('otp-generator')
const sendOTPEmail = require('../utils/sendOTPEmail') // Utility to send OTP email

/**********************************
  Sign up & send email verification
***********************************/
exports.signup = async (req, res) => {
  console.log('req==>', req)
  const { name, email, password, nhsNumber, gmcNumber } = req.body

  let { role } = req.body

  // Validate the input fields
  const validationErrors = []

  // Validate the email and password with utils
  const emailValidationErrors = emailValidator(email)
  const passwordValidationErrors = passwordValidator(password)

  if (emailValidationErrors.length) {
    validationErrors.push(...emailValidationErrors)
  }

  if (passwordValidationErrors.length) {
    validationErrors.push(...passwordValidationErrors)
  }

  // Sends the validation error message
  if (validationErrors.length) {
    const errorObject = {
      error: true,
      type: validationErrors,
    }
    res.status(400).json(errorObject)
    return
  }

  try {
    let userRecord = null

    // Check if nhsNumber is provided
    if (nhsNumber) {
      userRecord = await PatientRecordService.findPatientInRecord({
        'personalDetails.name': name,
        'personalDetails.nhsNumber': nhsNumber,
        'personalDetails.contactDetails.email': email,
      })
      if (userRecord) {
        role = 'patient'
        console.log('patientInRecord==>', userRecord)
      }
    }

    // Check if gmcNumber is provided
    if (gmcNumber && !userRecord) {
      userRecord = await DoctorRecordService.findDoctorByNameAndGmcNumber(
        name,
        gmcNumber
      )
      if (userRecord) {
        role = 'doctor'
        console.log('doctorInRecord==>', userRecord)
      }
    }

    if (!userRecord) {
      console.error('userRecordError==>', userRecord)
      const errorObject = {
        error: true,
        type: [
          {
            code: 'GLOBAL_ERROR',
            field: 'user',
            message:
              'Details do not match records, please check details and try again',
          },
        ],
      }
      res.status(409).json(errorObject)
      return
    }

    // Check if user already exists
    const existingUser = await UserService.findOneUser({ email })
    if (existingUser) {
      const errorObject = {
        error: true,
        type: [
          {
            code: 'GLOBAL_ERROR',
            field: 'user',
            message: 'Email already exists, please login to continue',
          },
        ],
      }
      res.status(409).json(errorObject)
      return
    }

    // Create payload to create JWT token
    const payload = { email: email }
    // Generate JWT token for email verification, expires in 30 mins
    const verificationToken = jwt.sign(payload, process.env.JWT_EMAIL_SECRET, {
      expiresIn: 1800,
    })

    // Create a new user, but keep the activation field to false
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12)
    // Create the user
    let newUser = await UserService.createUser({
      name,
      email,
      nhsNumber: nhsNumber || '',
      gmcNumber: gmcNumber || '',
      role: role || 'admin',
      password: hashedPassword,
      activated: false,
      activationToken: verificationToken,
      activationTokenSentAt: Date.now(),
    })

    // If admin, create an admin account
    if (newUser.role === 'admin') {
      await AdminService.createAdmin({
        user: newUser._id,
        name: newUser.name,
        email: newUser.email,
      })
    } else if (newUser.role === 'superadmin') {
      await SuperAdminService.createSuperAdmin({
        user: newUser._id,
        name: newUser.name,
        email: newUser.email,
      })
    }

    // testing mailservice using mailtrap.
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // use false for STARTTLS; true for SSL on port 465
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    })

    await new Promise((resolve, reject) => {
      // verify connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          console.log('Server is ready to take our messages')
          resolve(success)
        }
      })
    })

    // Configure the message
    let mailOptions = {
      from: `MedTrust <${process.env.NODEMAILER_EMAIL}>`,
      to: email,
      subject: "You're in :) Plus, a quick question",
      html: `Hi, ${newUser.name.split(' ')[0]}! <br>
      <br>
      <a href=${
        process.env.APP_URL
      }/account/activate?token=${verificationToken}>Click here</a> to activate your account
      <br>
      <p>I really appreciate you joining us at MedTrust, and I know you'll love it when you see how easy it is to read reviews.</p>
      <p>We built MedTrust to establish a healthy communication between healthcare providers and patients. I hope we can achieve that for you.
      <br>
      <p>If you wouldn't mind, I'd love it if you answered one quick question: why did you sign up for MedTrust?</p>
      <p>I'm asking because knowing what made you sign up is really helpful for us in making sure that we're delivering <br> on what our users want. Just hit "reply" and let me know.</p>
      <p>By the way, over the next couple of weeks. We'll be sending you a few more emails on how you can extract more value from MedTrust. <br> We'll be sharing some tips, checking in with you and showing you how some of our customers use MedTrust.</p>
      Cheers, <br>
      MedTrust Team, <br>
      `,
    }

    // Send the email
    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          console.log(info)
          resolve(info)
        }
      })
    })

    res.status(201).json({
      message: 'Check your email, and verify your account',
      user: User.toClientObject(newUser),
    })
  } catch (error) {
    res.status(500).json(error)
    console.log('SERVER_SIGNUP_ERROR', error)
  }
}

/**********************************
  Email Verification, acc. activation
***********************************/
exports.accountActivate = async (req, res, next) => {
  // Get the token from client body
  const { token } = req.body

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
                code: 'GLOBAL_ERROR',
                message:
                  'Token is not valid or expired, enter email to resend verification',
              },
            ],
          })
        }
        const { email } = user

        // Check if already activated
        const existingUser = await UserService.findOneUser({ email })
        if (existingUser.activated) {
          return res.status(409).json({
            error: true,
            type: [
              {
                code: 'GLOBAL_ERROR',
                message: 'Account already activated',
              },
            ],
          })
        }

        const updatedUser = await UserService.findOneUserAndUpdate(
          { email },
          { activated: true }
        )

        return res.status(200).json({
          message: 'Email verified, please login to continue',
          user: User.toClientObject(updatedUser),
        })
      })
    }
  } catch (error) {
    res.status(500).json(error)
    console.log('ACCOUNT_VERIFY_ERROR', error)
  }
}

/**********************************
  Resend Account Email Verification
***********************************/
exports.accountReverify = async (req, res) => {
  // Get the email from client
  const { email } = req.body

  // Validate the input fields
  const validationErrors = emailValidator(email)

  // Sends the validation error message
  if (validationErrors.length) {
    const errorObject = {
      error: true,
      type: validationErrors,
    }
    res.status(400).json(errorObject)
    return
  }

  if (email) {
    try {
      // Check if activated is false for the user
      const existingUser = await UserService.FindOneUser({ email })

      // Check if the user is already activated
      if (existingUser.activated === true) {
        return res.json({
          error: true,
          type: [
            {
              code: 'GLOBAL_ERROR',
              field: 'user',
              message: 'Email already activated, login to continue',
            },
          ],
        })
      }

      // Generate JWT and mail the user
      const payload = { email: email }

      // Generate JWT token for email verification, expires in 30 mins
      const verificationToken = jwt.sign(
        payload,
        process.env.JWT_EMAIL_SECRET,
        {
          expiresIn: 1800,
        }
      )

      // Update activation token sent at in the user model
      await UserService.findOneUserAndUpdate(
        { email },
        {
          activationToken: verificationToken,
          activationTokenSentAt: Date.now(),
        }
      )

      // Re Send verification to the user email
      const transporter = nodemailer.createTransport({
        port: 465,
        host: 'smtpout.secureserver.net',
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        },
        secure: true,
      })

      await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
          if (error) {
            console.log(error)
            reject(error)
          } else {
            console.log('Server is ready to take our messages')
            resolve(success)
          }
        })
      })

      let mailOptions = {
        from: `Deepak from MedTrust <${process.env.NODEMAILER_EMAIL}>`,
        to: email,
        subject: 'Re-Verification :) Plus, a quick question',
        html: `Hi, ${existingUser?.name?.split(' ')[0]}! <br>
        <br>
        <a href=${
          process.env.APP_URL
        }/account/activate?token=${verificationToken}>Click here</a> to activate your account
        <br>
        <p>I really appreciate you joining us at MedTrust, and I know you'll love it when you see how easy it is to manage tasks, <br> collaborate and get your work done from anywhere.</p>
        <p>We built MedTrust to help small business improve their teams productivity, and I hope we can achieve that for you.
        <br>
        <p>If you wouldn't mind, I'd love it if you answered one quick question: why did you sign up for MedTrust?</p>
        <p>I'm asking because knowing what made you sign up is really helpful for us in making sure that we're delivering <br> on what our users want. Just hit "reply" and let me know.</p>
        <p>By the way, over the next couple of weeks. We'll be sending you a few more emails on how you can extract more value from MedTrust. <br> We'll be sharing some tips, checking in with you and showing you how some of our customers use MedTrust to collaborate and improve their teams productivity.</p>
        Cheers, <br>
        Deepak, <br>
        CEO, MedTrust
        `,
      }

      // Send the email
      await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error(err)
            reject(err)
          } else {
            console.log(info)
            resolve(info)
          }
        })
      })

      return res.json({
        message:
          'Verification email sent, check your email to activate account',
        user: User.toClientObject(existingUser),
      })
    } catch (error) {
      res.status(500).json(error)
      console.log('AUTH_REVERIFY_ERROR', error)
    }
  } else {
    return res.json({ message: 'Please enter a valid email' })
  }
}

/**********************************
  Password Reset Email
***********************************/
exports.passwordResetEmail = async (req, res) => {
  // Get the email from client body
  const { email } = req.body

  // Validate the input fields
  const validationErrors = emailValidator(email)

  // Sends the validation error message
  if (validationErrors.length) {
    const errorObject = {
      error: true,
      type: validationErrors,
    }
    res.status(400).json(errorObject)
    return
  }

  try {
    // Check if the user exists
    const existingUser = await UserService.findOneUser({ email })

    // If the user doesn't exist, don't send
    if (!existingUser) {
      return res.json({
        error: true,
        type: [
          {
            code: 'GLOBAL_ERROR',
            field: 'user',
            message: "Your email doesn't exist, please sign up to continue",
          },
        ],
      })
    }

    // If user exists
    // Generate JWT and mail the user
    const payload = { email: email }

    // Generate JWT token for password reset, expires in 30 mins
    const resetToken = jwt.sign(payload, process.env.JWT_EMAIL_SECRET, {
      expiresIn: 1800,
    })

    // Send password reset email to the user
    // const transporter = nodemailer.createTransport({
    //   port: 465,
    //   host: 'smtpout.secureserver.net',
    //   auth: {
    //     user: process.env.NODEMAILER_EMAIL,
    //     pass: process.env.NODEMAILER_PASSWORD,
    //   },
    //   secure: true,
    // })
    //mailtrap
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // use false for STARTTLS; true for SSL on port 465
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    })

    await new Promise((resolve, reject) => {
      // verify connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error)
          reject(error)
        } else {
          console.log('Server is ready to take our messages')
          resolve(success)
        }
      })
    })

    // Configure the message
    let mailOptions = {
      from: `MedTrust <${process.env.SUPPORT_EMAIL}>`,
      to: email,
      subject: 'Password Reset',
      html: `Hi, ${existingUser?.name?.split(' ')[0]}! <br>
      <br>
      <a href=${
        process.env.APP_URL
      }/new-password?token=${resetToken}>Click here</a> to reset your password
      <br>
      <p>If you didn't request a password reset, please ignore this email.</p>
      Customer Success Team, <br>
      MedTrust
      `,
    }

    // Send the email
    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          console.log(info)
          resolve(info)
        }
      })
    })

    return res.status(200).json({
      message: 'Password reset link sent to your email',
      user: User.toClientObject(existingUser),
    })
  } catch (error) {
    res.status(500).json(error)
    console.log('PASSWORD_RESET_EMAIL_ERROR', error)
  }
}

/**********************************
  Password Reset Verification
***********************************/
exports.passwordVerify = async (req, res, next) => {
  // Get the token from client body
  const { token, newPassword } = req.body

  // Validate the input fields
  const validationErrors = passwordValidator(newPassword)

  // Sends the validation error message
  if (validationErrors.length) {
    const errorObject = {
      error: true,
      type: validationErrors,
    }
    res.status(400).json(errorObject)
    return
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
                code: 'GLOBAL_ERROR',
                field: 'token',
                message:
                  'Token is not valid or expired, enter email to resend reset link',
              },
            ],
          })
        }
        const { email } = user

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12)

        const updatedUser = await UserService.findOneUserAndUpdate(
          { email },
          { password: hashedPassword }
        )

        return res.status(200).json({
          message: 'Password updated, please login to continue',
          user: User.toClientObject(updatedUser),
        })
      })
    }
  } catch (error) {
    res.status(500).json(error)
    console.log('NEW_PASSWORD_VERIFY_ERROR', error)
  }
}

/**********************************
  Login a user
***********************************/
// exports.login = async (req, res, next) => {
//   const { email, password } = req.body

//   const validationErrors = []

//   // Validate the email and password with utils
//   const emailValidationErrors = emailValidator(email)
//   const passwordValidationErrors = passwordValidator(password)

//   if (emailValidationErrors.length) {
//     validationErrors.push(...emailValidationErrors)
//   }

//   if (passwordValidationErrors.length) {
//     validationErrors.push(...passwordValidationErrors)
//   }

//   // Sends the validation error message
//   if (validationErrors.length) {
//     const errorObject = {
//       error: true,
//       type: validationErrors,
//     }
//     res.status(401).json(errorObject)
//     return
//   }

//   // Use passport to authenticate
//   passport.authenticate('local', (err, user, info) => {
//     if (err) {
//       return next(err)
//     }
//     if (!user) {
//       res.send(info)
//     } else {
//       // If user is authenticated, then create JWT
//       const userObject = user.toObject()
//       // Use only the user ID to create JWT token
//       const idObject = { _id: userObject._id }
//       // Generate the access token
//       const accessToken = jwt.sign(idObject, process.env.JWT_ACCESS_SECRET, {
//         expiresIn: process.env.JWT_ACCESS_TOKEN_TTL,
//       })
//       // Generate the refresh token
//       const refreshToken = jwt.sign(idObject, process.env.JWT_REFRESH_SECRET, {
//         expiresIn: '1y',
//       })

//       // Set a http only cookie for refresh token
//       res.cookie('refreshToken', refreshToken, {
//         httpOnly: true,
//         path: '/api/refresh_token',
//         maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//       })

//       // Send the access token to the client
//       return res.status(200).json({
//         user: User.toClientObject(user),
//         accessToken: accessToken,
//         message: 'Login Success',
//       })
//     }
//   })(req, res, next)
// }

///********************************* OTP Login Files ***********************************/
exports.login = async (req, res, next) => {
  const { email, password } = req.body

  const validationErrors = []

  // Validate the email and password with utils
  const emailValidationErrors = emailValidator(email)
  const passwordValidationErrors = passwordValidator(password)

  if (emailValidationErrors.length) {
    validationErrors.push(...emailValidationErrors)
  }

  if (passwordValidationErrors.length) {
    validationErrors.push(...passwordValidationErrors)
  }

  // Sends the validation error message
  if (validationErrors.length) {
    const errorObject = {
      error: true,
      type: validationErrors,
    }
    res.status(401).json(errorObject)
    return
  }

  // Use passport to authenticate
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.send(info)
    } else {
      // If user is authenticated, generate and send OTP
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      })
      const otpExpiry = Date.now() + 10 * 60 * 1000 // OTP valid for 10 minutes

      // Save the OTP and expiry in the user's record
      await UserService.updateUserOtp(user._id, { otp, otpExpiry })

      // Send OTP to user's email
      await sendOTPEmail(user.email, otp).catch((err) => {
        console.error('OTP Email Error:', err)
      })

      return res.status(200).json({
        message: 'OTP sent to your email, please verify to continue',
        userId: user._id, // Send the userId to verify OTP later
      })
    }
  })(req, res, next)
}

// OTP verification and login
exports.verifyOtp = async (req, res) => {
  const { userId, otp } = req.body

  try {
    const user = await UserService.findUserById(userId)

    if (!user) {
      return res.status(404).json({
        error: true,
        type: [
          {
            code: 'GLOBAL_ERROR',
            field: 'user',
            message: 'User not found',
          },
        ],
      })
    }

    // Check if OTP matches and is not expired
    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(401).json({
        error: true,
        type: [
          {
            code: 'GLOBAL_ERROR',
            field: 'otp',
            message: 'Invalid or expired OTP',
          },
        ],
      })
    }

    // Clear the OTP and proceed with login
    await UserService.clearUserOtp(userId)

    // Generate JWT token as in the original login method
    const userObject = user.toObject()
    const idObject = { _id: userObject._id }
    const accessToken = jwt.sign(idObject, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_TTL,
    })
    const refreshToken = jwt.sign(idObject, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '1y',
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/api/refresh_token',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })

    return res.status(200).json({
      user: User.toClientObject(user),
      accessToken: accessToken,
      message: 'Login Success',
    })
  } catch (error) {
    res.status(500).json(error)
    console.log('OTP_VERIFY_ERROR', error)
  }
}

/**********************************
  Google login/sign up save to local
***********************************/
exports.googleCreateOrLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await UserService.FindOneUser({ email });

    // If user doesn't exist
    if (!user) {
      let user = new User({
        name: name,
        email: email,
        accountType: "google",
        activated: true,
        role: "admin",
      });
      await user.save().then(async (user) => {
        // If admin, create an admin account
        if (user.role === "admin") {
          await AdminService.createAdmin({
            user: user._id,
            name: user.name,
            email: user.email,
          });
        } else if (user.role === "superadmin") {
          await SuperAdminService.createSuperAdmin({
            user: user._id,
            name: user.name,
            email: user.email,
          });
        }
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
          path: `/api/refresh_token`,
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
        path: `/api/refresh_token`,
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
    const user = await UserService.findUserById(decodedToken._id);
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

    // Update user's last active time
    await UserService.updateUserLastActiveTime(user._id);

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
    res.status(500).json(error);
    console.log("NEW_ACCESS_TOKEN_ERROR", error);
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
    res.status(500).json(error);
    console.log("LOGOUT_ERROR", error);
  }
};
