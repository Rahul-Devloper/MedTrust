const User = require("../models/user");

// Find user by id
exports.FindUserById = async (id) => {
  return await User.findOne({ _id: id }).exec();
};
