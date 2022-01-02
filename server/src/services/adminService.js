const Admin = require("../models/admin");

// Create a new admin
exports.CreateAdmin = async (admin) => {
  try {
    const newAdmin = new Admin(admin);
    await newAdmin.save();

    return newAdmin;
  } catch (error) {
    throw error;
  }
};
