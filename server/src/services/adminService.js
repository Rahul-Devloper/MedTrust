const Admin = require("../models/admin");

class AdminService {
  // Create a new admin
  static CreateAdmin = async (admin) => {
    try {
      const newAdmin = new Admin(admin);
      await newAdmin.save();

      return newAdmin;
    } catch (error) {
      throw error;
    }
  };

  // Find one admin
  static FindOneAdmin = async (query) => {
    try {
      const admin = await Admin.findOne(query).exec();

      return admin;
    } catch (error) {
      throw error;
    }
  };

  // Find admin by id
  static FindAdminById = async (id) => {
    try {
      const admin = await Admin.findById(id).exec();

      return admin;
    } catch (error) {
      throw error;
    }
  };

  // Find one admin and update
  static FindOneAdminAndUpdate = async (query, update) => {
    try {
      const admin = await Admin.findOneAndUpdate(query, update, {
        new: true,
      }).exec();

      return admin;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = AdminService;
