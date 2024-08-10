const DoctorRecord = require('../models/doctorRecord')

class DoctorRecordService {
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
    console.log('gmcNumberFind==>', gmcNumber)
    console.log('nameFind==>', name)
    let modifiedName = ''
    let doctor = {}
    try {
      // if (!name || !gmcNumber) {
      //   throw new Error('Name and GMC Number are required')
      // }
      if (name && gmcNumber) {
        modifiedName = name
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        console.log('modifiedName==>', modifiedName)
        doctor = await DoctorRecord.findOne({
          'personalInfo.name': `Dr. ${modifiedName}`, // Changed from professionalInfo to personalInfo
          gmcNumber: gmcNumber,
        }).exec()
      } else if (gmcNumber) {
        doctor = await DoctorRecord.findOne({
          gmcNumber: gmcNumber,
        }).exec()
      } else if (name) {
        modifiedName = name
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        console.log('modifiedName==>', modifiedName)
        doctor = await DoctorRecord.findOne({
          'personalInfo.name': `Dr. ${modifiedName}`, // Changed from professionalInfo to personalInfo
        }).exec()
      }

      return doctor
    } catch (error) {
      console.error('Error finding doctor by name and gmcNumber:', error)
      throw error // Re-throw the error to be handled by the calling function
    }
  }

  // Deactivate doctor profile
  static async deactivateDoctorProfileById(doctorId) {
    try {
      const response = await DoctorRecord.findOneAndUpdate(
        { _id: doctorId },
        { isDeactivated: true },
        { new: true }
      )
      return response
    } catch (error) {
      console.error('Error deactivating doctor profile:', error)
      throw error // Re-throw the error to be handled by the calling function
    }
  }

  // Reactivate doctor profile
  static async reactivateDoctorProfileById(doctorId) {
    try {
      const response = await DoctorRecord.findOneAndUpdate(
        { _id: doctorId },
        { isDeactivated: false },
        { new: true }
      )
      return response
    } catch (error) {
      console.error('Error reactivating doctor profile:', error)
      throw error // Re-throw the error to be handled by the calling function
    }
  }
}

module.exports = DoctorRecordService
