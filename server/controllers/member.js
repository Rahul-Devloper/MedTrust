const User = require("../models/user");

/**********************************
  Check if user is a member
***********************************/
exports.currentMember = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findOne({ _id }).exec();

  if (user.role === "member") {
    res.status(200).json({
      user: true,
      message: "Welcome member!",
    });
  } else {
    res.status(403).json({
      admin: false,
      error: "You are trying to access a restricted resource. Access Denied",
    });
  }
};