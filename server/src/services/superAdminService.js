const SuperAdmin = require("../models/superAdmin");
const Admin = require("../models/admin");

class SuperAdminService {
  // Create an super admin
  static createSuperAdmin = async (superAdminData) => {
    try {
      const superAdmin = new SuperAdmin(superAdminData);
      await superAdmin.save();

      return superAdmin;
    } catch (error) {
      throw error;
    }
  };

  // Find all admins
  static findAllAdmins = async () => {
    try {
      const admins = await Admin.find().exec();

      return admins;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = SuperAdminService;
