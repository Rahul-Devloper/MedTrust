const UserService = require("../services/userService");
const SuperAdminService = require("../services/superAdminService");

/**********************************
  Check if user is super admin
***********************************/
exports.currentSuperAdmin = async (req, res) => {
  const { _id } = req.user;

  const user = await UserService.findUserById(_id);

  if (user.role === "superadmin") {
    res.status(200).json({
      superadmin: true,
      message: "Welcome Super admin!",
    });
  } else {
    res.status(403).json({
      admin: false,
      error: "You are trying to access super admin resource. Access Denied",
    });
  }
};

/**********************************
  Get all admins
***********************************/
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await SuperAdminService.findAllAdmins();

    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
