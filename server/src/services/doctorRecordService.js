const DoctorRecord = require('../models/doctorRecord')

class DoctorRecordService {
  // Find if signing up doctor exists in NHS doctorRecord Database before signing up.
  // static async findDoctorBySpecialty(specialty) {
  //   try {
  //     if (!specialty) {
  //       throw new Error('Specialty is required')
  //     }

  //     const doctors = await DoctorRecord.find({
  //       'professionalInfo.specialty': specialty,
  //     }).exec()

  //     return doctors
  //   } catch (error) {
  //     console.error('Error finding doctors by specialty:', error)
  //     throw error // Re-throw the error to be handled by the calling function
  //   }
  // }

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

  // Find doctor by speciality
  static async findDoctorBySpecialty(specialty) {
    try {
      if (!specialty) {
        throw new Error('Specialty is required')
      }

      const doctors = await DoctorRecord.find({
        'professionalInfo.specialty': specialty,
      }).exec()

      return doctors
    } catch (error) {
      console.error('Error finding doctors by specialty:', error)
      throw error // Re-throw the error to be handled by the calling function
    }
  }

  // Find doctor with name and gmcNumber
  static async findDoctorByNameAndGmcNumber(name, gmcNumber) {
    try {
      if (!name || !gmcNumber) {
        throw new Error('Name and GMC Number are required')
      }
      const modifiedName = name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      console.log('modifiedName==>', modifiedName)
      const doctor = await DoctorRecord.findOne({
        'personalInfo.name': `Dr. ${modifiedName}`, // Changed from professionalInfo to personalInfo
        gmcNumber: gmcNumber,
      }).exec()

      return doctor
    } catch (error) {
      console.error('Error finding doctor by name and gmcNumber:', error)
      throw error // Re-throw the error to be handled by the calling function
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
