const UserService = require("../services/userService");
const AdminService = require("../services/adminService");
const { passwordValidator } = require("../utils/validations");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

/**********************************
  Check if user is admin
***********************************/
exports.currentAdmin = async (req, res) => {
  const { _id } = req.user;

  const user = await UserService.findUserById(_id);

  if (user.role === "admin") {
    res.status(200).json({
      admin: true,
      message: "Welcome admin!",
    });
  } else {
    res.status(403).json({
      admin: false,
      error: "You are trying to access admin resource. Access Denied",
    });
  }
};

/**********************************
  Email invite to admin team
***********************************/
exports.teamInvite = async (req, res) => {
  // Check if user is already present
  const { email, role, isAdmin } = req.body;

  const user = await UserService.findOneUser({ email });

  if (user) {
    const errorObject = {
      error: true,
      type: [
        {
          code: "GLOBAL_ERROR",
          message: "User already exists, enter another email of the user",
        },
      ],
    };
    return res.status(409).json(errorObject);
  }

  try {
    const invitation = {
      email,
      role,
      status: "pending",
    };

    // Update invitation in admins invitations array
    const admin = await AdminService.adminTeamInvitation(
      isAdmin,
      req.user._id,
      invitation
    );

    // Create payload to create JWT token
    const payload = { email: email, role: role, adminId: admin._id };
    // Generate JWT token for email verification, expires in 30 mins
    const joiningToken = jwt.sign(payload, process.env.JWT_EMAIL_SECRET);

    // Send email
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtpout.secureserver.net",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
      secure: true,
    });

    await new Promise((resolve, reject) => {
      // verify connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    // Configure the message
    let mailOptions = {
      from: `Join Team <${process.env.SUPPORT_EMAIL}>`,
      to: email,
      subject: "Netraga - Team Invite",
      html: `Hi, <br> 
      
      <p>${admin?.name} has invited you to join their team.</p>

      <a href=${process.env.APP_URL}/team/join?token=${joiningToken}>Click here</a> to join the team.
      <br>

      Cheers, <br>
      Netraga Team
    </b>`,
    };

    // Send the email
    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });

    const successObject = {
      success: true,
      message: "Invitation sent successfully",
    };

    res.status(200).json(successObject);
  } catch (error) {
    console.log("SERVER_TEAM_INVITE_ERROR", error);
  }
};

/********************************************
  Team Account Email Verification, acc. activation
*********************************************/
exports.teamAccountActivate = async (req, res) => {
  // Get the token from client body
  const { name, password, token } = req.body;

  // Validate the input fields
  const validationErrors = passwordValidator(password);

  // Sends the validation error message
  if (validationErrors.length) {
    const errorObject = {
      error: true,
      type: validationErrors,
    };
    return res.status(400).json(errorObject);
  }

  try {
    // If token exists
    if (token) {
      jwt.verify(token, process.env.JWT_EMAIL_SECRET, async (err, user) => {
        // If the token provided is not valid
        if (err) {
          return res.status(409).json({
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

        const existingUser = await UserService.findOneUser({ email });

        if (existingUser) {
          const errorObject = {
            error: true,
            type: [
              {
                code: "GLOBAL_ERROR",
                message: "You have already joined, login to continue",
              },
            ],
          };
          return res.status(409).json(errorObject);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Activate the account
        await AdminService.activateTeamAccount(
          user,
          name,
          hashedPassword,
          token
        );

        // Send response
        const successObject = {
          success: true,
          message: "Account activated successfully",
        };
        res.status(200).json(successObject);
      });
    }
  } catch (error) {
    console.log("SERVER_TEAM_ACCOUNT_ACTIVATION_ERROR", error);
  }
};

/********************************************
  Get all admin team members
*********************************************/
exports.getTeamMembers = async (req, res) => {
  const { _id } = req.user;

  try {
    const admin = await AdminService.findOneAdminPopulatedTeam({ user: _id });

    const members = admin.members;

    const successObject = {
      members,
    };

    res.status(200).json(successObject);
  } catch (error) {
    console.log("SERVER_TEAM_MEMBERS_ERROR", error);
  }
};

/**************************************
  Get admin subscription
***************************************/
exports.getAdminSubscription = async (req, res) => {
  const { _id } = req.user;

  try {
    const admin = await AdminService.findOneAdmin({ user: _id });

    // Extract the start period and end period from admin currentSubscription
    // Create an object
    const subscription = {
      startPeriod: admin.currentSubscription?.current_period_start,
      endPeriod: admin.currentSubscription?.current_period_end,
      billInterval: admin.currentSubscription?.plan?.interval,
    };

    const adminSub = {
      subscription,
      currentPlan: admin.currentPlan,
      subscriptionStatus: admin.subscriptionStatus,
      stripeCustomerId: admin.stripeCustomerId,
    };

    res.status(200).json(adminSub);
  } catch (error) {
    console.log("ADMIN_PLAN_ERROR", error);
  }
};
