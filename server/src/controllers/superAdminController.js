const { FindUserById } = require("../services/userService");

/**********************************
  Check if user is super admin
***********************************/
exports.currentSuperAdmin = async (req, res) => {
  const { _id } = req.user;

  const user = await FindUserById(_id).exec();

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
