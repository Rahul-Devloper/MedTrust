const User = require('../models/user')
const DoctorRecord = require('../services/doctorRecordService')
const UserService = require('../services/userService')

/**********************************
  Check if user is a member
***********************************/
exports.currentPatient = async (req, res) => {
  const { _id } = req.user

  const user = await UserService.findUserById(_id)

  if (user.role === 'patient') {
    res.status(200).json({
      user: true,
      message: 'Welcome patient!',
      user: User.toClientObject(user),
    })
  } else {
    res.status(403).json({
      admin: false,
      error: 'You are trying to access a restricted resource. Access Denied',
    })
  }
}

// get all doctors available in the NHS database records
exports.getAllDoctors = async (req, res) => {
  const doctors = await DoctorRecord.findAllDoctors()
  if (!doctors) {
    return res.status(400).json({
      success: false,
      message: 'No doctors found',
    })
  } else
    return res.status(200).json({
      success: true,
      doctors: doctors,
      message: 'All doctors found',
    })
}

exports.getDoctorSpeciality = async (req, res) => {
  const { speciality } = req.params
  const formattedSpeciality = speciality.includes('-')
    ? speciality.split('-').join(' ')
    : speciality

  try {
    const doctors = await DoctorRecord.findDoctorBySpecialty(
      formattedSpeciality
    )

    if (!doctors || doctors.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No doctors found',
      })
    } else {
      return res.status(200).json({
        success: true,
        doctors: doctors,
        message: 'All doctors found',
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching doctors',
      error: error.message,
    })
  }
}

exports.getDoctorProfileData = async (req, res) => {
  console.log('req==>', req)
  const { name, gmcNumber } = req.query

  try {
    // find doctor with name and gmcNumber
    const doctor = await DoctorRecord.findDoctorByNameAndGmcNumber(
      name,
      gmcNumber
    )
    console.log('doctor==>', doctor)
    if (!doctor) {
      return res.status(400).json({
        success: false,
        message: 'No doctor found',
      })
    } else {
      return res.status(200).json({
        success: true,
        doctor: doctor,
        message: 'Doctor found',
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching doctor',
      error: error.message,
    })
  }
}