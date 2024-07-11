const PatientRecord = require('../models/patientRecord')

class PatientRecordService {
  // Find if signing up patient exists in NHS patientRecord Database before signing up.
  static findPatientInRecord = async (query) => {
    try {
      const patientInRecord = await PatientRecord.findOne(query).exec()

      return patientInRecord
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

  //   // Find all users
  //   static findAllUsers = async () => {
  //     try {
  //       const users = await User.find().exec();

  //       return users;
  //     } catch (error) {
  //       throw error;
  //     }
  //   };

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

module.exports = PatientRecordService
