const User = require("../models/user");

// Create a new user
exports.CreateUser = async (user) => {
  try {
    const newUser = new User(user);
    await newUser.save();

    return newUser;
  } catch (error) {
    throw error;
  }
};

// Find user by id
exports.FindUserById = async (id) => {
  return await User.findById(id).exec();
};

// Find one user
exports.FindOneUser = async (query) => {
  return await User.findOne(query).exec();
};

// Find one user and update
exports.FindOneUserAndUpdate = async (query, update) => {
  return await User.findOneAndUpdate(query, update, { new: true }).exec();
};
