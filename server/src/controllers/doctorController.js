const User = require('../models/user')
const DoctorRecord = require('../services/doctorRecordService')
const PatientRecordService = require('../services/patientRecordService')
const UserService = require('../services/userService')

/**********************************
  Check if user is a doctor
***********************************/
exports.currentDoctor = async (req, res) => {
  const { _id } = req.user

  const user = await UserService.findUserById(_id)
  console.log('doctorUser==>', user)

  if (user.role === 'doctor') {
    res.status(200).json({
      user: true,
      message: 'Welcome Doctor!',
      user: User.toClientObject(user),
    })
  } else {
    res.status(403).json({
      admin: false,
      error: 'You are trying to access a restricted resource. Access Denied',
    })
  }
}

exports.deactivateDoctorProfileById = async (req, res) => {
  const { doctorId } = req.body

  try {
    const response = await DoctorRecord.deactivateDoctorProfileById(doctorId)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.reactivateDoctorProfileById = async (req, res) => {
  const { doctorId } = req.body

  try {
    const response = await DoctorRecord.reactivateDoctorProfileById(doctorId)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}
