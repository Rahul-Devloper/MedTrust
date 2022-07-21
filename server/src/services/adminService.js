const Admin = require("../models/admin");

class AdminService {
  // Create an admin
  static createAdmin = async (adminData) => {
    try {
      // Create an admin
      const admin = new Admin(adminData);
      await admin.save();

      return admin;
    } catch (error) {
      throw error;
    }
  };

  // Find one admin
  static findOneAdmin = async (query) => {
    try {
      const admin = await Admin.findOne(query).exec();

      return admin;
    } catch (error) {
      throw error;
    }
  };

  // Find admin by id
  static findAdminById = async (id) => {
    try {
      const admin = await Admin.findById(id).exec();

      return admin;
    } catch (error) {
      throw error;
    }
  };

  // Find one admin populated team
  static findOneAdminPopulatedTeam = async (query) => {
    try {
      const admin = await Admin.findOne(query)
        .populate({
          path: "members",
          select: "name email user organization createdAt",
        })
        .sort({ createdAt: -1 })
        .exec();

      return admin;
    } catch (error) {
      throw error;
    }
  };

  // Admin team invite
  static adminTeamInvitation = async (userId, invitation) => {
    try {
      const admin = await Admin.findOne({ user: userId }).exec();
      admin.invitations.push(invitation);
      await admin.save();

      return admin;
    } catch (error) {
      throw error;
    }
  };

  // Team Account activation
  static activateTeamAccount = async (user, name, hashedPassword, token) => {
    try {
      // Find the admin
      const admin = await Admin.findById(user.adminId).exec();

      // Create a new user
      const newUser = new User({
        name,
        email: user.email,
        role: user.role,
        password: hashedPassword,
        activated: true,
        activationToken: token,
      });

      // Save the new user
      await newUser.save();

      let teamMember;
      if (user.role === "member") {
        // Create the member
        teamMember = new Member({
          user: newUser._id,
          invitedBy: user.adminId,
          name: newUser.name,
          email: newUser.email,
          organization: admin.organization,
        });

        await teamMember.save();

        // Add the account to the admin members array
        admin.members.push(teamMember._id);
        await admin.save();
      }

      // Update invitation status in admin to "accepted"
      Admin.findOneAndUpdate(
        {
          _id: user.adminId,
          "invitations.email": user.email,
        },
        {
          "invitations.$.status": "accepted",
        },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log("SERVER_TEAM_ACCT_ACTIVATE_ERROR", err);
          }
        }
      );

      return admin;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = AdminService;
