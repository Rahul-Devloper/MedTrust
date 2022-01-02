const User = require("../models/user");

/**********************************
  Check if user is admin
***********************************/
exports.currentAdmin = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findOne({ _id }).exec();

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
