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

  // get all patients
  static findAllPatients = async () => {
    try {
      const patients = await PatientRecord.find().exec()
      return patients
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

  // change patient status
  static changePatientStatus = async ({ patientId, status }) => {
    try {
      const response = await PatientRecord.findOneAndUpdate(
        { _id: patientId },
        { isDeactivated: status },
        { new: true }
      )
      return response
    } catch (error) {
      console.error('Error reactivating patient profile:', error)
      throw error // Re-throw the error to be handled by the calling function
    }
  }

  static findOneUserAndUpdate = async (query, update) => {
    try {
      const patient = await PatientRecord.findOneAndUpdate(query, update, {
        new: true,
      }).exec()

      return patient
    } catch (error) {
      throw error
    }
  }
}

module.exports = PatientRecordService
