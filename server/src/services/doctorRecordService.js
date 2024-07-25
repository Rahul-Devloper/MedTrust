const DoctorRecord = require('../models/doctorRecord')

class DoctorRecordService {
  // Find if signing up doctor exists in NHS doctorRecord Database before signing up.
  static findDoctorInRecord = async (query) => {
    try {
      const doctorRecord = await DoctorRecord.findOne(query).exec()

      return doctorRecord
    } catch (error) {
      throw error
    }
  }

  //   // Find user by id
  //   static findUserById = async (id) => {
  //     try {
  //       const user = await User.findById(id).exec();

  //       return user;
  //     } catch (error) {
  //       throw error;
  //     }
  //   };

  // Find all doctors
  static findAllDoctors = async () => {
    try {
      const doctors = await DoctorRecord.find().exec()

      return doctors
    } catch (error) {
      throw error
    }
  }

  //   // Find one user and update
  //   static findOneUserAndUpdate = async (query, update) => {
  //     try {
  //       const user = await User.findOneAndUpdate(query, update, {
  //         new: true,
  //       }).exec();

  //       return user;
  //     } catch (error) {
  //       throw error;
  //     }
  //   };

  //   // Delete a user by id
  //   static deleteUserById = async (id) => {
  //     try {
  //       const userToDelete = await User.findById(id).exec();

  //       // If no user found, throw 404 error
  //       if (!userToDelete) {
  //         return res.status(404).json({
  //           error: "User not found",
  //         });
  //       }

  //       await userToDelete.remove();

  //       return userToDelete;
  //     } catch (error) {
  //       throw error;
  //     }
  //   };

  //   // Update user's last active time
  //   static updateUserLastActiveTime = async (id) => {
  //     try {
  //       const user = await User.findById(id).exec();

  //       // If no user found, throw 404 error
  //       if (!user) {
  //         return res.status(404).json({
  //           error: "User not found",
  //         });
  //       }

  //       user.lastActive = new Date();
  //       await user.save();

  //       return user;
  //     } catch (error) {
  //       throw error;
  //     }
  //   };
}

module.exports = DoctorRecordService
