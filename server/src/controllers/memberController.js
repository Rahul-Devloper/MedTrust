const User = require("../models/user");
const UserService = require("../services/userService");

/**********************************
  Check if user is a member
***********************************/
exports.currentMember = async (req, res) => {
  const { _id } = req.user;

  const user = await UserService.FindUserById(_id);

  if (user.role === "member") {
    res.status(200).json({
      user: true,
      message: "Welcome member!",
      user: User.toClientObject(user),
    });
  } else {
    res.status(403).json({
      admin: false,
      error: "You are trying to access a restricted resource. Access Denied",
    });
  }
};
